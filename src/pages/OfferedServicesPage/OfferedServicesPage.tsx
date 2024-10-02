import { useState, useEffect } from "react";
import AddServiceForm from "../../components/add-service-form/AddServiceForm";
import "./OfferedServicesPage.css";
import AdminButton from "../../components/AdminButton/AdminButton";

interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
}

function OfferedServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showComponent, setShowComponent] = useState<string | null>(null);

  useEffect(() => {
    if (showComponent === "offeredList") {
      fetchServices();
    }
  }, [showComponent]);

  // Функция для получения списка услуг
  const fetchServices = async () => {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const response = await fetch("/api/offered-services", {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Ошибка при получении списка услуг", error);
    }
  };

  // Функция для получения деталей услуги
  const fetchServiceDetails = async (serviceId: string) => {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const response = await fetch(`/api/offered-services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const data = await response.json();
      setSelectedService(data);
    } catch (error) {
      console.error("Ошибка при получении деталей услуги", error);
    }
  };

  return (
    <div className="services-page">
      <h2>Услуги</h2>
      <div className="button-group">
        {/* Кнопка только для админов */}
        <AdminButton
          buttonText="Добавить услугу"
          onClick={() => setShowComponent("addService")}
        />
        <button
          className={`toggle-button ${
            showComponent === "offeredList" ? "active" : ""
          }`}
          type="button"
          onClick={() => setShowComponent("offeredList")}
        >
          Список услуг
        </button>
      </div>

      {/* Компонент добавления услуги */}
      {showComponent === "addService" && (
        <div className="component-container">
          <AddServiceForm />
        </div>
      )}

      {/* Компонент списка услуг */}
      {showComponent === "offeredList" && (
        <div className="services-list">
          <select onChange={(e) => fetchServiceDetails(e.target.value)}>
            <option value="">Выберите услугу</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.id} - {service.title}
              </option>
            ))}
          </select>

          {/* Отображение деталей выбранной услуги */}
          {selectedService && (
            <div className="service-details">
              <h3>Service details</h3>
              <p>Описание: {selectedService.description}</p>
              {selectedService.image && (
                <img src={selectedService.image} alt="Изображение услуги" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OfferedServicesPage;

// import React, { useState, useEffect } from "react";
// import AddServiceForm from "../../components/add-service-form/AddServiceForm";
// import "./OfferedServicesPage.css";

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   image?: string;
// }

// function OfferedServicesPage() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [showComponent, setShowComponent] = useState<string | null>(null);

//   useEffect(() => {
//     if (showComponent === "offeredList") {
//       fetchServices();
//     }
//   }, [showComponent]);

//   // Функция для получения списка услуг
//   const fetchServices = async () => {
//     try {
//       const response = await fetch("/api/offered-services");
//       const data = await response.json();
//       setServices(data);
//     } catch (error) {
//       console.error("Ошибка при получении списка услуг", error);
//     }
//   };

//   // Функция для получения деталей услуги
//   const fetchServiceDetails = async (serviceId: string) => {
//     try {
//       const response = await fetch(`/api/offered-services/${serviceId}`);
//       const data = await response.json();
//       setSelectedService(data);
//     } catch (error) {
//       console.error("Ошибка при получении деталей услуги", error);
//     }
//   };

//   return (
//     <div className="services-page">
//       <h2>Услуги</h2>
//       <div className="button-group">
//         <button
//           className={`toggle-button ${
//             showComponent === "addService" ? "active" : ""
//           }`}
//           type="button"
//           onClick={() => setShowComponent("addService")}
//         >
//           Добавить услугу
//         </button>
//         <button
//           className={`toggle-button ${
//             showComponent === "offeredList" ? "active" : ""
//           }`}
//           type="button"
//           onClick={() => setShowComponent("offeredList")}
//         >
//           Список услуг
//         </button>
//       </div>

//       {/* Компонент добавления услуги */}
//       {showComponent === "addService" && (
//         <div className="component-container">
//           <AddServiceForm />
//         </div>
//       )}

//       {/* Компонент списка услуг */}
//       {showComponent === "offeredList" && (
//         <div className="services-list">
//           <select onChange={(e) => fetchServiceDetails(e.target.value)}>
//             <option value="">Выберите услугу</option>
//             {services.map((service) => (
//               <option key={service.id} value={service.id}>
//                 {service.id} - {service.title}
//               </option>
//             ))}
//           </select>

//           {/* Отображение деталей выбранной услуги */}
//           {selectedService && (
//             <div className="service-details">
//               <h3>Service details</h3>
//               <p>Описание: {selectedService.description}</p>
//               {selectedService.image && (
//                 <img src={selectedService.image} alt="Изображение услуги" />
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OfferedServicesPage;
