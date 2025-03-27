import React, { useEffect, useState } from 'react';
import '../assets/css/myRequestsModal.css'; 

const MyRequestsModal = ({ onClose }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        
        const mockRequests = [
            {
                id: 1,
                cowName: 'Gauri',
                breed: 'Gir',
                goshalaName: 'Shree Krishna Goshala',
                status: 'Pending',
                image: '/images/cow1.jpg'
            },
            {
                id: 2,
                cowName: 'Nandi',
                breed: 'Sahiwal',
                goshalaName: 'Gau Seva Dham',
                status: 'Approved',
                image: '/images/cow2.jpg'
            },
            {
                id: 3,
                cowName: 'Kamdhenu',
                breed: 'Kankrej',
                goshalaName: 'Maa Gaushala',
                status: 'Rejected',
                image: '/images/cow3.jpg'
            },
            {
                id: 4,
                cowName: 'Nandi',
                breed: 'Sahiwal',
                goshalaName: 'Gau Seva Dham',
                status: 'Approved',
                image: '/images/cow2.jpg'
            },
            {
                id: 5,
                cowName: 'Kamdhenu',
                breed: 'Kankrej',
                goshalaName: 'Maa Gaushala',
                status: 'Rejected',
                image: '/images/cow3.jpg'
            }

        ];
        setRequests(mockRequests);
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">My Adoption Requests</h2>
                <button className="modal-close-btn" onClick={onClose}>×</button>

                <div className="requests-list">
                    {requests.map((request) => (
                        <div key={request.id} className="request-card">
                            <img src={request.image} alt={request.cowName} className="cow-image" />
                            <div className="request-details">
                                <h3>{request.cowName}</h3>
                                <p><strong>Breed:</strong> {request.breed}</p>
                                <p><strong>Goshala:</strong> {request.goshalaName}</p>
                                <p><strong>Status:</strong> 
                                    <span className={`status ${request.status.toLowerCase()}`}>
                                        {request.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyRequestsModal;
