import AddServiceForm from "../../components/add-service-form/AddServiceForm";
import OfferedServicesList from "../../components/offered-services-list/OfferedServicesList";

function RequestsPage() {
   

 

    return (
        <div className="Requests-page">
            <h2>Service</h2>
        <button type="button" onClick={AddServiceForm}>Add service</button>
        <button type="button" onClick={OfferedServicesList}>OfferedServicesList</button>
        </div>
    );
}

export default RequestsPage;