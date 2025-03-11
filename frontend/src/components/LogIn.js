import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LogIn = ({ onLoginSuccess, onClose, switchToSignup }) => {
  const [email, setEmail] = useState("");       // Declare email state
  const [password, setPassword] = useState(""); // Declare password state
  const [error, setError] = useState("");       // Declare error state
  const navigate = useNavigate();               // Declare navigate function
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Server error');
      
      const data = await response.json();
      localStorage.setItem('token', data.data.token);
      onLoginSuccess(data.data);
      navigate('/products'); // Navigate to the products page
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>Don't have an account? <button onClick={switchToSignup}>Sign Up</button></p>
      </div>
    </div>
  );
};

export default LogIn;
