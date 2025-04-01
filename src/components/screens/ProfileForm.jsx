import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileForm = ({ goshalaId }) => {
  const [profileData, setProfileData] = useState({
    mission: "",
    vision: "",
    facilities: "",
    spiritual_significance: "",
    address: "",
  });

  // Load profile data if it already exists (optional, if you need to pre-fill the form)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/gaushala/${goshalaId}/profile`
        );
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    if (goshalaId) {
      fetchProfileData();
    }
  }, [goshalaId]);

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
        `http://127.0.0.1:5000/gaushala/profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
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

export default ProfileForm;
