import { useEffect, useState } from "react";

interface Address {
  id: number;
  index: number;
  city: string;
  street: string;
  numberHouse: string;
}

function AddressesList({
  onSelect,
}: {
  onSelect: (id: number, address: Address) => void;
}) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAddresses() {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch("/api/addresses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error loading addresses");
        }
        const data = await res.json();
        setAddresses(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    }

    fetchAddresses();
  }, []);

  if (loading) return <div>Loading addresses...</div>;
  if (error) return <div>{error}</div>;

  const handleIndexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndex(Number(e.target.value));
    setSelectedCity(null); // Reset other dropdownsv Сбросить другие выпадающие списки
    setSelectedStreet(null);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedStreet(null); // Reset subsequent lists Сбросить последующие списки
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStreet = e.target.value;
    setSelectedStreet(newStreet);

    // Filter houses for automatic selection if there is one address // Фильтруем дома для автоматического выбора, если один адрес
       const filteredHouses = addresses.filter(
      (addr) =>
        addr.index === selectedIndex &&
        addr.city === selectedCity &&
        addr.street === newStreet
    );

    // If there is only one house, select it automatically // Если только один дом, выбираем его автоматически
    if (filteredHouses.length === 1) {
      onSelect(filteredHouses[0].id, filteredHouses[0]);
    }
  };

  const filteredCities = [
    ...new Set(
      addresses
        .filter((addr) => addr.index === selectedIndex)
        .map((addr) => addr.city)
    ),
  ];
  const filteredStreets = [
    ...new Set(
      addresses
        .filter(
          (addr) => addr.index === selectedIndex && addr.city === selectedCity
        )
        .map((addr) => addr.street)
    ),
  ];
  const filteredHouses = addresses.filter(
    (addr) =>
      addr.index === selectedIndex &&
      addr.city === selectedCity &&
      addr.street === selectedStreet
  );

  return (
    <div>
      <select onChange={handleIndexChange} value={selectedIndex || ""}>
        <option value="" disabled>
        Select index
        </option>
        {[...new Set(addresses.map((addr) => addr.index))].map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>

      {selectedIndex && (
        <select onChange={handleCityChange} value={selectedCity || ""}>
          <option value="" disabled>
          Select city
          </option>
          {filteredCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

      {selectedCity && (
        <select onChange={handleStreetChange} value={selectedStreet || ""}>
          <option value="" disabled>
          Select street
          </option>
          {filteredStreets.map((street) => (
            <option key={street} value={street}>
              {street}
            </option>
          ))}
        </select>
      )}

      {selectedStreet && (
        <select
          onChange={(e) => {
            const selectedHouse = filteredHouses.find(
              (addr) => addr.id === Number(e.target.value)
            );
            if (selectedHouse) {
              onSelect(selectedHouse.id, selectedHouse); // Передаем полностью выбранный дом
            }
          }}
        >
          <option value="" disabled>
          Choose a house
          </option>
          {filteredHouses.map((house) => (
            <option key={house.id} value={house.id}>
              {house.numberHouse}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default AddressesList;

// import { useEffect, useState } from "react";

// interface Address {
//   id: number;
//   index: number;
//   city: string;
//   street: string;
//   numberHouse: string;
// }

// function AddressesList({
//   onSelect,
// }: {
//   onSelect: (id: number, address: Address) => void;
// }) {
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
//   const [selectedCity, setSelectedCity] = useState<string | null>(null);
//   const [selectedStreet, setSelectedStreet] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchAddresses() {
//       const token = localStorage.getItem("accessToken");
//       try {
//         const res = await fetch("/api/addresses", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!res.ok) {
//           throw new Error("Ошибка при загрузке адресов");
//         }
//         const data = await res.json();
//         setAddresses(data);
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setError("Не удалось загрузить адреса");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAddresses();
//   }, []);

//   if (loading) return <div>Загрузка адресов...</div>;
//   if (error) return <div>{error}</div>;

//   const handleIndexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedIndex(Number(e.target.value));
//     setSelectedCity(null); // Сбросить другие выпадающие списки
//     setSelectedStreet(null);
//   };

//   const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCity(e.target.value);
//     setSelectedStreet(null); // Сбросить последующие списки
//   };

//   const handleStreetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedStreet(e.target.value);
//   };

//   const filteredCities = [
//     ...new Set(
//       addresses
//         .filter((addr) => addr.index === selectedIndex)
//         .map((addr) => addr.city)
//     ),
//   ];
//   const filteredStreets = [
//     ...new Set(
//       addresses
//         .filter(
//           (addr) => addr.index === selectedIndex && addr.city === selectedCity
//         )
//         .map((addr) => addr.street)
//     ),
//   ];
//   const filteredHouses = addresses.filter(
//     (addr) =>
//       addr.index === selectedIndex &&
//       addr.city === selectedCity &&
//       addr.street === selectedStreet
//   );

//   return (
//     <div>
//       <select onChange={handleIndexChange} value={selectedIndex || ""}>
//         <option value="" disabled>
//           Выберите индекс
//         </option>
//         {[...new Set(addresses.map((addr) => addr.index))].map((index) => (
//           <option key={index} value={index}>
//             {index}
//           </option>
//         ))}
//       </select>

//       {selectedIndex && (
//         <select onChange={handleCityChange} value={selectedCity || ""}>
//           <option value="" disabled>
//             Выберите город
//           </option>
//           {filteredCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       )}

//       {selectedCity && (
//         <select onChange={handleStreetChange} value={selectedStreet || ""}>
//           <option value="" disabled>
//             Выберите улицу
//           </option>
//           {filteredStreets.map((street) => (
//             <option key={street} value={street}>
//               {street}
//             </option>
//           ))}
//         </select>
//       )}

// {selectedStreet && (
//   <select onChange={(e) => {
//     const selectedHouse = filteredHouses.find(addr => addr.id === Number(e.target.value));
//     if (selectedHouse) {
//       onSelect(selectedHouse.id, selectedHouse); // Передаем полностью выбранный дом
//     }
//   }}>
//     <option value="" disabled>Выберите дом</option>
//     {filteredHouses.map((house) => (
//       <option key={house.id} value={house.id}>{house.numberHouse}</option>
//     ))}
//   </select>
// )}
//     </div>
//   );
// }

// export default AddressesList;
