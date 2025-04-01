// import { useState, useEffect } from "react";
// import "../../assets/css/goreg.css"; 

// const GaushalaRegistration = () => {
 

//   return (
//     <div className="container">
   
//       <header className="header">
//         <div className="logo-container">
        
//           <span className="title">GoVriddhi</span>
//         </div>
//         <nav className="nav-links">
        
//           <a href="#" className="active">Goshala Registration</a>
    
//         </nav>
    
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="krishna">
//         <h1>Goshala Registration Form</h1>
//         <p>Please fill in the following details to register your Goshala with GoVriddhi.</p>
//         </div>
//         <div className="image-container">
//           <img src="/images/krishna.jpeg" alt="Krishna and Cow" className="hero-image" />
//         </div>
        
//       </section>

     
//         <section className="form-section">
//           <h2>Register Your Gaushala</h2>
//           <form className="form">
//             <div className="form-group">
         
//               <input type="text" placeholder="Enter Goshala Name" />
//             </div>
//             <div className="form-group">
          
//               <input type="text" placeholder="Enter Owner Name" />
//             </div>
            
//             <div className="form-group">
       
//               <textarea placeholder="Enter Address"></textarea>
//             </div>
//             <div className="form-group">
            
//               <input placeholder="District"></input>
//             </div>
//             <div className="form-group">
          
//               <input placeholder="State"></input>
//             </div>
//             <div className="form-group">
           
//               <input placeholder="No of cows"></input>
//             </div>
//             <div className="form-group">
           
//               <input type="tel" placeholder="Enter Contact Number" />
//             </div>

//             <div className="form-group">
          
//               <input type="tel" placeholder="Email" />
//             </div>
            
//             <button type="submit" className="submit-btn">Register</button>
//             <div className="register11">
//             <p>Already have an account? <a href="/">Login</a></p>
//           </div>
//           </form>
//         </section>

//     </div>
//   );
// };

// export default GaushalaRegistration;
import { useState } from "react";
import "../../assets/css/goreg.css"; 

const GaushalaRegistration = () => {
  const [formData, setFormData] = useState({
    goshalaName: "",
    ownerName: "",
    address: "",
    district: "",
    state: "",
    noOfCows: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // Message for success/failure feedback

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/register_goshala", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for registering! Please login after 3 working days.");
        setFormData({
          goshalaName: "",
          ownerName: "",
          address: "",
          district: "",
          state: "",
          noOfCows: "",
          contactNumber: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container9">
      <header className="header9">
        <div className="logo-container9">
          <span className="title9">GoVriddhi</span>
        </div>
        <nav className="nav-links9">
          <a href="#" className="active">Gaushala Registration</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="heroo">
        <div className="krishna">
          <h1>Gaushala Registration Form</h1>
          <p>Please fill in the following details to register your Gaushala with GoVriddhi.</p>
        </div>
        <div className="image-containerr">
          <img src="/images/krishna.jpeg" alt="Krishna and Cow" className="hero-image" />
        </div>
      </section>

      {/* Registration Form */}
      <section className="form-section9">
        <h2>Register Your Gaushala</h2>
        <form className="form9" onSubmit={handleSubmit}>
          <div className="form-group9">
            <input type="text" name="goshalaName" placeholder="Enter Goshala Name" value={formData.goshalaName} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="text" name="ownerName" placeholder="Enter Owner Name" value={formData.ownerName} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <textarea name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="number" name="noOfCows" placeholder="No of Cows" value={formData.noOfCows} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="tel" name="contactNumber" placeholder="Enter Contact Number" value={formData.contactNumber} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group9">
            <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn9">Register</button>
        </form>

        {/* Display Message after Registration */}
        {message && <p className="success-message9">{message}</p>}

        <div className="register9">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </section>
    </div>
  );
};

export default GaushalaRegistration;
