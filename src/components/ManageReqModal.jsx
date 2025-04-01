import React from 'react';
import '../assets/css/manageReq.css';

export default function ManageReqModal({ requests, onClose, onApprove, onReject }) {
    return (
        <div className="modal-overlay111">
            <div className="modal-content111">
                <h2>Adoption Requests</h2>

                {requests.length === 0 ? (
                    <p>No adoption requests available.</p>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="request-card111">
                            <h3>{request.userName}</h3>
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Phone:</strong> {request.phone}</p>
                            <p><strong>Address:</strong> {request.address}</p>
                            <p><strong>Occupation:</strong> {request.occupation}</p>
                            <p><strong>Cow Name:</strong> {request.cowName}</p>
                            <p><strong>Cow ID:</strong> {request.cowId}</p>
                            <p><strong>Adoption Status:</strong> {request.status}</p>

                            <div className="modal-buttons">
                                <button className="approve-btn" onClick={() => onApprove(request.id)}>Approve</button>
                                <button className="reject-btn" onClick={() => onReject(request.id)}>Reject</button>
                            </div>
                        </div>
                    ))
                )}

                <button className="close-btn111" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
