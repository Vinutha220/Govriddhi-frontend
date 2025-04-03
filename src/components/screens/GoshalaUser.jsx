
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../assets/css/goshalasUser.css";
import { Link } from "react-router-dom";
import GaushalaInfoCard from "../GaushalaInfoCard";
import axios from "axios";

export default function GoshalaUser() {
  const [goshalas, setGoshalas] = useState([]);
  const [selectedGoshala, setSelectedGoshala] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoshalas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/gaushalas");
        setGoshalas(response.data);
      } catch (err) {
        console.error("Error fetching goshalas:", err);
        setError("Failed to load goshalas. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoshalas();
  }, []);

  const handleMore = (goshala) => (e) => {
    e.preventDefault();
    setSelectedGoshala(goshala);
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setSelectedGoshala(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading goshalas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="goshala-user-container">
      <Navbar />
      <div className="explore-goshalas">
        <div className="header-section">
          <h1 className="main-title" style={{color:"green"}}>Our Gaushala Network</h1>
          <p className="subtitle">Discover and connect with sacred cow shelters across the region</p>
        </div>

        <div className="goshalas-grid">
          {goshalas.length > 0 ? (
            goshalas.map((goshala) => (
              <div key={goshala._id || goshala.id} className="goshala-card2">
                <Link 
                  to={`/cows?goshalaId=${goshala._id || goshala.id}`} 
                  className="goshala-link"
                >
                  <div className="image-container7">
                    <img 
                      src={
                        goshala.image 
                          ? `http://127.0.0.1:5000/${goshala.image}`
                          : "/images/goshala-default.jpg"
                      } 
                      alt={goshala.goshalaName || goshala.name} 
                      className="goshala-image5"
                      onError={(e) => {
                        e.target.src = "/images/goshala-default.jpg";
                      }}
                    />
                    <div className="image-overlay">
                      <span>View Cows</span>
                    </div>
                  </div>
                </Link>
                <div className="goshala-info">
                  <h2 className="goshala-name">{goshala.goshalaName || goshala.name}</h2>
                  <p className="goshala-location">
                    {goshala.city && `${goshala.city}, `}
                    {goshala.district && `${goshala.district}, `}
                    {goshala.state}
                  </p>
                  <button 
                    className="more-info-btn"
                    onClick={handleMore(goshala)}
                  >
                    More Info
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-goshalas">
              <p>No goshalas available at the moment.</p>
            </div>
          )}
        </div>

        {isModalOpen && selectedGoshala && (
          <GaushalaInfoCard 
            goshala={selectedGoshala} 
            onClose={handleFormClose} 
          />
        )}
      </div>
    </div>
  );
}