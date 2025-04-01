// import React, { useState } from "react";
// import Navbar from "../Navbar";
// import "../../assets/css/goshalasUser.css";
// import { Link } from "react-router-dom";
// import GaushalaInfoCard from "../GaushalaInfoCard";

// export default function GoshalaUser() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleMore = () => {
//     setIsModalOpen(true);
//   };

//   const handleFormClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="explore-goshalas">
//         <h1>Our Gaushala Network</h1>

//         <div className="goshalas-grid">
//           {/* Goshala Card 1 */}
//           <div className="goshala-card">
//             <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
//               <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
//             </Link>
//             <div className="goshala-info">
//               <h2>Krishna Goshala</h2>
//               <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
//             </div>
//           </div>

//           {/* Goshala Card 2 */}
//           <div className="goshala-card">
//             <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
//               <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
//             </Link>
//             <div className="goshala-info">
//               <h2>Radha Goshala</h2>
//               <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
//             </div>
//           </div>

//           {/* Goshala Card 3 */}
//           <div className="goshala-card">
//             <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
//               <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
//             </Link>
//             <div className="goshala-info">
//               <h2>Govind Goshala</h2>
//               <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
//             </div>
//           </div>

//           {/* Goshala Card 4 */}
//           <div className="goshala-card">
//             <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
//               <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
//             </Link>
//             <div className="goshala-info">
//               <h2>Nanda Goshala</h2>
//               <button className="moreInfo-btn" onClick={handleMore}>More info..</button>
//             </div>
//           </div>
//         </div>

//         {/* Modal Popup for More Info */}
//         {isModalOpen && <GaushalaInfoCard onClose={handleFormClose} />}
//       </div>
//     </div>
//   );
// }


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
        setError("Failed to load goshalas. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoshalas();
  }, []);

  const handleMore = (goshala) => {
    setSelectedGoshala(goshala);
    setIsModalOpen(true);
  };

  const handleFormClose = () => {
    setIsModalOpen(false);
    setSelectedGoshala(null);
  };

  return (
    <div>
      <Navbar />
      <div className="explore-goshalas">
        <h1>Our Gaushala Network</h1>

        {loading && <p>Loading goshala data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="goshalas-griddd">
          {goshalas.map((goshala, index) => (
            <div key={index} className="goshala-carddd">
              {/* <Link to="/cows" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
              </Link> */}
              <Link to={`/cows?goshalaId=${goshala.id}`} 
              style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/images/goshala3.jpg" alt="goshala" className="goshala-imagee" />
                </Link>
              <div className="goshala-info">
                <h2>{goshala.goshalaName || goshala.name}</h2>
                <button className="moreInfo-btn" onClick={() => handleMore(goshala)}>More info..</button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Popup for More Info */}
        {isModalOpen && selectedGoshala && (
          <GaushalaInfoCard goshala={selectedGoshala} onClose={handleFormClose} />
        )}
      </div>
    </div>
  );
}
