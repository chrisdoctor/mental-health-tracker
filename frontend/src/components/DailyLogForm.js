import React, { useState } from 'react';
import DialogBox from './DialogBox';

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

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

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
      setShowSuccessDialog(true);  // Show success dialog on successful submission
    } catch (error) {
      console.error('Error submitting log:', error);
      alert('Failed to submit log');
    }
  };

  const handleCancel = () => {
    setShowCancelDialog(true);  // Show confirmation dialog on cancel
  };

  const confirmCancel = () => {
    window.location.href = '/';  // Redirect to the home page after confirmation
  };

  const redirectToHome = () => {
    window.location.href = '/';  // Redirect to home page after confirming success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Submit Daily Log</h2>
        
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-primary mb-2">Mood Rating (1-10)</label>
            <input
              type="number"
              name="moodRating"
              value={formData.moodRating}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rate your mood"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Anxiety Level (1-10)</label>
            <input
              type="number"
              name="anxietyLevel"
              value={formData.anxietyLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rate your anxiety"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Sleep Hours</label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Hours of sleep"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Sleep Quality (1-10)</label>
            <input
              type="number"
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rate sleep quality"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Physical Activity (minutes)</label>
            <input
              type="number"
              name="physicalActivity"
              value={formData.physicalActivity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Duration of physical activity"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Social Interactions (1-10)</label>
            <input
              type="number"
              name="socialInteractions"
              value={formData.socialInteractions}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rate interactions"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Stress Level (1-10)</label>
            <input
              type="number"
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rate stress level"
              required
            />
          </div>

          <div>
            <label className="block text-primary mb-2">Symptoms (Describe)</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Any symptoms?"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <DialogBox
          title="Success!"
          message="Your daily log has been submitted successfully."
          onClose={redirectToHome}
        />
      )}

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <DialogBox
          title="Confirm Cancel"
          message="Are you sure you want to discard your changes?"
          onClose={() => setShowCancelDialog(false)}
          onConfirm={confirmCancel}
        />
      )}
    </div>
  );
};

export default DailyLogForm;
