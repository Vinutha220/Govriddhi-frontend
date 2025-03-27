import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/signin.css';

const GoReg = () => {
  const navigate = useNavigate(); // For redirection after successful registration

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/register_goshala', {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000); // Redirect after 2s
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='regContainer'>
      <div className="wrapper2">
        <form onSubmit={handleSubmit}>
          <h2> Goshala Registration </h2>

          {error && <p className="error" style={{ color: "red" }} >{error}</p>}
          {success && <p className="success">{success}</p>}

          <div className="input-field">
            <input type="text" name="name" required onChange={handleChange} />
            <label> Goshala Name</label>
          </div>


          <div className="input-field">
            <input type="email" name="email" required onChange={handleChange} />
            <label>Email</label>
          </div>

          <div className="input-field">
            <input type="text" name="address" required onChange={handleChange} />
            <label>Address</label>
          </div>
             
             <div className="input-field">
            <input type="text" name="mobile" required onChange={handleChange} />
            <label>Mobile</label>
          </div>


          <div className="input-field">
            <input type="password" name="password" required onChange={handleChange} />
            <label>Password</label>
          </div>

          <div className="input-field">
            <input type="password" name="confirm_password" required onChange={handleChange} />
            <label>Re-enter Password</label>
          </div>

          <button type="submit">Register</button>

          <div className="register">
            <p>Already have an account? <a href="/">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoReg;
