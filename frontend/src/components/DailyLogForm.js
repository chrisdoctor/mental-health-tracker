import React, { useState } from 'react';

const DailyLogForm = () => {
  const [formData, setFormData] = useState({
    moodRating: '',
    anxietyLevel: '',
    sleepHours: '',
    sleepQuality: '',
    physicalActivity: '',
    socialInteractions: '',
    stressLevel: '',
    symptoms: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit the log');
      }

      const data = await response.json();
      console.log('Log submitted successfully', data);
      alert('Daily log saved successfully!');
    } catch (error) {
      console.error('Error submitting log:', error);
      alert('Failed to submit log');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Your Daily Log</h2>
      <label>
        Mood Rating (1-10):
        <input
          type="number"
          name="moodRating"
          value={formData.moodRating}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Anxiety Level (1-10):
        <input
          type="number"
          name="anxietyLevel"
          value={formData.anxietyLevel}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Sleep Hours:
        <input
          type="number"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Sleep Quality (1-10):
        <input
          type="number"
          name="sleepQuality"
          value={formData.sleepQuality}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Physical Activity (Duration in minutes):
        <input
          type="number"
          name="physicalActivity"
          value={formData.physicalActivity}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Social Interactions (1-10):
        <input
          type="number"
          name="socialInteractions"
          value={formData.socialInteractions}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Stress Level (1-10):
        <input
          type="number"
          name="stressLevel"
          value={formData.stressLevel}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Symptoms (Describe):
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit Daily Log</button>
    </form>
  );
};

export default DailyLogForm;
