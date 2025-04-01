import React from "react";
import "../../assets/css/pending.css";
import { Link } from "react-router-dom";

export default function PendingPage() {
  return (
    <div className="pending-container">
      <div className="pending-box">
        <h2>⏳ Approval Pending</h2>
        <p>Your Gaushala registration is under review by the admin.</p>
        <p>Please login after <strong>24 hours</strong> or contact the admin for assistance.</p>

        <div className="admin-contact">
          <h3>📞 Admin Contact</h3>
          <p><strong>Email:</strong> admin@govriddhi.com</p>
          <p><strong>Phone:</strong> +91 9008336132</p>
        </div>

        <Link to="/" className="back-home-btn">🔙 Go to Homepage</Link>
      </div>
    </div>
  );
}
