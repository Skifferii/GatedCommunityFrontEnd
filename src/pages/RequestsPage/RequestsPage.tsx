import React, { useState } from "react";
import RequestList from "../../components/request-list/RequestList";
import RequestForm from "../../components/RequestForm/RequestForm";
import './RequestsPage.css'; // Подключим файл со стилями

function RequestsPage() {
  const [showComponent, setShowComponent] = useState<string | null>(null);

  const handleShowComponent = (component: string) => {
    setShowComponent(component);
  };

  return (
    <div className="requests-page">
      <h2>Requests Management</h2>
      <div className="button-group">
        <button
          className={`toggle-button ${showComponent === "RequestForm" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestForm")}
        >
          Add Request
        </button>
        <button
          className={`toggle-button ${showComponent === "RequestList" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestList")}
        >
          Request List
        </button>
      </div>

      <div className="component-container">
        {showComponent === "RequestForm" && <RequestForm />}
        {showComponent === "RequestList" && <RequestList />}
      </div>
    </div>
  );
}

export default RequestsPage;