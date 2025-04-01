
import React, { useState } from 'react';
import '../assets/css/Navbar.css';
import { Link } from 'react-router-dom';
import MyRequestsModal from './MyRequestsModal'; 
import AddCowModal from './AddCowModal';
import ManageReqModal from './ManageReqModal';

let adoptionRequests = [
    {
        id: "REQ001",
        userName: "Vinutha",
        email: "vinu@gmail.com",
        phone: "9876543210",
        address: "123, hebbal, bengaluru",
        cowName: "Ganga",
        status: "Pending"
    },
    {
        id: "REQ001",
        userName: "Sahana",
        email: "sahana@gmail.com",
        phone: "9876543210",
        address: "124, basavanagudi, Bengaluru",
        cowName: "Ganga",
        status: "Pending"
    },
    {
        id: "REQ001",
        userName: "Ananya",
        email: "ani@gmail.com",
        phone: "9876543210",
        address: "125, Marathalli,bengaluru",
        cowName: "Ganga",
        status: "Pending"
    }

];


export default function NavbarGo() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
    const [isAddCowModalOpen,setAddCowModalOpen] = useState(false)
    

    const [cows, setCows] = useState([]);

    const handleAddCow = (newCow) => {
        setCows([...cows, newCow]);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openRequestsModal = () => {
        setIsRequestsModalOpen(true);
    };

    const openAddCowModal =()=>{
        setAddCowModalOpen(true)
    }
    const closeAddCowModal=()=>{
        setAddCowModalOpen(false)
    }

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
                        <Link to="/GohomePage" className="nav-link">Home</Link>
                        <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openRequestsModal(); }}>Adoption Requests</a>
                        <a href="/#" className="nav-link" onClick={(e)=>{e.preventDefault();openAddCowModal();}}>Add Cows</a>
                        {/* <Link to="/home" className="nav-link">Contact</Link> */}
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
            {isRequestsModalOpen && <ManageReqModal requests={adoptionRequests} onClose={closeRequestsModal} />}
            
            {/* add cow modal */}

            {isAddCowModalOpen && <AddCowModal onClose={() => setAddCowModalOpen(false)} onAddCow={handleAddCow}/>}
        </>
    );
}
