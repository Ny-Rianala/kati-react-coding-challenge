import React, { useState } from 'react';

const SignUp = ({ onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Signing up with:', { name, email, password }); // Log the request

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log('Response:', data);  // Log the response

      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        onSignupSuccess(data.data);  // Call the function passed from the parent component
        // Optionally navigate or clear form here
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setLoading(false);
      setError('Failed to register');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;