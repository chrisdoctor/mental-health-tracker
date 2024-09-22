import React from 'react';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Redirect to the backend for Google OAuth login
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
