import React, { useState, useEffect } from 'react';
import { createNotification, deleteNotificationById, getNotifications } from '../services/api';

const NotificationManagement = ({ initialNotification }) => {
  const [title, setTitle] = useState(initialNotification ? initialNotification.title : '');
  const [content, setContent] = useState(initialNotification ? initialNotification.content : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('标题和内容不能为空。');
      return;
    }
    setLoading(true);
    try {
      const newNotification = await createNotification({ title, content });
      setNotifications([...notifications, newNotification]);
      setTitle('');
      setContent('');
      setLoading(false);
      alert('通知保存成功。');
    } catch (err) {
      setLoading(false);
      setError(`保存通知失败：${err.message}`);
    }
  };

  const handleDelete = (id) => {
    deleteNotificationById(id);
    setNotifications(notifications.filter(notification => notification.id !== id));
    alert('通知删除成功。');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <div style={{ width: '50%' }}>
        <h2 className='text1'>创建通知</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            
            <label style={{marginLeft :"30px"}}>标题：</label>
            <input  
            placeholder="在这里输入标题..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '30%', marginBottom: '10px' }}
            />
          </div>
          <div className='form-group' style={{ display: 'flex',  alignItems: 'center' }}>
            <label style={{marginLeft :"30px"}}>内容：</label>
            <textarea
            placeholder="在这里输入内容..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '30.75%', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} className='butto'>
            {loading ? '发布中...' : '发布通知'}
          </button>
        </form>
      </div>
      <div style={{ width: '30%', border: '1px solid #ccc', padding: '20px', marginTop:"6px", marginBottom:"54px" }}>
        <h2>所有通知</h2>
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
              <button onClick={() => handleDelete(notification.id)}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationManagement;