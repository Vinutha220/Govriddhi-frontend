

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/cowUser.css";
import Navbar from "../Navbar";
import CowInfoCard from "../cowInfoCard";
import axios from "axios";

export default function Cows() {
  const [cows, setCows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCow, setSelectedCow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get goshala ID from URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goshalaId = queryParams.get("goshalaId");

  console.log("Goshala ID:", goshalaId); 

  useEffect(() => {
    if (!goshalaId) {
      console.log("No goshalaId provided.");  
      setLoading(false);
      setError("No goshala selected.");
      return;  // Exit if no goshalaId
    }

    const fetchCows = async () => {
      try {
        console.log("Fetching cows for goshalaId:", goshalaId); // Debugging line
        const response = await axios.get(`http://127.0.0.1:5000/gaushala/${goshalaId}/cows`);
        console.log("Cows data received:", response.data); // Debugging line
        setCows(response.data);
      } catch (err) {
        console.error("Error fetching cows:", err);
        setError("Failed to load cows. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCows();
  }, [goshalaId]);

  const handleMore = (cow) => {
    setSelectedCow(cow);
    setShowModal(true);
  };

  const handleAdopt = () => {
    alert(`Thank you for adopting ${selectedCow.name}! 🐮`);
    setShowModal(false);
  };

  return (
    <div  className="cow-user-container">
      <Navbar />
      <div className="explore-cows">
        
        <div className="header-section">
          <h1>Explore Cows in Goshala</h1>
          <p className="subtitle">"Adopt a Cow, Give Love, Change Lives!"</p>
        </div>

        {/* {loading && <p>Loading cows...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {cows.length === 0 && !loading && !error && <p>No cows found for this goshala.</p>} */}

        <div className="cows-grid">

          {cows.length > 0 ? (
            cows.map((cow) => (
            <div key={cow.id} className="cow-card1">
            <div className="image-container8">

            
              <img
                src={`http://127.0.0.1:5000/${cow.image}`}
                alt={cow.name}
                className="cow-image1"
              />
              <div className="image-overlay">
              {/* <span>Adopt Now</span> */}
              </div>
              </div>

              <div className="cow-info">
                <h2 className="cow-name">{cow.name}</h2>
                <button className="more-info-btn" onClick={() => handleMore(cow)}>
                  More info..
                </button>
              </div>
            </div>
            ))
          ):(
             <div className="no-cows">
              <p>No Cows available at the moment.</p>
            </div>
          )}
        </div>

        {showModal && selectedCow && (
          <CowInfoCard cow={selectedCow} onClose={() => setShowModal(false)} onAdopt={handleAdopt} />
        )}
      </div>
    </div>
  );
}
