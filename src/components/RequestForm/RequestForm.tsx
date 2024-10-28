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
  const userName = localStorage.getItem("userName"); 
  const [services, setServices] = useState<Service[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userValid, setUserValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    picture: "",
    propositionServiceId: "",
    description: "",
    desiredDateTime: "",
    userId: "",
    addressId: "",
  });

  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  async function fetchServices() {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("/api/offered-services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch("/api/addresses", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      const data = await res.json();
      setAddresses(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error loading addresses.");
    } finally {
      setLoadingAddresses(false);
    }
  }

  async function fetchUserId() {
    try {
      const token = localStorage.getItem("accessToken"); 
      if (!token || !userName) {
        throw new Error("Token or username missing");
      }
      const res = await fetch(`/api/users/results?name=${userName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      const userData = await res.json();
      setUserId(userData.id);
    } 
     finally {
      setLoading(false);
    }
  }


  const validateUser = async (userId: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    fetchUserId();
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
    const title = e.target.value;
    setSelectedTitle(title);
    setFormData({
      ...formData,
      propositionServiceId: "",// Reset service selection when title changes // Сбросить выбор услуги при изменении заголовка
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      picture: formData.picture || null,
      propositionServiceId: parseInt(formData.propositionServiceId),
      description: formData.description || "description is empty",
      desiredDateTime: formData.desiredDateTime,
      userId: userId,
      addressId: parseInt(formData.addressId),
    };
    const token = localStorage.getItem("accessToken")
    try {
      const res = await fetch("/api/user-request", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
      console.error("Error creating request:", err);
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
          <option value="">Select description</option>
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
        <label>User Id: {userId}</label>                   
        {userValid === false && (
          <p style={{ color: "red" }}>Invalid User ID.</p>
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
