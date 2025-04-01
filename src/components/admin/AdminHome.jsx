import React, { useState, useEffect } from "react";
import "../../assets/css/adminhome.css";
import Nav from "./navv";

export default function AdminGaushalaApproval() {
  const [gaushalas, setGaushalas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/gaushalas/pending") // Flask API URL
      .then((res) => res.json())
      .then((data) => {
        setGaushalas(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleApproval = (id, status) => {
    const token = localStorage.getItem("token");  // Retrieve the token from localStorage (or sessionStorage)

    fetch(`http://127.0.0.1:5000/admin/approvegoshala/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Add token to Authorization header
        },
        body: JSON.stringify({ status }),
    })
    .then((res) => res.json())
    .then(() => {
        setGaushalas(gaushalas.filter((g) => g._id !== id));
    })
    .catch((error) => console.error("Error updating status:", error));
};

const handleReject = (id) => {
    const token = localStorage.getItem("token");  

    fetch(`http://127.0.0.1:5000/admin/rejectgoshala/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
        },
    })
    .then((res) => res.json())
    .then(() => {
        setGaushalas(gaushalas.filter((g) => g._id !== id));
    })
    .catch((error) => console.error("Error updating status:", error));
};


  return (
    <>
      <Nav />
      <div className="admin-container">
        <h2 style={{ color: "green" }}>Admin Panel - Verify Gaushalas</h2>

        {loading ? (
          <p>Loading...</p>
        ) : gaushalas.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <div className="gaushala-list">
            {gaushalas.map((gaushala) => (
              <div key={gaushala._id} className="gaushala-card">
                <h3>{gaushala.goshalaName}</h3>
                <p><strong>Location:</strong> {gaushala.address}</p>
                <p><strong>Owner:</strong> {gaushala.ownerName}</p>
                <p><strong>Contact:</strong> {gaushala.contactNumber}</p>
                <p><strong>District:</strong> {gaushala.district}</p>
                <p><strong>State:</strong> {gaushala.state}</p>
                <p><strong>Email:</strong> {gaushala.email}</p>
                <p><strong>No of Cows:</strong> {gaushala.noOfCows}</p>

                <div className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => handleApproval(gaushala._id, true)}
                    disabled={gaushala.approval} 
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(gaushala._id)}
                    disabled={gaushala.approval} 
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
