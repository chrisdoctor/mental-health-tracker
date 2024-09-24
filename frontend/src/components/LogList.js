import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client'; // Importing socket.io-client
import LogGraph from './LogGraph';

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [graphType, setGraphType] = useState('weekly');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);

  // Reference for scrolling to the graph section
  const graphSectionRef = useRef(null);

  const logFields = [
    'mood_rating',
    'anxiety_level',
    'sleep_hours',
    'sleep_quality',
    'physical_activity',
    'social_interactions',
    'stress_level',
    'symptoms',
  ];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logs`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }

        const data = await response.json();

        console.log("DATA", data)
        setLogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();

    // Set up WebSocket connection
    const socket = io(process.env.REACT_APP_BACKEND_URL);

    // Listen for log updates from the server
    socket.on('logUpdated', (newLog) => {
      setLogs((prevLogs) => {
        return [newLog, ...prevLogs]
      });  // Append new log to the current list
    });

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle graph generation and scroll to graph section
  const handleGenerateGraph = () => {
    const numberOfLogs = graphType === 'weekly' ? 7 : 30;
    const latestLogs = logs.slice(-numberOfLogs);
    setFilteredLogs(latestLogs);

    // Scroll to graph section
    setTimeout(() => {
      if (graphSectionRef.current) {
        graphSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  if (loading) {
    return <p>Loading logs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Your Daily Logs</h2>

      {logs.length > 0 ? (
        <div className="overflow-auto max-h-64 mx-5 mb-10 border border-gray-300 shadow-sm rounded-lg">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg table-fixed">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="py-3 px-4" style={{ minWidth: '200px' }}>Date</th>
                <th className="py-3 px-4">Mood Rating</th>
                <th className="py-3 px-4">Anxiety Level</th>
                <th className="py-3 px-4">Sleep Hours</th>
                <th className="py-3 px-4">Sleep Quality</th>
                <th className="py-3 px-4">Physical Activity</th>
                <th className="py-3 px-4">Social Interactions</th>
                <th className="py-3 px-4">Stress Level</th>
                <th className="py-3 px-4">Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={log.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4" style={{ minWidth: '200px' }}>
                    {new Date(log.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    {new Date(log.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                  <td className="py-2 px-4">{log.mood_rating}</td>
                  <td className="py-2 px-4">{log.anxiety_level}</td>
                  <td className="py-2 px-4">{log.sleep_hours}</td>
                  <td className="py-2 px-4">{log.sleep_quality}</td>
                  <td className="py-2 px-4">{log.physical_activity}</td>
                  <td className="py-2 px-4">{log.social_interactions}</td>
                  <td className="py-2 px-4">{log.stress_level}</td>
                  <td className="py-2 px-4">{log.symptoms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No logs found.</p>
      )}

      {/* Progress Graph Section */}
      <div className="mt-10 mx-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Progress Graph</h2>
        <div className="px-4 py-4 border border-gray-300 shadow-md rounded-lg">
          <form className="grid grid-cols-1 gap-4 max-w-xl mx-auto">
            <div>
              <label className="block text-primary mb-2">Graph Type</label>
              <select
                value={graphType}
                onChange={(e) => setGraphType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-primary mb-2">First Metric</label>
              <select
                value={field1}
                onChange={(e) => setField1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select First Metric</option>
                {logFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-primary mb-2">Second Metric</label>
              <select
                value={field2}
                onChange={(e) => setField2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Second Metric</option>
                {logFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-primary mb-2">Third Metric</label>
              <select
                value={field3}
                onChange={(e) => setField3(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Third Metric</option>
                {logFields.map((field, index) => (
                  <option key={index} value={field}>
                    {field.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleGenerateGraph}
              className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded mb-8 mt-8"
              disabled={!field1 || !field2 || !field3} // Disable button if any field is not selected
            >
              Generate Graph
            </button>
          </form>

          {/* LogGraph Component */}
          {filteredLogs.length > 0 && (
            <div className="mt-4 mb-8" ref={graphSectionRef}>
              <LogGraph filteredLogs={filteredLogs} field1={field1} field2={field2} field3={field3} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogList;
