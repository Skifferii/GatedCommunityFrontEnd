import { useState, useEffect } from "react";
import AddAddressForm from "../../components/add-address-form/AddAddressForm";
import "./AddressesPage.css";
import AdminButton from "../../components/AdminButton/AdminButton";

interface Address {
  id: string;
  street: string;
  numberHouse: string;
  city: string;
  index: string;
}

function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showComponent, setShowComponent] = useState<string | null>(null);

  useEffect(() => {
    if (showComponent === "addressList") {
      fetchAddresses();
    }
  }, [showComponent]);

  // Функция для получения списка адресов
  const fetchAddresses = async () => {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const response = await fetch("/api/addresses", {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Ошибка при получении списка адресов", error);
    }
  };

  // Функция для получения деталей адреса
  const fetchAddressDetails = async (addressId: string) => {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const data = await response.json();
      setSelectedAddress(data);
    } catch (error) {
      console.error("Ошибка при получении деталей адреса", error);
    }
  };

  return (
    <div className="addresses-page">
      <h2>Адреса</h2>
      <div className="button-group">
        {/* Кнопка только для админов */}
        <AdminButton
          buttonText="Добавить адрес"
          onClick={() => setShowComponent("addAddress")}
        />
        <button
          className={`toggle-button ${
            showComponent === "addressList" ? "active" : ""
          }`}
          type="button"
          onClick={() => setShowComponent("addressList")}
        >
          Список адресов
        </button>
      </div>

      {/* Компонент добавления адреса */}
      {showComponent === "addAddress" && (
        <div className="component-container">
          <AddAddressForm />
        </div>
      )}

      {/* Компонент списка адресов */}
      {showComponent === "addressList" && (
        <div className="addresses-list">
          <select onChange={(e) => fetchAddressDetails(e.target.value)}>
            <option value="">Выберите адрес</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.numberHouse}, {address.city}, {address.index}
              </option>
            ))}
          </select>

          {/* Отображение деталей выбранного адреса */}
          {selectedAddress && (
            <div className="address-details">
              <h3>Детали адреса</h3>
              <p>Улица: {selectedAddress.street}</p>
              <p>Номер дома: {selectedAddress.numberHouse}</p>
              <p>Город: {selectedAddress.city}</p>
              <p>Индекс: {selectedAddress.index}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddressesPage;
