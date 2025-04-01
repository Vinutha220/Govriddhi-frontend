import React from 'react'
import Navbar from '../NavbarGo';
import '../../assets/css/Gohome.css';

export default function GohomePage() {
  return (
        <>
          <Navbar />
        
         
            <div className="hero-section" style={{ backgroundImage: "url('/images/GohomeImg.jpg')" }}>
                    <div className="overlay">
                        <div className="hero-content">
                            <h1 className="hero-title">Welcome to Gaushala Management</h1>
                            <p className="hero-subtitle">
                            Heaven on Earth  </p>
                            <p className="hero-subtitle2">
                           ART OF LIVING GAUSHALA
                            </p>
                            
                            <a href="/dashboard" className="btn-primary">Dashboard</a>
                        </div>
                    </div>
            </div>
    
    
          <section className="about-section">
            <div className="container">
              <h2>About Govriddhi</h2>
              <p>
                Govriddhi is a dedicated platform that connects compassionate users with registered
                goshalas to promote cow welfare through seamless adoption processes. Explore, adopt, and
                contribute to the wellbeing of cows in need.
              </p>
            </div>
          </section>
    
          <section className="features-section">
            <div className="container">
              <h2>Key Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>Browse Cows</h3>
                  <p>Explore profiles of cows from registered goshalas.</p>
                </div>
                <div className="feature-card">
                  <h3>Adoption Requests</h3>
                  <p>Send adoption requests and track status updates.</p>
                </div>
                <div className="feature-card">
                  <h3>Goshala Management</h3>
                  <p>Goshalas manage cow profiles and review adoption requests.</p>
                </div>
                <div className="feature-card">
                  <h3>Secure & Transparent</h3>
                  <p>Real-time notifications and verified adoption process.</p>
                </div>
              </div>
            </div>
          </section>
    
          <footer className="site-footer">
            <div className="container">
              <p>&copy; 2025 Govriddhi - Promoting Cow Welfare and Adoption</p>
            </div>
          </footer>
       </>
      
  )
}

