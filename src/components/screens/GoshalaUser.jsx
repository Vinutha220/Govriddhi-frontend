import React, { useState } from "react";
import Navbar from "../Navbar";
import "../../assets/css/goshalasUser.css";
import { Link } from "react-router-dom";
import GaushalaInfoCard from "../GaushalaInfoCard";

export default function GoshalaUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMore = () => {
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="explore-goshalas">
        <h1>Our Gaushala Network</h1>

        <div className="goshalas-grid">
          {/* Goshala Card 1 */}
          <div className="goshala-card">
            <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
            </Link>
            <div className="goshala-info">
              <h2>Krishna Goshala</h2>
              <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
            </div>
          </div>

          {/* Goshala Card 2 */}
          <div className="goshala-card">
            <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
            </Link>
            <div className="goshala-info">
              <h2>Radha Goshala</h2>
              <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
            </div>
          </div>

          {/* Goshala Card 3 */}
          <div className="goshala-card">
            <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
            </Link>
            <div className="goshala-info">
              <h2>Govind Goshala</h2>
              <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
            </div>
          </div>

          {/* Goshala Card 4 */}
          <div className="goshala-card">
            <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
            </Link>
            <div className="goshala-info">
              <h2>Nanda Goshala</h2>
              <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
            </div>
          </div>
        </div>

        {/* Modal Popup for More Info */}
        {isModalOpen && <GaushalaInfoCard onClose={handleFormClose} />}
      </div>
    </div>
  );
}
