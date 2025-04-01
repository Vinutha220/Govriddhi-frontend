import React, { useState } from "react";
import "../assets/css/addCow.css";

export default function AddCowModal({ onClose, onAddCow }) {
    const [cowData, setCowData] = useState({
        name: "",
        breed: "",
        healthCondition: "",
        dob: "",
        about: "",
        image: null,
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setCowData({ ...cowData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCowData({ ...cowData, image: file });
        }
    };

    const handleSubmit = async () => {
        if (!cowData.name || !cowData.breed || !cowData.healthCondition || !cowData.dob || !cowData.about || !cowData.image) {
            alert("Please fill all fields and upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", cowData.name);
        formData.append("breed", cowData.breed);
        formData.append("healthCondition", cowData.healthCondition);
        formData.append("dob", cowData.dob);
        formData.append("about", cowData.about);
        formData.append("image", cowData.image); 

        try {
            const response = await fetch("http://localhost:5000/add_cow", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                onAddCow(result);
                onClose();
                window.location.reload(); 
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="modal-overlay12">
            <div className="modal-content12">
                <h2>Add New Cow</h2>

                <label>Cow Name:</label>
                <input type="text" name="name" value={cowData.name} onChange={handleChange} />

                <label>Breed:</label>
                <input type="text" name="breed" value={cowData.breed} onChange={handleChange} />

                <label>Health Condition:</label>
                <input type="text" name="healthCondition" value={cowData.healthCondition} onChange={handleChange} />

                <label>Date of Birth:</label>
                <input type="date" name="dob" value={cowData.dob} onChange={handleChange} />

                <label>About:</label>
                <textarea name="about" value={cowData.about} onChange={handleChange}></textarea>

                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />

                <div className="modal-buttons">
                    <button className="add-btn" onClick={handleSubmit}>Add Cow</button>
                    <button className="closee-btnn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
