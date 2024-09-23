import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DailyLogForm = () => {
  const { token } = useAuth();
  const [logData, setLogData] = useState({
    mood: '',
    anxiety: '',
    sleepHours: '',
    sleepQuality: '',
    physicalActivityType: '',
    physicalActivityDuration: '',
    socialInteractions: '',
    stressLevel: '',
    symptoms: '',
  });

  const handleChange = (e) => {
    setLogData({
      ...logData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/log`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        alert('Log submitted successfully!');
      } else {
        alert('Error submitting log');
      }
    } catch (error) {
      console.error('Error submitting log', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Mood Rating:</label>
      <input type="number" name="mood" value={logData.mood} onChange={handleChange} />
      
      <label>Anxiety Level:</label>
      <input type="number" name="anxiety" value={logData.anxiety} onChange={handleChange} />

      <label>Sleep Hours:</label>
      <input type="number" name="sleepHours" value={logData.sleepHours} onChange={handleChange} />

      <label>Sleep Quality:</label>
      <input type="text" name="sleepQuality" value={logData.sleepQuality} onChange={handleChange} />

      <label>Physical Activity Type:</label>
      <input type="text" name="physicalActivityType" value={logData.physicalActivityType} onChange={handleChange} />

      <label>Physical Activity Duration:</label>
      <input type="text" name="physicalActivityDuration" value={logData.physicalActivityDuration} onChange={handleChange} />

      <label>Social Interactions:</label>
      <input type="text" name="socialInteractions" value={logData.socialInteractions} onChange={handleChange} />

      <label>Stress Level:</label>
      <input type="number" name="stressLevel" value={logData.stressLevel} onChange={handleChange} />

      <label>Symptoms:</label>
      <textarea name="symptoms" value={logData.symptoms} onChange={handleChange}></textarea>

      <button type="submit">Submit Log</button>
    </form>
  );
};

export default DailyLogForm;
