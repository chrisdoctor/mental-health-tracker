import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

const HomePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAddLogClick = () => {
    navigate('/log');  // Navigate to the daily log form
  };

  return (
    <div>
      <h1>Welcome</h1>
      {!token ? (
        <div>
          <p>Please log in using your Google account to start tracking your daily mental health progress.</p>
          <GoogleLoginButton />
        </div>
      ) : (
        <div>
          <p>You are logged in. Start adding your daily log.</p>
          <button onClick={handleAddLogClick}>Add Daily Log</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
