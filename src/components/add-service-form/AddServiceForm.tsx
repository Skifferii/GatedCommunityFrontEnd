import React, { useState } from "react";
import "./AddServiceForm.css";

function AddServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newService = { title, description, image };
    const token = localStorage.getItem("accessToken");

    try {
      await fetch("/api/offered-services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service", error);
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
      <button type="submit">Add a service</button>
    </form>
  );
}

export default AddServiceForm;