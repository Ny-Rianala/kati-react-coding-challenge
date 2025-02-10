import React, { useState } from 'react';
import SignUp from './components/SignUp';

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleSignupSuccess = (data) => {
    console.log('User signed up successfully:', data);
    setUserData(data);
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      {!userData ? (
        <SignUp onSignupSuccess={handleSignupSuccess} />
      ) : (
        <div>Welcome, {userData.name}!</div>
      )}
    </div>
  );
};

export default App;
