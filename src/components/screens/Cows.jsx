// import React, { useState } from "react";
// import "../../assets/css/goshalasUser.css";
// import Navbar from "../Navbar";
// import CowInfoCard from "../cowInfoCard";

// const cows = [
//   {
//     id: "COW001",
//     name: "Radha",
//     breed: "Gir",
//     healthCondition: "Healthy",
//     dob: "10th Feb 2019",
//     about: "Radha is a loving cow with a calm nature. She enjoys grazing and being around people.",
//     image: "/images/cow1g2.jpg",
//   },
//   {
//     id: "COW002",
//     name: "Bansi",
//     breed: "Sahiwal",
//     healthCondition: "Fit",
//     dob: "20th June 2018",
//     about: "Bansi is a playful cow, known for her high milk yield and friendly demeanor.",
//     image: "/images/cow1g2.jpg",
//   },
//   {
//     id: "COW003",
//     name: "Krisha",
//     breed: "Tharparkar",
//     healthCondition: "Strong",
//     dob: "5th May 2020",
//     about: "Krisha is a strong cow with a great build and loves to roam around the fields.",
//     image: "/images/cow1g2.jpg",
//   },
//   {
//     id: "COW004",
//     name: "Tara",
//     breed: "Jersey",
//     healthCondition: "Excellent",
//     dob: "30th August 2017",
//     about: "Tara is a high-yield dairy cow with a gentle nature and easygoing attitude.",
//     image: "/images/cow1g2.jpg",
//   },
// ];

// export default function Cows() {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCow, setSelectedCow] = useState(null);

//   const handleMore = (cow) => {
//     setSelectedCow(cow);
//     setShowModal(true);
//   };

//   const handleAdopt = () => {
//     alert(`Thank you for adopting ${selectedCow.name}! 🐮`);
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="explore-goshalas">
//         <h1>Explore cows of Krishna Gaushala</h1>

//         <div className="goshalas-grid">
//           {cows.map((cow) => (
//             <div key={cow.id} className="goshala-card">
//               <img src={cow.image} alt={cow.name} className="goshala-imagee" />
//               <div className="goshala-info">
//                 <h2>{cow.name}</h2>
//                 <button className="moreInfo-btn" onClick={() => handleMore(cow)}>
//                   More info..
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {showModal && selectedCow && (
//           <CowInfoCard cow={selectedCow} onClose={() => setShowModal(false)} onAdopt={handleAdopt} />
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "../../assets/css/goshalasUser.css";
// import Navbar from "../Navbar";
// import CowInfoCard from "../cowInfoCard";
// import axios from "axios";

// export default function Cows() {
//   const [cows, setCows] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCow, setSelectedCow] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Get goshala ID from URL parameters
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const goshalaId = queryParams.get("goshalaId");

//   useEffect(() => {
//     const fetchCows = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:5000/gaushala/cows?goshalaId=${goshalaId}`);
//         setCows(response.data);
//       } catch (err) {
//         console.error("Error fetching cows:", err);
//         setError("Failed to load cows. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (goshalaId) {
//       fetchCows();
//     } else {
//       setLoading(false);
//       setError("No goshala selected.");
//     }
//   }, [goshalaId]);

//   const handleMore = (cow) => {
//     setSelectedCow(cow);
//     setShowModal(true);
//   };

//   const handleAdopt = () => {
//     alert(`Thank you for adopting ${selectedCow.name}! 🐮`);
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="explore-goshalas">
//         <h1>Explore Cows in Goshala</h1>

//         {loading && <p>Loading cows...</p>}
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {cows.length === 0 && !loading && <p>No cows found for this goshala.</p>}

//         <div className="goshalas-grid">
//           {cows.map((cow) => (
//             <div key={cow.id} className="goshala-card">
//               <img src={`http://127.0.0.1:5000/${cow.image}`} alt={cow.name} className="goshala-imagee" />
//               <div className="goshala-info">
//                 <h2>{cow.name}</h2>
//                 <button className="moreInfo-btn" onClick={() => handleMore(cow)}>More info..</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {showModal && selectedCow && (
//           <CowInfoCard cow={selectedCow} onClose={() => setShowModal(false)} onAdopt={handleAdopt} />
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../assets/css/goshalasUser.css";
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
    <div>
      <Navbar />
      <div className="explore-goshalas">
        <h1>Explore Cows in Goshala</h1>

        {loading && <p>Loading cows...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {cows.length === 0 && !loading && !error && <p>No cows found for this goshala.</p>}

        <div className="cows-griddd">
          {cows.map((cow) => (
            <div key={cow.id} className="cows-carddd">
              <img
                src={`http://127.0.0.1:5000/${cow.image}`}
                alt={cow.name}
                className="cow-imagee"
              />
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
