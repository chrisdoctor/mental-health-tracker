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
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
