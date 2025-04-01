import React, { useState, useEffect } from "react";
import axios from "axios";

const GoshalaProfileForm = ({ goshalaId }) => {
  const [profileData, setProfileData] = useState({
    mission: "",
    vision: "",
    facilities: "",
    spiritual_significance: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/gaushala/${goshalaId}/profile`,
        profileData
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error saving profile information.");
    }
  };

  return (
    <div>
      <h1>Update Goshala Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Mission</label>
          <textarea
            name="mission"
            value={profileData.mission}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vision</label>
          <textarea
            name="vision"
            value={profileData.vision}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Facilities</label>
          <textarea
            name="facilities"
            value={profileData.facilities}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Spiritual Significance</label>
          <textarea
            name="spiritual_significance"
            value={profileData.spiritual_significance}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={profileData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default GoshalaProfileForm;
