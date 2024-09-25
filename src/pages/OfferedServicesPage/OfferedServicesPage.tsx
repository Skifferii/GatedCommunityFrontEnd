import React, { useState } from "react";
import AddServiceForm from "../../components/add-service-form/AddServiceForm";
import OfferedServicesList from "../../components/offered-services-list/OfferedServicesList";

function OfferedServicesPage() {
  const [showComponent, setShowComponent] = useState<string | null>(null);

  const handleShowComponent = (component: string) => {
    setShowComponent(component);
  };

  return (
    <div className="Services-page">
      <h2>Service</h2>
      <button type="button" onClick={() => handleShowComponent("addService")}>
        Add service
      </button>
      <button type="button" onClick={() => handleShowComponent("offeredList")}>
        Offered Services List
      </button>

      {showComponent === "addService" && <AddServiceForm />}
      {showComponent === "offeredList" && <OfferedServicesList />}
    </div>
  );
}

export default OfferedServicesPage;