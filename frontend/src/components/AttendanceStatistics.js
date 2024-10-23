//月度和年度考勤统计的展示
import React, { useState, useEffect } from 'react';
import { getAttendanceStatistics } from '../services/api';
import { Line } from 'react-chartjs-2';

const AttendanceStatistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAttendanceStatistics();
        setStats(data);
      } catch (err) {
        setError("无法获取出勤统计信息。");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: stats.map(s => s.month),
    datasets: [
      {
        label: 'Present',
        data: stats.map(s => s.present),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Absent',
        data: stats.map(s => s.absent),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ]
  };

  return (
    <div>
      <h2>考勤统计</h2>
      <Line data={data} />
    </div>
  );
};

export default AttendanceStatistics;