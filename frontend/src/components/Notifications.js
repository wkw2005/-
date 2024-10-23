import React, { useState, useEffect } from 'react';
import { getNotifications } from '../services/api';
import '../styles/App.css'; // 确保引入了全局样式

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        setError("无法获取通知。");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="notifications">
      <h2>系统通知</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4>{notification.title}</h4>
              <p>{notification.content}</p>
            </div>
            {/* 如果需要删除按钮，可以在这里添加 */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;