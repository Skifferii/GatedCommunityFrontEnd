import { useState, useEffect } from "react";

import "./OfferedServicesPage.css";
import AdminButton from "../../components/AdminButton/AdminButton";
import AddServiceForm from "../../components/add-service-form/AddServiceForm";
import { Link } from "react-router-dom";

interface File {
  id: number;
  fileData: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  files: File[];
}

function OfferedServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showComponent, setShowComponent] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

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
      {localStorage.getItem("accessToken") ? (
        <>
      <h2>Services</h2>
      <div className="button-group">
        <AdminButton
          buttonText="Add service"
          onClick={() => setShowComponent("addService")}
        />
        <button
          className={`toggle-button ${showComponent === "offeredList" ? "active" : ""}`}
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
                 {service.title}
              </option>
            ))}
          </select>

          {selectedService && (
            <div className="service-details">
              <h3>Service details</h3>
              <p>Description: {selectedService.description}</p>
              {selectedService.files?.map((file) => (
                <img
                  key={file.id}
                  src={`data:image/jpeg;base64,${file.fileData}`}
                  alt={`File ${file.id}`}
                  style={{ cursor: "pointer", width: "100px", height: "auto" }} // Сохраняем пропорции
                  onClick={() => setModalImage(`data:image/jpeg;base64,${file.fileData}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Full-size view" className="modal-image" />
        </div>
      )}
       </>
       ) : (
        <p>
          Please, <Link to="/login">Log in</Link>.
        </p>
       )
      }
    </div>
  );
}

export default OfferedServicesPage;
