import React, { useState } from "react";
import Nav from '../Nav';
import axios from "axios";
import "../../assets/css/signin.css";



const SigninSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);    

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login API request
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/loginn", formData);
      const  token  = response.data.token;
      
      
      if(response.data.role == "user"){
        alert("User login successful!");
        window.location.href = "/home";
      }
      else{
      alert("Goshala login successful!");
      window.location.href = "/GohomePage";
      }
      localStorage.setItem("token", token);
    } catch (err) {
      setError("Somenthing went wrong",err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signContainer">
     <Nav  />
    <div> <ul> 
    <li>
      Admin
    </li>
    <li>
      Goshala
    </li>
    </ul></div>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-field">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Enter your email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Enter your password</label>
          </div>

          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="register">
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninSignup;
