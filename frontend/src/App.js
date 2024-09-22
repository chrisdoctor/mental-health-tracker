// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import DailyLogForm from './components/DailyLogForm';
import LogList from './components/LogList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/logs" element={<LogList />} />
          <Route path="/log" element={<DailyLogForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
