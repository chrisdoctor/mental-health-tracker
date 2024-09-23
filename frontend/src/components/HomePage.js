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
      <div className="text-center p-8 bg-white shadow-md rounded-lg max-w-md">
        <h1 className="text-4xl font-semibold text-primary mb-8">Mental Health Progress Tracker</h1>

        {token ? (
          <div>
            <p className="text-xl text-primary mb-6">
              You are logged in!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/log'}
                className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded"
              >
                Add Daily Log
              </button>
              <button
                onClick={() => window.location.href = '/progress'}
                className="bg-accent hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded"
              >
                View Progress
              </button>
            </div>
            <p onClick={handleLogout} className="text-primary cursor-pointer underline mt-8 mb-6">Logout</p>
          </div>
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </div>
  );
};

export default HomePage;
