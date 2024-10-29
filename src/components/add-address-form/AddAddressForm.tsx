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
    if (isNaN(index) || index < 10000 || index > 99999) {
      setError("The index must be an integer between 10000 and 99999.");
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
        throw new Error("Server error");
      }

      setSuccess(true);
      setError(null);
      setNewAddress({ street: "", numberHouse: "", city: "", index: "" }); 
    } catch (error) {
      setError("Error adding address. Try again.");
      setSuccess(false);
      console.error("Error adding Address", error);
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
          placeholder="Lugansk"
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
          placeholder="12345"
          value={newAddress.index}
          onChange={handleChange}
          required
          min={10000}   
          max={99999} 
          step="1"    
        />
      </div>

      {/* Display errors */}
      {error && <div className="error-message">{error}</div>}

      {/* Success message */}
      {success && <div className="success-message">Address successfully added!</div>}

      <button type="submit">Add new address</button>
    </form>
  );
}

export default AddAddressForm;