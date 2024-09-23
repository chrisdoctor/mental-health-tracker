import React, { useEffect, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const HomePage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if token is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');

    if (tokenFromUrl) {
      // Store the token in localStorage
      localStorage.setItem('token', tokenFromUrl);
      setToken(tokenFromUrl);

      // Clear the token from the URL (optional, to make the URL cleaner)
      window.history.replaceState({}, document.title, '/');
    } else {
      // Check localStorage for token
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/'; // Redirect back to home after logout
  };

  return (
    <div>
      <h1>Welcome </h1>

      {token ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <button onClick={() => window.location.href = '/log'}>Add Daily Log</button>
            <button onClick={() => window.location.href = '/progress'}>View Progress</button>
          </div>
        </div>
      ) : (
        <GoogleLoginButton />  // Render login button if no token
      )}
    </div>
  );
};

export default HomePage;
