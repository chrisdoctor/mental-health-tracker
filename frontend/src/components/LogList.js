// src/components/LogList.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LogList = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();
  }, [token]);

  return (
    <div>
      <h2>Your Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <p>Date: {log.date}</p>
            <p>Mood: {log.mood}</p>
            <p>Anxiety: {log.anxiety}</p>
            <p>Stress Level: {log.stressLevel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogList;
