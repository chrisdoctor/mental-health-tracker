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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 bg-contrast shadow-md rounded-lg max-w-md">
        <h1 className="text-4xl font-semibold text-primary mb-8">
          Progress Tracker
        </h1>

        {token ? (
          <div>
            <p className="text-xl text-secondary mb-6">You are logged in!</p>
            <button
              onClick={handleLogout}
              className="bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded mb-4"
            >
              Logout
            </button>
            <div>
              <button
                onClick={() => window.location.href = '/log'}
                className="bg-secondary hover:bg-accent text-white font-bold py-2 px-6 rounded mb-4"
              >
                Add Daily Log
              </button>
              <button
                onClick={() => window.location.href = '/progress'}
                className="bg-accent hover:bg-secondary text-white font-bold py-2 px-6 rounded"
              >
                View Progress
              </button>
            </div>
          </div>
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </div>
  );
};

export default HomePage;
