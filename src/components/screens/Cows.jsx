import React, { useState } from "react";
import "../../assets/css/goshalasUser.css";
import Navbar from "../Navbar";
import CowInfoCard from "../cowInfoCard";

const cows = [
  {
    id: "COW001",
    name: "Radha",
    breed: "Gir",
    healthCondition: "Healthy",
    dob: "10th Feb 2019",
    about: "Radha is a loving cow with a calm nature. She enjoys grazing and being around people.",
    image: "/images/cow1g2.jpg",
  },
  {
    id: "COW002",
    name: "Bansi",
    breed: "Sahiwal",
    healthCondition: "Fit",
    dob: "20th June 2018",
    about: "Bansi is a playful cow, known for her high milk yield and friendly demeanor.",
    image: "/images/cow1g2.jpg",
  },
  {
    id: "COW003",
    name: "Krisha",
    breed: "Tharparkar",
    healthCondition: "Strong",
    dob: "5th May 2020",
    about: "Krisha is a strong cow with a great build and loves to roam around the fields.",
    image: "/images/cow1g2.jpg",
  },
  {
    id: "COW004",
    name: "Tara",
    breed: "Jersey",
    healthCondition: "Excellent",
    dob: "30th August 2017",
    about: "Tara is a high-yield dairy cow with a gentle nature and easygoing attitude.",
    image: "/images/cow1g2.jpg",
  },
];

export default function Cows() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCow, setSelectedCow] = useState(null);

  const handleMore = (cow) => {
    setSelectedCow(cow);
    setShowModal(true);
  };

  const handleAdopt = () => {
    alert(`Thank you for adopting ${selectedCow.name}! 🐮`);
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="explore-goshalas">
        <h1>Explore cows of Krishna Gaushala</h1>

        <div className="goshalas-grid">
          {cows.map((cow) => (
            <div key={cow.id} className="goshala-card">
              <img src={cow.image} alt={cow.name} className="goshala-imagee" />
              <div className="goshala-info">
                <h2>{cow.name}</h2>
                <button className="moreInfo-btn" onClick={() => handleMore(cow)}>
                  More info..
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedCow && (
          <CowInfoCard cow={selectedCow} onClose={() => setShowModal(false)} onAdopt={handleAdopt} />
        )}
      </div>
    </div>
  );
}
