import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import GetAllProducts from "./components/GetAllProducts";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Check for existing token when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // Login handler
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem("token", userData.token);
    setShowLogin(false);
    setShowSignup(false);
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  // Signup handler
  const handleSignupSuccess = (userData) => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <div>
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      {showLogin && (
        <LogIn
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
          switchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignUp
          onSignupSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
          switchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      <Routes>
        <Route path="/products" element={<GetAllProducts />} />
      </Routes>
    </div>
  );
};

export default App;
