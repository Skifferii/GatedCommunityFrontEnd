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

  const fetchAddresses = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("/api/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Ошибка при получении списка адресов", error);
    }
  };

  const fetchAddressDetails = async (addressId: string) => {
    const token = localStorage.getItem("accessToken"); 
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      <h2>Addresses</h2>
      <div className="button-group">
        <AdminButton
          buttonText="Add address"
          onClick={() => setShowComponent("addAddress")}
        />
        <button
          className={`toggle-button ${
            showComponent === "addressList" ? "active" : ""
          }`}
          type="button"
          onClick={() => setShowComponent("addressList")}
        >
          Addresses list
        </button>
      </div>

      {showComponent === "addAddress" && (
        <div className="component-container">
          <AddAddressForm />
        </div>
      )}

      {showComponent === "addressList" && (
        <div className="addresses-list">
          <select onChange={(e) => fetchAddressDetails(e.target.value)}>
            <option value="">Choose address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.numberHouse}, {address.city}, {address.index}
              </option>
            ))}
          </select>

          {/* Отображение деталей выбранного адреса */}
          {selectedAddress && (
            <div className="address-details">
              <h3>Address details</h3>
              <p>Street: {selectedAddress.street}</p>
              <p>House number: {selectedAddress.numberHouse}</p>
              <p>City: {selectedAddress.city}</p>
              <p>Index: {selectedAddress.index}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddressesPage;
