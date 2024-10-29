import { useState, useEffect } from "react";

import "./OfferedServicesPage.css";
import AdminButton from "../../components/AdminButton/AdminButton";
import AddServiceForm from "../../components/add-service-form/AddServiceForm";

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

  const fetchServices = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("/api/offered-services", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error while getting list of services", error);
    }
  };

   const fetchServiceDetails = async (serviceId: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`/api/offered-services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSelectedService(data);
    } catch (error) {
      console.error("Error while receiving details", error);
    }
  };

  return (
    <div className="services-page">
      <h2>Services</h2>
      <div className="button-group">        
        <AdminButton
          buttonText="Add service"
          onClick={() => setShowComponent("addService")}
        />
        <button
          className={`toggle-button ${
            showComponent === "offeredList" ? "active" : ""
          }`}
          type="button"
          onClick={() => setShowComponent("offeredList")}
        >
          Services list
        </button>
      </div>

      {showComponent === "addService" && (
        <div className="component-container">
          <AddServiceForm />
        </div>
      )}
     
      {showComponent === "offeredList" && (
        <div className="services-list">
          <select onChange={(e) => fetchServiceDetails(e.target.value)}>
            <option value="">Choose service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.id} - {service.title}
              </option>
            ))}
          </select>

          {selectedService && (
            <div className="service-details">
              <h3>Service details</h3>
              <p>Description: {selectedService.description}</p>
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