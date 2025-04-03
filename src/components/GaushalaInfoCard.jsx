import React from 'react';
import '../assets/css/gaushalaInfo.css'; 

export default function GaushalaInfoCard({goshala, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
       
        <h2 style={{color:"green"}}>{goshala.goshalaName}</h2>

        <div className="modal-body">
          {/* <p>
            Krishna Goshala is a sacred and serene sanctuary dedicated to the protection, care, and service of cows, inspired by Lord Krishna, the eternal Gopal (cow protector) and Govinda (one who brings joy to cows). This goshala is committed to preserving and nurturing cows in a safe, loving, and sustainable environment, following the Vedic tradition of Gau Seva (cow service).
          </p> */}

          <p><strong>🌿 Mission & Vision</strong></p>
          <span>
            {goshala.profile_info.mission}
          </span>

          <p><strong>🏡 Facilities & Services</strong></p>
          <span>
            {goshala.profile_info.facilities}
          </span>

          <p>🌏 <strong>Spiritual & Cultural Significance</strong></p>
          <span>
          {goshala.profile_info.spiritual_significance}
           </span>

          <p><strong>Address: </strong></p>
          <span>
           {goshala.address}
          </span>
          <button className="close-btnn" onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  );
}
