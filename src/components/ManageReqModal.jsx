// import React, { useEffect, useState } from "react";
// import "../assets/css/manageReq.css";

// export default function ManageReqModal({ onClose }) {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             const response = await fetch("http://127.0.0.1:5000/adoption_requests", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setRequests(data);
//             } else {
//                 alert("Error fetching requests: " + data.message);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleApprove = async (id) => {
//         try {
//             const response = await fetch(`http://127.0.0.1:5000/adoption_requests/${id}/approve`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 setRequests(requests.map((req) => (req.cow_id === id ? { ...req, status: "approved" } : req)));
//             } else {
//                 alert("Failed to approve request");
//             }
//         } catch (error) {
//             console.error("Error approving request:", error);
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             const response = await fetch(`http://127.0.0.1:5000/adoption_requests/${id}/reject`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 setRequests(requests.map((req) => (req.cow_id === id ? { ...req, status: "rejected" } : req)));
//             } else {
//                 alert("Failed to reject request");
//             }
//         } catch (error) {
//             console.error("Error rejecting request:", error);
//         }
//     };

//     return (
//         <div className="modal-overlay111">
//             <div className="modal-content111">
//                 <h2>Adoption Requests</h2>

//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : requests.length === 0 ? (
//                     <p>No adoption requests available.</p>
//                 ) : (
//                     requests.map((request) => (
//                         <div key={request.cow_id} className="request-card111">
//                             <h3>{request.full_name}</h3>
//                             <p><strong>Adhar:</strong> {request.adhar}</p>
//                             <p><strong>Phone:</strong> {request.mobile}</p>
//                             <p><strong>Address:</strong> {request.address}</p>
//                             <p><strong>Occupation:</strong> {request.occupation}</p>
//                             <p><strong>Cow ID:</strong> {request.cow_id}</p>
//                             <p><strong>Reason:</strong> {request.reason}</p>
//                             <p><strong>Adoption Status:</strong> {request.status}</p>

//                             <div className="modal-buttons">
//                                 <button className="approve-btn" onClick={() => handleApprove(request.cow_id)}>Approve</button>
//                                 <button className="reject-btn" onClick={() => handleReject(request.cow_id)}>Reject</button>
//                             </div>
//                         </div>
//                     ))
//                 )}

//                 <button className="close-btn111" onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from "react";
import "../assets/css/manageReq.css";

export default function ManageReqModal({ onClose }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/adoption_requests", {
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
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

   const updateStatus = async (id, status) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/update_status/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Request ${status} successfully!`); // Show success message

            setRequests(requests.map((req) => 
                req.cow_id === id 
                    ? { ...req, status, reference_number: status === "approved" ? data.reference_number : null }
                    : req
            ));

            setTimeout(() => {
                window.location.reload(); // Reload page after update
            }, 1000); // Delay for a better user experience
        } else {
            alert("Failed to update status: " + data.message);
        }
    } catch (error) {
        console.error("Error updating status:", error);
    }
};

    return (
        <div className="modal-overlay111">
            <div className="modal-content111">
                <h2>Adoption Requests</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : requests.length === 0 ? (
                    <p>No adoption requests available.</p>
                ) : (
                    requests.map((request) => (
                        <div key={request.cow_id} className="request-card111">
                            <h3>{request.full_name}</h3>
                            <p><strong>Adhar:</strong> {request.adhar}</p>
                            <p><strong>Phone:</strong> {request.mobile}</p>
                            <p><strong>Address:</strong> {request.address}</p>
                            <p><strong>Occupation:</strong> {request.occupation}</p>
                            <p><strong>Cow ID:</strong> {request.cow_id}</p>
                            <p><strong>Reason:</strong> {request.reason}</p>
                            <p><strong>Adoption Status:</strong> {request.status}</p>
                            {request.status === "approved" && (
                                <p><strong>Reference Number:</strong> {request.reference_number}</p>
                            )}

                            <div className="modal-buttons">
                                {request.status === "pending" && (
                                    <>
                                        <button className="approve-btn" onClick={() => updateStatus(request._id, "approved")}>Approve</button>
                                        <button className="reject-btn" onClick={() => updateStatus(request._id, "rejected")}>Reject</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}

                <button className="close-btn111" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
