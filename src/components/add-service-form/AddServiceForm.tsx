import React, { useState } from "react";
import "./AddServiceForm.css";

function AddServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState<File[]>([]); // Для хранения загруженных файлов

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    
    // Добавляем текстовые поля в FormData
    formData.append("propositionServiceDTO", new Blob([JSON.stringify({ title, description, image })], { type: "application/json" }));
    
    // Добавляем файлы
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/offered-services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Не устанавливайте Content-Type, это сделает браузер автоматически
        },
        body: formData,
      });

      // Обработка ответа
      if (response.ok) {
        alert("Service added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error adding service:", errorData);
        alert("Failed to add service: " + errorData.message);
      }
    } catch (error) {
      console.error("Error adding service", error);
      alert("An error occurred while adding the service.");
    }
  };

  return (
    <form className="add-service-form" onSubmit={handleSubmit}>
      <div>
        <label>Service name:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image (URL):</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label>Files:</label>
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files)); // Сохраняем загруженные файлы
            }
          }}
        />
      </div>
      <button type="submit">Add a service</button>
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
//   const [files, setFiles] = useState<File[]>([]); // Для хранения загруженных файлов

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("accessToken");
//     const formData = new FormData();
    
//     // Добавляем текстовые поля в FormData
//     formData.append("propositionServiceDTO", new Blob([JSON.stringify({ title, description, image })], { type: "application/json" }));
    
//     // Добавляем файлы
//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       await fetch("/api/offered-services", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Не устанавливайте Content-Type, это сделает браузер автоматически
//         },
//         body: formData,
//       });
//       alert("Service added successfully!");
//     } catch (error) {
//       console.error("Error adding service", error);
//     }
//   };

//   return (
//     <form className="add-service-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Service name:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Image (URL):</label>
//         <input
//           type="text"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Files:</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) => {
//             if (e.target.files) {
//               setFiles(Array.from(e.target.files)); // Сохраняем загруженные файлы
//             }
//           }}
//         />
//       </div>
//       <button type="submit">Add a service</button>
//     </form>
//   );
// }

// export default AddServiceForm;

// import React, { useState } from "react";
// import "./AddServiceForm.css";

// function AddServiceForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newService = { title, description, image };
//     const token = localStorage.getItem("accessToken");

//     try {
//       await fetch("/api/offered-services", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newService),
//       });
//       alert("Service added successfully!");
//     } catch (error) {
//       console.error("Error adding service", error);
//     }
//   };

//   return (
//     <form className="add-service-form" onSubmit={handleSubmit}>
//       <div>
//         <label>Service name:</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Description:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Image (URL):</label>
//         <input
//           type="text"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add a service</button>
//     </form>
//   );
// }

// export default AddServiceForm;