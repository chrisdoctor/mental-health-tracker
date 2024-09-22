// src/components/HomePage.js
import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Mental Health Progress Tracker</h1>
      <p>To track your daily mental health progress, please login with Google.</p>
      <GoogleLoginButton />
    </div>
  );
};

export default HomePage;
