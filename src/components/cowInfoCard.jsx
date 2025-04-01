import React from "react";
import "../assets/css/cowInfo.css";

export default function CowInfoCard({ cow, onClose, onAdopt }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
       
        
        {/* Image */}
        <div className="image-container">
          <img src={cow.image} alt={cow.name} className="cow-image" />
        </div>

        {/* Details (Displayed one below the other) */}
        <div className="cow-details">
          <h2 style={{color:"gray"}}>🐮 <strong>Cow ID:</strong> {cow.id}</h2>
          <p>📌 <strong>Breed:</strong> {cow.breed}</p>
          <p>❤️ <strong>Health Condition:</strong> {cow.healthCondition}</p>
          <p>🎂 <strong>Date of Birth:</strong> {cow.dob}</p>
          <p>📖 <strong>About:</strong> {cow.about}</p>
       
        </div>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="adopt-btn" onClick={onAdopt}>
            🐄 Adopt Now
          </button>
          <button className="close-modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
