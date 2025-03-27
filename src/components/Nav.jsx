
import React, { useState } from 'react';
import '../assets/css/Navbar.css';
import { Link } from 'react-router-dom';


export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    

    
    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <a href="/" className="brand">Govriddhi</a>
                    </div>

                    <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                        
                        
                        <Link to="/GoReg" className="nav-link">Goshala Registration</Link>
                        

                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
                    </div>
                </div>
            </header>

            {/* My Requests Modal */}
            
        </>
    );
}
