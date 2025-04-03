import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/profile.css';
import NavbarGo from '../NavbarGo';

const Info = () => {
  const [goshalaData, setGoshalaData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    goshalaName: '',
    ownerName: '',
    email: '',
    contactNumber: '',
    address: '',
    city: '',
    district: '',
    state: '',
    noOfCows: '',
    mission: '',
    vision: '',
    facilities: '',
    spiritual_significance: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGoshalaData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setGoshalaData(response.data);
        setFormData({
          ...response.data,
          ...response.data.profile_info,
        });
        if (response.data.image) {
          setPreviewImage(`http://127.0.0.1:5000/${response.data.image}`);
        }
      } catch (error) {
        console.error('Error fetching Goshala data:', error);
      }
    };

    fetchGoshalaData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      
      // Add all fields to formData
      Object.keys(formData).forEach(key => {
        if (key === 'image') {
          if (formData[key] instanceof File) {
            formDataToSend.append('image', formData[key]);
          }
        } else if (formData[key] !== undefined && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.put(
        "http://127.0.0.1:5000/profile/update", 
        formDataToSend,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      alert("Profile updated successfully!");

      setEditMode(false);
      setGoshalaData({ ...goshalaData, ...response.data });
      window.location.reload()
      if (response.data.image) {
        setPreviewImage(`http://127.0.0.1:5000/${response.data.image}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!goshalaData) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Goshala Profile...</p>
    </div>
  );

  return (
    <div className="modern-profile-container">
    <NavbarGo/>
      <div className="profile-header">
        <div className="profile-image-container">
          {previewImage ? (
            <img src={previewImage} alt="Goshala" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">
              <i className="fas fa-temple"></i>
            </div>
          )}
          {editMode && (
            <div className="image-upload-wrapper">
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-camera"></i> Change Photo
              </label>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="image-upload-input"
              />
            </div>
          )}
        </div>
        
        <div className="profile-header-content">
          <h1 className="profile-title">{goshalaData.goshalaName}</h1>
          <div className={`approval-status ${goshalaData.approval ? 'approved' : 'pending'}`}>
            {goshalaData.approval ? 'Approved' : 'Pending Approval'}
          </div>
          
          <button 
            className={`edit-profile-btn ${editMode ? 'cancel' : 'edit'}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <i className="fas fa-times"></i> Cancel
              </>
            ) : (
              <>
                <i className="fas fa-edit"></i> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {!editMode ? (
        <div className="profile-details-grid">
          <div className="detail-card owner-card">
            <div className="card-header">
              <i className="fas fa-user-tie"></i>
              <h3>Owner Details</h3>
            </div>
            <div className="card-body">
              <div className="detail-item">
                <span className="detail-label">Owner Name:</span>
                <span className="detail-value">{goshalaData.ownerName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{goshalaData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Contact Number:</span>
                <span className="detail-value">{goshalaData.contactNumber}</span>
              </div>
            </div>
          </div>

          <div className="detail-card address-card">
            <div className="card-header">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Address</h3>
            </div>
            <div className="card-body">
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{goshalaData.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{goshalaData.city || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">District:</span>
                <span className="detail-value">{goshalaData.district}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">State:</span>
                <span className="detail-value">{goshalaData.state}</span>
              </div>
            </div>
          </div>

          <div className="detail-card stats-card">
            <div className="card-header">
              <i className="fas fa-cow"></i>
              <h3>Goshala Stats</h3>
            </div>
            <div className="card-body">
              <div className="stat-item">
                <div className="stat-value">{goshalaData.noOfCows || '0'}</div>
                <div className="stat-label">Cows</div>
              </div>
            </div>
          </div>

          {goshalaData.profile_info && (
            <>
              <div className="detail-card mission-card">
                <div className="card-header">
                  <i className="fas fa-bullseye"></i>
                  <h3>Mission and Vision</h3>
                </div>
                <div className="card-body">
                  <p>{goshalaData.profile_info.mission || 'No mission statement provided'}</p>
                </div>
              </div>

              <div className="detail-card facilities-card">
                <div className="card-header">
                  <i className="fas fa-clipboard-list"></i>
                  <h3>Key Features & Services</h3>
                </div>
                <div className="card-body">
                  <p>{goshalaData.profile_info.facilities || 'No facilities information provided'}</p>
                </div>
              </div>

              <div className="detail-card spiritual-card">
                <div className="card-header">
                  <i className="fas fa-om"></i>
                  <h3>Spiritual & Cultural Importance</h3>
                </div>
                <div className="card-body">
                  <p>{goshalaData.profile_info.spiritual_significance || 'No spiritual significance provided'}</p>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="edit-profile-form">
          <div className="form-grid">
            <div className="form-section">
              <h3><i className="fas fa-info-circle"></i> Basic Information</h3>
              <div className="form-group">
                <label>Goshala Name</label>
                <input 
                  type="text" 
                  name="goshalaName" 
                  value={formData.goshalaName} 
                  onChange={handleChange} 
                  placeholder="Enter Goshala name"
                />
              </div>
              
              <div className="form-group">
                <label>Owner Name</label>
                <input 
                  type="text" 
                  name="ownerName" 
                  value={formData.ownerName} 
                  onChange={handleChange} 
                  placeholder="Enter owner name"
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Enter email"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Number</label>
                <input 
                  type="text" 
                  name="contactNumber" 
                  value={formData.contactNumber} 
                  onChange={handleChange} 
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-map-marked-alt"></i> Address</h3>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Enter address"
                />
              </div>
              
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  placeholder="Enter city"
                />
              </div>
              
              <div className="form-group">
                <label>District</label>
                <input 
                  type="text" 
                  name="district" 
                  value={formData.district} 
                  onChange={handleChange} 
                  placeholder="Enter district"
                />
              </div>
              
              <div className="form-group">
                <label>State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="form-section">
              <h3><i className="fas fa-cow"></i> Goshala Information</h3>
              <div className="form-group">
                <label>Number of Cows</label>
                <input 
                  type="number" 
                  name="noOfCows" 
                  value={formData.noOfCows} 
                  onChange={handleChange} 
                  placeholder="Enter number of cows"
                  min="0"
                />
              </div>
            </div>

            <div className="form-section full-width">
              <h3><i className="fas fa-bullseye"></i> Mission and Vision</h3>
              <textarea 
                name="mission" 
                value={formData.mission} 
                onChange={handleChange} 
                placeholder="Describe your Goshala's mission and vision"
                rows="4"
              />
            </div>

            {/* <div className="form-section full-width">
              <h3><i className="fas fa-eye"></i> Vision</h3>
              <textarea 
                name="vision" 
                value={formData.vision} 
                onChange={handleChange} 
                placeholder="Describe your Goshala's vision"
                rows="4"
              />
            </div> */}

            <div className="form-section full-width">
              <h3><i className="fas fa-clipboard-list"></i> Key Features & Services</h3>
              <textarea 
                name="facilities" 
                value={formData.facilities} 
                onChange={handleChange} 
                placeholder="List the Key Features & Services available at your Goshala"
                rows="4"
              />
            </div>

            <div className="form-section full-width">
              <h3><i className="fas fa-om"></i> Spiritual & Cultural Importance</h3>
              <textarea 
                name="spiritual_significance" 
                value={formData.spiritual_significance} 
                onChange={handleChange} 
                placeholder="Describe the Spiritual & Cultural Importance of your Goshala"
                rows="4"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="save-btn" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> Save Changes
                </>
              )}
            </button>
            <button 
              className="cancel-btn" 
              onClick={() => setEditMode(false)}
              disabled={isLoading}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;