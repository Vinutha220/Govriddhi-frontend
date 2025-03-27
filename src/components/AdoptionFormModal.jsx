import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/adoptionFormModal.css'; 

const AdoptionFormModal = ({ cow, onClose }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        adhar: '',
        mobile: '',
        occupation: '',
        address: '',
        reason: ''
    });

    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const adoptionRequest = {
            ...formData,
            cow_id: cow._id 
        };

        try {
            const response = await axios.post("http://127.0.0.1:5000/adopt", adoptionRequest,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            alert(`Adoption request sent for ${cow.name}! We will review your request.`);
            onClose();
        } catch (err) {
            setError("Failed to send adoption request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adopt {cow.name}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Your Full Name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="adhar"
                        placeholder="Your Adhar number"
                        required
                        value={formData.adhar}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Your Phone Number"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="occupation"
                        placeholder="Your Occupation"
                        required
                        value={formData.occupation}
                        onChange={handleChange}
                    />
                    <textarea
                        name="address"
                        placeholder="Your Address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <textarea
                        name="reason"
                        placeholder="Why do you want to adopt this cow?"
                        required
                        value={formData.reason}
                        onChange={handleChange}
                    />
                    <div className="modal-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Request"}
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdoptionFormModal;
