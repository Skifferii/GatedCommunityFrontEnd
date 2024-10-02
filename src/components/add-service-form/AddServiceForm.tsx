import React, { useState } from "react";
import "./AddServiceForm.css";

function AddServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newService = { title, description, image };
    const token = localStorage.getItem("accessToken"); // Получаем токен

    try {
      await fetch("/api/offered-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
        body: JSON.stringify(newService),
      });
      alert("Услуга успешно добавлена!");
    } catch (error) {
      console.error("Ошибка при добавлении услуги", error);
    }
  };

  return (
    <form className="add-service-form" onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Изображение (URL):</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Добавить услугу</button>
    </form>
  );
}

export default AddServiceForm;


// import React, { useState } from "react";
// import "./AddServiceForm.css";

// function AddServiceForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newService = { title, description, image };

//     try {
//       await fetch("/api/offered-services", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newService),
//       });
//       alert("Услуга успешно добавлена!");
//     } catch (error) {
//       console.error("Ошибка при добавлении услуги", error);
//     }
//   };

//   return (
//     <form className="add-service-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Название:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Описание:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Изображение (URL):</label>
//         <input
//           type="text"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//       </div>
//       <button type="submit">Добавить услугу</button>
//     </form>
//   );
// }

// export default AddServiceForm;