function AddServiceForm() {
  async function fetchAddService() {
    try {
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

      if (!res.ok) {
        throw new Error("Ошибка при добавлении сервиса");
      }

      alert("Сервис добавлен успешно");
    } catch (error) {
      console.error(error);
      alert("Не удалось добавить сервис");
    }
  }

  return (
    <div>
      <button type="button" onClick={fetchAddService}>
        Add service
      </button>
    </div>
  );
}

export default AddServiceForm;