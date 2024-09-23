import React, { useEffect, useState } from 'react';

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Send token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }

        const data = await response.json();
        setLogs(data);  // Set the logs in state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <p>Loading logs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Your Daily Logs</h2>
      {logs.length > 0 ? (
        <ul>
          {logs.map((log) => (
            <li key={log.id}>
              <p>Mood Rating: {log.mood_rating}</p>
              <p>Anxiety Level: {log.anxiety_level}</p>
              <p>Sleep Hours: {log.sleep_hours}</p>
              <p>Sleep Quality: {log.sleep_quality}</p>
              <p>Physical Activity: {log.physical_activity}</p>
              <p>Social Interactions: {log.social_interactions}</p>
              <p>Stress Level: {log.stress_level}</p>
              <p>Symptoms: {log.symptoms}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No logs found.</p>
      )}
    </div>
  );
};

export default LogList;
