import React from 'react';
import '../assets/css/gaushalaInfo.css'; 

export default function GaushalaInfoCard({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
       
        <h2 style={{color:"green"}}>Radha Krishna Gaushala</h2>

        <div className="modal-body">
          <p>
            Krishna Goshala is a sacred and serene sanctuary dedicated to the protection, care, and service of cows, inspired by Lord Krishna, the eternal Gopal (cow protector) and Govinda (one who brings joy to cows). This goshala is committed to preserving and nurturing cows in a safe, loving, and sustainable environment, following the Vedic tradition of Gau Seva (cow service).
          </p>

          <p><strong>🌿 Mission & Vision</strong></p>
          <span>
            ✅ Rescue, protect, and care for abandoned, injured, and elderly cows. <br />
            ✅ Promote ethical and sustainable cow-based farming practices. <br />
            ✅ Encourage the use of organic and Panchagavya products for a healthy lifestyle. <br />
            ✅ Educate people on the importance of cows in Hindu culture, Ayurveda, and sustainable agriculture.
          </span>

          <p><strong>🏡 Facilities & Services</strong></p>
          <span>
            🔹 Cow Shelter & Rescue: Provides a secure and nurturing environment for rescued and retired cows. <br />
            🔹 Veterinary Care & Rehabilitation: Ensures proper medical support, including ayurvedic treatments for cows. <br />
            🔹 Organic Dairy Farming: Ethical production of A2 milk, curd, ghee, and butter from indigenous breeds. <br />
            🔹 Panchagavya Products: Produces cow dung cakes, bio-fertilizers, incense, and Ayurvedic medicines. <br />
            🔹 Eco-Friendly Initiatives: Promotes organic farming, gobar gas energy, and sustainable rural development. <br />
            🔹 Spiritual Activities: Conducts Gau Puja, Bhajans, and Vedic rituals to honor and serve cows. <br />
            🔹 Adoption & Sponsorship Program: Allows devotees to adopt or sponsor a cow’s care.
          </span>

          <p>🌏 <strong>Spiritual & Cultural Significance</strong></p>
          <span>
            Cows are deeply revered in Hinduism as symbols of prosperity, purity, and divine blessings. Lord Krishna, who grew up as a cowherd, taught the importance of Gau Seva (cow service) for spiritual and ecological well-being. At Krishna Goshala, devotees and visitors participate in Gau Puja, feeding rituals, and Krishna Kirtans, experiencing the divine connection between cows and humanity.
          </span>

          <p><strong>Address: </strong></p>
          <span>
            #43, 4th cross 2nd main Ashwath Nagar 
            Bengaluru - 560038
          </span>
          <button className="close-btnn" onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  );
}
