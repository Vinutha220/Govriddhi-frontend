import React, { useEffect, useState } from "react";
import "../assets/css/myRequestsModal.css";

const MyRequestsModal = ({ onClose }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/my_requests", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                setRequests(data);
            } else {
                alert("Error fetching requests: " + data.message);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlayabc">
            <div className="modal-containerqwe">
                <h2 className="modal-title">My Adoption Requests</h2>
                <button className="modal-close-btn" onClick={onClose}>×</button>

                {loading ? (
                    <p>Loading...</p>
                ) : requests.length === 0 ? (
                    <p>No adoption requests available.</p>
                ) : (
                    <div className="requests-list23">
                        {requests.map((request) => (
                            <div key={request.cow_id} className="request-card">
                                <img
                                    src={`http://127.0.0.1:5000/${request.cow_details.image}`}
                                    alt={request.cow_details?.name || "Cow"}
                                    className="cow-image"
                                />
                                <div className="request-details">
                                    <h3>{request.cow_details?.name || "Unknown"}</h3>
                                    <p><strong>Breed:</strong> {request.cow_details?.breed || "Unknown"}</p>
                                    <p><strong>Goshala:</strong> {request.goshala_details?.goshalaName || "Unknown"}</p>
                                    <p><strong>Address:</strong> {request.goshala_details?.address || "Unknown"}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`status ${request.status.toLowerCase()}`}>
                                            {request.status}
                                        </span>
                                    </p>
                                    {request.status === "approved" && request.reference_number && (
                                        <p><strong>Reference No:</strong> {request.reference_number}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRequestsModal;
