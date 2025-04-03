// import React, { useState, useEffect } from "react";
// import "../../assets/css/adminhome.css";
// import Nav from "./navv";

// export default function AdminGaushalaApproval() {
//   const [gaushalas, setGaushalas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/gaushalas/pending") // Flask API URL
//       .then((res) => res.json())
//       .then((data) => {
//         setGaushalas(data);
//         setLoading(false);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleApproval = (id, status) => {
//     const token = localStorage.getItem("token");  // Retrieve the token from localStorage (or sessionStorage)

//     fetch(`http://127.0.0.1:5000/admin/approvegoshala/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,  // Add token to Authorization header
//         },
//         body: JSON.stringify({ status }),
//     })
//     .then((res) => res.json())
//     .then(() => {
//         setGaushalas(gaushalas.filter((g) => g._id !== id));
//     })
//     .catch((error) => console.error("Error updating status:", error));
// };

// const handleReject = (id) => {
//     const token = localStorage.getItem("token");  

//     fetch(`http://127.0.0.1:5000/admin/rejectgoshala/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, 
//         },
//     })
//     .then((res) => res.json())
//     .then(() => {
//         setGaushalas(gaushalas.filter((g) => g._id !== id));
//     })
//     .catch((error) => console.error("Error updating status:", error));
// };


//   return (
//     <>
//       <Nav />
//       <div className="admin-container">
//         <h2 style={{ color: "green" }}>Admin Panel - Verify Gaushalas</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : gaushalas.length === 0 ? (
//           <p>No pending requests.</p>
//         ) : (
//           <div className="gaushala-list">
//             {gaushalas.map((gaushala) => (
//               <div key={gaushala._id} className="gaushala-card">
//                 <h3>{gaushala.goshalaName}</h3>
//                 <p><strong>Location:</strong> {gaushala.address}</p>
//                 <p><strong>Owner:</strong> {gaushala.ownerName}</p>
//                 <p><strong>Contact:</strong> {gaushala.contactNumber}</p>
//                 <p><strong>District:</strong> {gaushala.district}</p>
//                 <p><strong>State:</strong> {gaushala.state}</p>
//                 <p><strong>Email:</strong> {gaushala.email}</p>
//                 <p><strong>No of Cows:</strong> {gaushala.noOfCows}</p>

//                 <div className="action-buttons">
//                   <button
//                     className="approve-btn"
//                     onClick={() => handleApproval(gaushala._id, true)}
//                     disabled={gaushala.approval} 
//                   >
//                     ✅ Approve
//                   </button>
//                   <button
//                     className="reject-btn"
//                     onClick={() => handleReject(gaushala._id)}
//                     disabled={gaushala.approval} 
//                   >
//                     ❌ Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import "../../assets/css/adminhome.css";
import Nav from "./navv";
import { FaEnvelope, FaUser, FaCalendarAlt, FaCheck, FaTimes } from "react-icons/fa";

export default function AdminDashboard() {
  const [gaushalas, setGaushalas] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("gaushalas"); // 'gaushalas' or 'messages'

  useEffect(() => {
    // Fetch pending gaushalas
    fetch("http://127.0.0.1:5000/gaushalas/pending")
      .then((res) => res.json())
      .then((data) => {
        setGaushalas(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching gaushalas:", error));

    // Fetch contact messages
    fetch("http://127.0.0.1:5000/api/contact/messages", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleApproval = (id, status) => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:5000/admin/approvegoshala/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

  const markMessageAsRead = (messageId) => {
    // Implement API call to mark message as read
    console.log("Marking message as read:", messageId);
    // Update local state
    setMessages(messages.map(msg => 
      msg._id === messageId ? {...msg, read: true} : msg
    ));
  };

  return (
    <>
      <Nav />
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === "gaushalas" ? "active" : ""}`}
            onClick={() => setActiveTab("gaushalas")}
          >
            Gaushala Approvals
          </button>
          <button 
            className={`tab-btn ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            User Messages
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : activeTab === "gaushalas" ? (
          <div className="approval-section">
            <h3 className="section-title">Pending Gaushala Approvals</h3>
            {gaushalas.length === 0 ? (
              <p className="no-data">No pending requests.</p>
            ) : (
              <div className="card-grid">
                {gaushalas.map((gaushala) => (
                  <div key={gaushala._id} className="approval-card">
                    <div className="card-header">
                      <h3>{gaushala.goshalaName}</h3>
                      <span className="location">{gaushala.district}, {gaushala.state}</span>
                    </div>
                    <div className="card-body">
                      <div className="info-row">
                        <FaUser className="icon" />
                        <span>{gaushala.ownerName}</span>
                      </div>
                      <div className="info-row">
                        <FaEnvelope className="icon" />
                        <span>{gaushala.email}</span>
                      </div>
                      <div className="info-row">
                        <FaCalendarAlt className="icon" />
                        <span>{gaushala.noOfCows} cows</span>
                      </div>
                      <p className="address">{gaushala.address}</p>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn approve"
                        onClick={() => handleApproval(gaushala._id, true)}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() => handleReject(gaushala._id)}
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="messages-section">
            <h3 className="section-title">User Messages</h3>
            {messages.length === 0 ? (
              <p className="no-data">No messages yet.</p>
            ) : (
              <div className="messages-list">
                {messages.map((message) => (
                  <div 
                    key={message._id} 
                    className={`message-card ${message.read ? "read" : "unread"}`}
                    onClick={() => markMessageAsRead(message._id)}
                  >
                    <div className="message-header">
                      <span className="sender">{message.name}</span>
                      <span className="email">{message.email}</span>
                      <span className="date">
                        {new Date(message.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="message-content">
                      {message.message}
                    </div>
                    {!message.read && <div className="unread-badge">New</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}