// import React, { useState } from 'react';
// import "../../assets/css/contactUs.css";

// import { FaPaperPlane, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
// import Navbar from '../Navbar';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const [status, setStatus] = useState(null); // To manage form submission status

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
  

//     console.log("Form submitted", formData);
//     setStatus("Your message has been sent successfully!");
//     setFormData({
//       name: '',
//       email: '',
//       message: ''
//     });
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="contact-us-container">
//       <h1 className="contact-us-title">Get in Touch with Us</h1>

//       {status && <div className="status-message">{status}</div>}

//       <div className="contact-us-details">
//         <div className="contact-methods">
//           <div className="contact-item">
//             <FaEnvelope size={40} />
//             <h3>Email Us</h3>
//             <p>support@govriddhi.com</p>
//           </div>
//           <div className="contact-item">
//             <FaPhoneAlt size={40} />
//             <h3>Call Us</h3>
//             <p>+91 6361863573</p>
//           </div>
//           <div className="contact-item">
//             <FaPaperPlane size={40} />
//             <h3>Send Us a Message</h3>
//             <p>We would love to hear from you.</p>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="contact-form">
//           <div className="form-group">
//             <label htmlFor="name">Full Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your full name"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email address"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="message">Your Message:</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               placeholder="Write your message here..."
//             ></textarea>
//           </div>

//           <button type="submit" className="submit-btn">Send Message</button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// }

import React, { useState } from 'react';
import "../../assets/css/contactUs.css";
import { FaPaperPlane, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Navbar from '../Navbar';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/contact', formData);
      setStatus({ type: 'success', message: response.data.message || 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to send message. Please try again.';
      setStatus({ type: 'error', message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="contact-us-container">
        <h1 className="contact-us-title">Get in Touch with Us</h1>

        
        <div className="contact-us-details">
          <div className="contact-methods">
            <div className="contact-item">
              <FaEnvelope size={40} />
              <h3>Email Us</h3>
              <p>support@govriddhi.com</p>
            </div>
            <div className="contact-item">
              <FaPhoneAlt size={40} />
              <h3>Call Us</h3>
              <p>+91 6361863573</p>
            </div>
            <div className="contact-item">
              <FaPaperPlane size={40} />
              <h3>Send Us a Message</h3>
              <p>We would love to hear from you.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
              ></textarea>
            </div>
            {status && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}