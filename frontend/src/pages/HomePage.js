import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  console.log("user", user)
  return (
    <div>
      <div>Daily Tracker</div>
      {user ? <div>Logged In</div> : <GoogleLoginButton />}

    </div>
  );
};

export default HomePage;
