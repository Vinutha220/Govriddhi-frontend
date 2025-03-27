
import React, { useState } from 'react';
import '../assets/css/Navbar.css';
import { Link } from 'react-router-dom';
import MyRequestsModal from './MyRequestsModal'; 

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openRequestsModal = () => {
        setIsRequestsModalOpen(true);
    };

    const closeRequestsModal = () => {
        setIsRequestsModalOpen(false);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <a href="/" className="brand">Govriddhi</a>
                    </div>

                    <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
                        <Link to="/home" className="nav-link">Home</Link>
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openRequestsModal(); }}>My Requests</a>
                        <Link to="/home" className="nav-link">Goshalas</Link>
                        <Link to="/home" className="nav-link">Contact</Link>
                        <Link to="/logout" className="nav-link">Logout</Link>
                        

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
            {isRequestsModalOpen && <MyRequestsModal onClose={closeRequestsModal} />}
        </>
    );
}
