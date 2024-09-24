function AddServiceForm() {
    async function fetchAddService() {
      const res = await fetch("/api/offered-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Elevator22",
          description: "CTest22",
          image: "",
        }),
      });
    }
    return <div>
      <button type="button" onClick={fetchAddService}>Add service</button>
    </div>;
  }
  export default AddServiceForm;