import React, { useState } from "react";
import "./AddAddressForm.css";

function AddAddressForm() {
  const [newAddress, setNewAddress] = useState({
    street: "",
    numberHouse: "",
    city: "",
    index: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    // Дополнительная проверка, если нужно, чтобы индекс был целым числом в диапазоне
    const index = parseInt(newAddress.index);
    if (isNaN(index) || index < 1000 || index > 9999999) {
      setError("Индекс должен быть целым числом от 1000 до 9999999.");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) {
        throw new Error("Ошибка сервера");
      }

      setSuccess(true);
      setError(null);
      setNewAddress({ street: "", numberHouse: "", city: "", index: "" }); 
    } catch (error) {
      setError("Ошибка при добавлении адреса. Попробуйте снова.");
      setSuccess(false);
      console.error("Ошибка при добавлении Address", error);
    }
  };

  return (
    <form className="add-address-form" onSubmit={handleSubmit}>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          placeholder="street"
          value={newAddress.street}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Number of house:</label>
        <input
          type="text"
          name="numberHouse"
          placeholder="number of house"
          value={newAddress.numberHouse}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          placeholder="Lugank"
          value={newAddress.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Index:</label>
        <input
          type="number" 
          name="index"
          placeholder="00000"
          value={newAddress.index}
          onChange={handleChange}
          required
          min={1000}    // Минимальное значение — 4 цифры
          max={9999999} // Максимальное значение — 7 цифр
          step="1"      // Шаг ввода — целые числа
        />
      </div>

      {/* Отображение ошибок */}
      {error && <div className="error-message">{error}</div>}

      {/* Сообщение об успехе */}
      {success && <div className="success-message">Address успешно добавлена!</div>}

      <button type="submit">Add new address</button>
    </form>
  );
}

export default AddAddressForm;