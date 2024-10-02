import React, { useState, useEffect } from "react";
import "./RequestForm.css";
import Spinner from "../Spinner/Spinner";

interface Service {
  id: number;
  title: string;
  description: string;
}

interface Address {
  id: number;
  index: number;
  city: string;
  street: string;
  numberHouse: string;
}

function RequestForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState<string>("1");
  const [userValid, setUserValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    picture: "",
    propositionServiceId: "",
    description: "",
    desiredDateTime: "",
    userId: "1",
    addressId: "",
  });

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  async function fetchServices() {
    try {
      const res = await fetch("/api/offered-services");
      const data = await res.json();
      setServices(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error loading services.");
    } finally {
      setLoadingServices(false);
    }
  }

  async function fetchAddresses() {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      setAddresses(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error loading addresses.");
    } finally {
      setLoadingAddresses(false);
    }
  }

  const validateUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (res.ok) {
        setUserValid(true);
      } else {
        setUserValid(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUserValid(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchServices();
    fetchAddresses();
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "userId") {
      validateUser(value);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value);
    setFormData({
      ...formData,
      propositionServiceId: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      picture: formData.picture || null,
      propositionServiceId: parseInt(formData.propositionServiceId),
      description: formData.description || "description is empty",
      desiredDateTime: formData.desiredDateTime,
      userId: parseInt(formData.userId),
      addressId: parseInt(formData.addressId),
    };

    try {
      const res = await fetch("/api/user-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        alert("Request successfully created!");
      } else {
        alert("Error creating request.");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request.");
    }
  };

  if (loadingServices || loadingAddresses || loading) {
    return <Spinner />;
  }

  const groupedServices = services.reduce((groups, service) => {
    if (!groups[service.title]) {
      groups[service.title] = [];
    }
    groups[service.title].push(service);
    return groups;
  }, {} as Record<string, Service[]>);

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Picture URL:</label>
        <input
          type="text"
          name="picture"
          value={formData.picture}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Proposition Service title:</label>
        <select name="serviceTitle" onChange={handleTitleChange} required>
          <option value="">Select title</option>
          {Object.keys(groupedServices).map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Proposition Service description:</label>
        <select
          name="propositionServiceId"
          value={formData.propositionServiceId}
          onChange={handleChange}
          required
        >
          <option value="">Select description </option>
          {groupedServices[selectedTitle]?.map((service) => (
            <option key={service.id} value={service.id}>
              {service.description}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Desired Date and Time:</label>
        <input
          type="datetime-local"
          name="desiredDateTime"
          value={formData.desiredDateTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <select
          name="addressId"
          value={formData.addressId}
          onChange={handleChange}
          required
        >
          <option value="">Select address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.city}, {address.street} {address.numberHouse}, Index:{" "}
              {address.index}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>User Id:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
        {userValid === false && (
          <p style={{ color: "red" }}>Неверный User ID.</p>
        )}
      </div>

      <div className="form-group">
        <button type="submit" disabled={userValid === false}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default RequestForm;
