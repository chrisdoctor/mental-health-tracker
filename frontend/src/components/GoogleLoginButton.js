import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {
    try {
      // Redirect the user to the backend to initiate Google login
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-primary hover:bg-accent text-white font-bold py-2 px-6 rounded transition-colors duration-300 ease-in-out"
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
