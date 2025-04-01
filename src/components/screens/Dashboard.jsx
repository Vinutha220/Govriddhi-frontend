
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/explore.css";
import Navbar from "../NavbarGo";

export default function Dashboard() {
    const [cows, setCows] = useState([]);
    const [selectedCow, setSelectedCow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCows();
    }, []);

    const fetchCows = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Unauthorized: Please log in.");
                setLoading(false);
                return;
            }

            const response = await axios.get("http://127.0.0.1:5000/goshala/cows", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCows(response.data);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Failed to fetch cows. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cow) => {
        setSelectedCow(cow);
        setIsModalOpen(true);
    };

    const handleDelete = async (cow_id) => {
        if (!window.confirm("Are you sure you want to delete this cow?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://127.0.0.1:5000/goshala/cows/${cow_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCows(cows.filter((cow) => cow.cow_id !== cow_id));
            alert("Cow deleted successfully!");
        } catch (error) {
            console.error("Error deleting cow:", error);
            alert("Failed to delete cow.");
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!selectedCow) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://127.0.0.1:5000/goshala/cows/${selectedCow.cow_id}`,
                selectedCow,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );

            setCows(cows.map((cow) => (cow.cow_id === selectedCow.cow_id ? response.data : cow)));
            alert("Cow details updated successfully!");
            handleFormClose();
        } catch (error) {
            console.error("Error updating cow:", error);
            alert("Failed to update cow details.");
        }
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
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="cows-grid89">
                    {cows.map((cow) => (
                        <div key={cow.cow_id} className="cow-card89">
                            <img
                                src={`http://127.0.0.1:5000/${cow.image}` || "/default-cow.jpg"}
                                alt={cow.name}
                                className="cow-imagee"
                            />
                            <div className="cow-info">
                                <h2>{cow.name}</h2>
                                <p><strong>Breed:</strong> {cow.breed}</p>
                                <p><strong>DOB:</strong> {cow.dob} years</p>
                                <p><strong>Health:</strong> {cow.healthCondition}</p>
                                <p><strong>About:</strong> {cow.about}</p>

                                <button className="edit-btn" onClick={() => handleEdit(cow)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(cow.cow_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && selectedCow && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h2>Edit Cow Details</h2>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    type="text"
                                    placeholder="Cow Name"
                                    value={selectedCow.name}
                                    onChange={(e) => setSelectedCow({ ...selectedCow, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Breed"
                                    value={selectedCow.breed}
                                    onChange={(e) => setSelectedCow({ ...selectedCow, breed: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Health Condition"
                                    value={selectedCow.healthCondition}
                                    onChange={(e) => setSelectedCow({ ...selectedCow, healthCondition: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="About the cow"
                                    value={selectedCow.about}
                                    onChange={(e) => setSelectedCow({ ...selectedCow, about: e.target.value })}
                                    required
                                />
                                <button type="submit" className="save-btn">Save Changes</button>
                                <button type="button" className="cancel-btn" onClick={handleFormClose}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
