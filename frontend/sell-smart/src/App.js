import React, { useState } from 'react';
import SignUp from './components/SignUp';
import Header from './components/Header';
import Login from './components/Login';  // Import Login component

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupSuccess = (data) => {
    console.log('User signed up successfully:', data);
    setUserData(data);
    // Optionally show login after sign-up
    setShowLogin(true);
  };

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
      {!userData ? (
        <SignUp onSignupSuccess={handleSignupSuccess} />
      ) : (
        <div>Welcome, {userData.name}!</div>
      )}
      {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default App;
