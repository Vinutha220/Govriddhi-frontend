
import React, { useState } from "react";
import "../assets/css/cowInfo.css";
import AdoptionFormModal from "./AdoptionFormModal";

export default function CowInfoCard({ cow, onClose }) {
  const [selectedCow, setSelectedCow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdopt = (cow) => {
    setSelectedCow(cow);
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setSelectedCow(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Image */}
        <div className="image-container">
          <img
            src={`http://127.0.0.1:5000/${cow.image}`}
            alt={cow.name}
            className="cow-image"
          />
        </div>

        {/* Details (Displayed one below the other) */}
        <div className="cow-details">
          <h2 style={{ color: "gray" }}>
            🐮 <strong>{cow.name}</strong>
          </h2>
          <p>
            📌 <strong>Breed:</strong> {cow.breed}
          </p>
          <p>
            ❤️ <strong>Health Condition:</strong> {cow.healthCondition}
          </p>
          <p>
            🎂 <strong>Date of Birth:</strong> {cow.dob}
          </p>
          <p>
            📖 <strong>About:</strong> {cow.about}
          </p>
        </div>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="adopt-btn" onClick={() => handleAdopt(cow)}>
            🐄 Adopt Now
          </button>
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      {/* Show adoption form modal when adoption button is clicked */}
      {isModalOpen && (
        <AdoptionFormModal
          cow={selectedCow}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
