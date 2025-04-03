import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/profileForm.css";

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    mission: "",
    facilities: "",
    spiritual_significance: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("mission", profileData.mission);
    formData.append("facilities", profileData.facilities);
    formData.append("spiritual_significance", profileData.spiritual_significance);
    
    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      window.location.href = "/GohomePage";
    } catch (error) {
      alert("Error saving profile information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-form-container">
      <div className="form-header">
        <h1 style={{color:"green"}}>
          <span className="icon">🏛️</span>
          Update Goshala Information
        </h1>
        <p className="subtitle">Share your sacred mission with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-section">
          <div className="floating-label">
            <textarea
              name="mission"
              id="mission"
              value={profileData.mission}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="mission">Mission & Vision</label>
            <div className="icon-container">
              <span className="form-icon">✨</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="floating-label">
            <textarea
              name="facilities"
              id="facilities"
              value={profileData.facilities}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="facilities">Key Features & Services</label>
            <div className="icon-container">
              <span className="form-icon">🏛️</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="floating-label">
            <textarea
              name="spiritual_significance"
              id="spiritual_significance"
              value={profileData.spiritual_significance}
              onChange={handleChange}
              required
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="spiritual_significance">Spiritual & Cultural Importance</label>
            <div className="icon-container">
              <span className="form-icon">🕉️</span>
            </div>
          </div>
        </div>

        <div className="form-section image-upload-section">
          <label className="file-upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-upload-input"
            />
            <div className="upload-content">
              <span className="upload-icon">📷</span>
              <span className="upload-text">
                {previewImage ? "Change Image" : "Upload Goshala Image"}
              </span>
            </div>
          </label>
          {previewImage && (
            <div className="image-preview-container">
              <img src={previewImage} alt="Preview" className="preview-image" />
              <div className="image-overlay">
                <span className="overlay-text">Preview</span>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;