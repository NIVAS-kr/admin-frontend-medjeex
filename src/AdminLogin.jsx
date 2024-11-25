import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import MedjeexLogo from './assets/images/Medjeex_Logo.png';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/'); // Redirect to admin dashboard if logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { token } = response.data;
  
      localStorage.setItem('authToken', token);
  
      // Redirect to admin dashboard
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to log in. Please try again.'
      );
    }
  };
  
  return (
    <div className="admin-login-page">
      <div className="admin-login-logo-section">
        <img src={MedjeexLogo} alt="Medjeex Logo" className="admin-login-logo" />
        <span className="admin-login-logo-text">MEDJEEX</span>
      </div>

      <div className="admin-login-form-container">
        <h2 className="admin-login-heading">Admin Login</h2>
        <p className="admin-login-subheading">Hey, enter your details to sign in to your account</p>

        {errorMessage && <p className="admin-login-error">{errorMessage}</p>}

        <form onSubmit={handleLogin}>
          <div className="admin-login-input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="admin-login-input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="admin-login-forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="admin-login-signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
