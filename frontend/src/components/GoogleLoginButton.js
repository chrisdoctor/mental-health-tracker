import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = () => {
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse); 
    login(credentialResponse); 
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={(error) => {
          console.log('Login Failed', error);
        }}
        scope="profile email openid"
        // scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
