import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';  // Import Login component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsAuthenticated(true);
    setShowLogin(false);  // Hide the login modal on success
  };

  return (
    <div>
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={() => setShowLogin(true)}  // Show login modal
        onLogout={() => {
          setIsAuthenticated(false);
          setToken('');
        }}
      />
      {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;

