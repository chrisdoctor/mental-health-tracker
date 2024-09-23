import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LogGraph = ({ filteredLogs, field1, field2, field3 }) => {
  const formatDate = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Prepare chart data
  const chartData = {
    labels: filteredLogs.map((log) => formatDate(log.created_at)), // X-axis (dates)
    datasets: [
      {
        label: field1.replace('_', ' ').toUpperCase(),
        data: filteredLogs.map((log) => log[field1]),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: field2.replace('_', ' ').toUpperCase(),
        data: filteredLogs.map((log) => log[field2]),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
      {
        label: field3.replace('_', ' ').toUpperCase(),
        data: filteredLogs.map((log) => log[field3]),
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
      },
    ],
  };

  return (
    <div className="mt-10">
      {filteredLogs.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No data available for the selected fields.</p>
      )}
    </div>
  );
};

export default LogGraph;
