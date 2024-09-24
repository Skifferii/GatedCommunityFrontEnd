function AddServiceForm() {
  async function fetchAddService() {
    const res = await fetch("/api/offered-services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Elevator2",
        description: "Замена лампочки2",
        image: "",
      }),
    });
  }

  return <div>
    <button type="button" onClick={fetchAddService}>Add service</button>
  </div>;
}

export default AddServiceForm;