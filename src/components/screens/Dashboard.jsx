// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../assets/css/explore.css';
// import Navbar from '../NavbarGo';
// import AdoptionFormModal from '../AdoptionFormModal';

// export default function Dashboard() {
//     const [cows, setCows] = useState([]);
//     const [selectedCow, setSelectedCow] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchCows = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:5000/goshala/cows");
//                 setCows(response.data);
//             } catch (err) {
//                 setError("Failed to fetch cows. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCows();
//     }, []);

//     const handleAdopt = (cow) => {
//         setSelectedCow(cow);
//         setIsModalOpen(true);
//     };

//     const handleFormClose = () => {
//         setIsModalOpen(false);
//         setSelectedCow(null);
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="explore-cows">
//                 <h1 className="explore-title">Gaushala Dashboard</h1>
//                 <p className="page-subtitle">manage your cows here</p>

//                 {loading ? <p>Loading cows...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : null}

//                 <div className="cows-grid">
//                     {cows.map((cow, index) => (
//                         <div key={index} className="cow-card">
//                             <img src={cow.image} alt={cow.name} className="cow-imagee" />
//                             <div className="cow-info">
//                                 <h2>{cow.name}</h2>
//                                 <p><strong>Breed:</strong> {cow.breed}</p>
//                                 <p><strong>Age:</strong> {cow.age} years</p>
//                                 <p><strong>Health:</strong> {cow.health}</p>
//                                 <button className="adopt-btn" onClick={() => handleAdopt(cow)}>Edit</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

         
//                 {isModalOpen && (
//                     <AdoptionFormModal
//                         cow={selectedCow}
//                         onClose={handleFormClose}
//                     />
//                 )}
//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/explore.css';
import Navbar from '../NavbarGo';
import AdoptionFormModal from '../AdoptionFormModal';

export default function Dashboard() {
    const [cows, setCows] = useState([]);
    const [selectedCow, setSelectedCow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCows = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token from local storage
                if (!token) {
                    setError("Unauthorized: Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://127.0.0.1:5000/goshala/cows", {
                    headers: { Authorization: `Bearer ${token}` }  
                });
                console.log(response)
                setCows(response.data);
            } catch (err) {
                console.log(err)
                setError(err.response?.data?.message || "Failed to fetch cows. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCows();
    }, []);

    const handleEdit = (cow) => {
        setSelectedCow(cow);
        setIsModalOpen(true);
    };

    const handleFormClose = () => {
        setIsModalOpen(false);
        setSelectedCow(null);
    };

    return (
        <>
            <Navbar />
            <div className="explore-cows">
                <h1 className="explore-title">Gaushala Dashboard</h1>
                <p className="page-subtitle">Manage your cows here</p>

                {loading && <p>Loading cows...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="cows-grid">
                    {cows.map((cow) => (
                        <div key={cow.cow_id} className="cow-card">  {/* Use cow_id as unique key */}
                            <img src={cow.image || "/default-cow.jpg"} alt={cow.name} className="cow-imagee" />
                            <div className="cow-info">
                                <h2>{cow.name}</h2>
                                <p><strong>Breed:</strong> {cow.breed}</p>
                                <p><strong>Age:</strong> {cow.age} years</p>
                                <p><strong>Health:</strong> {cow.health}</p>
                                <button className="adopt-btn" onClick={() => handleEdit(cow)}>Edit</button>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <AdoptionFormModal
                        cow={selectedCow}
                        onClose={handleFormClose}
                    />
                )}
            </div>
        </>
    );
}
