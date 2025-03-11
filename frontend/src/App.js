import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import GetAllProducts from "./components/GetAllProducts";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleSignupSuccess = (userData) => {
    setShowSignup(false);
    setShowLogin(true); // Switch to login modal after signup
  };

  return (
    <div>
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        }}
      />

      {showLogin && <LogIn onLoginSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} switchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />}
      {showSignup && <SignUp onSignupSuccess={handleSignupSuccess} onClose={() => setShowSignup(false)} switchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />}
      
      <Routes>
        <Route path="/products" element={<GetAllProducts />} />
      </Routes>
    </div>
  );
};

export default App;
