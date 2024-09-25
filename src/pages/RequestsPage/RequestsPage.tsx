import React, { useState, useEffect } from "react";
import RequestList from "../../components/request-list/RequestList";
import RequestForm from "../../components/RequestForm/RequestForm";
import './RequestsPage.css'; // Подключим файл со стилями

function RequestsPage() {
  const [showComponent, setShowComponent] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleShowComponent = (component: string) => {
    setShowComponent(component);
  };

  const handleRequestSelect = async (requestId: string) => {
    try {
      const requestResponse = await fetch(`/api/user-request/${requestId}`);
      const requestData = await requestResponse.json();

      const serviceResponse = await fetch(`/api/offered-services/${requestData.propositionServiceId}`);
      const serviceData = await serviceResponse.json();

      const userResponse = await fetch(`/api/users/${requestData.userId}`);
      const userData = await userResponse.json();

      const addressResponse = await fetch(`/api/addresses/${requestData.addressId}`);
      const addressData = await addressResponse.json();

      setSelectedRequest({
        ...requestData,
        serviceTitle: serviceData.title,
        serviceDescription: serviceData.description,
        userName: `${userData.firstName} ${userData.lastName}`,
        userEmail: userData.email,
        address: `${addressData.street} ${addressData.numberHouse}, ${addressData.city}, ${addressData.index}`
      });
    } catch (error) {
      console.error("Ошибка при получении деталей запроса:", error);
    }
  };

  return (
    <div className="requests-page">
      <h2>Управление запросами</h2>
      <div className="button-group">
        <button
          className={`toggle-button ${showComponent === "RequestForm" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestForm")}
        >
          Добавить запрос
        </button>
        <button
          className={`toggle-button ${showComponent === "RequestList" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestList")}
        >
          Список запросов
        </button>
      </div>

      <div className="component-container">
        {showComponent === "RequestForm" && <RequestForm />}
        {showComponent === "RequestList" && (
          <RequestList onSelectRequest={handleRequestSelect} />
        )}
      </div>

      {selectedRequest && (
        <div className="request-details">
          <h3>Детали запроса</h3>
          <p><strong>Описание:</strong> {selectedRequest.description}</p>
          <p><strong>Изображение:</strong> <img src={selectedRequest.picture} alt="Request" /></p>
          <p><strong>Желаемая дата и время:</strong> {selectedRequest.desiredDateTime}</p>
          <p><strong>Услуга:</strong> {selectedRequest.serviceTitle} - {selectedRequest.serviceDescription}</p>
          <p><strong>Пользователь:</strong> {selectedRequest.userName} ({selectedRequest.userEmail})</p>
          <p><strong>Адрес:</strong> {selectedRequest.address}</p>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;