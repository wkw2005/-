import React, { useState, useEffect } from 'react';
import { getCurrentUserUsername, updateUserPassword } from '../services/api';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState(''); // 使用 useState 钩子来设置 username 的状态

  useEffect(() => {
    const loadUsername = async () => {
      const username = await getCurrentUserUsername(); // 等待异步函数完成
      setUsername(username); // 更新 username 状态
    };

    loadUsername();
  }, []); // 空依赖数组确保这个 effect 只在组件挂载时运行一次

  console.log(username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("密码不匹配。");
      return;
    }

    try {
      await updateUserPassword(username, newPassword); // 传递用户名给API
      setError(null);
      alert('密码更新成功。');
    } catch (err) {
      setError("无法更新密码。");
    }
  };

  return (
    <div>
      <h2 className='text1'>修改密码</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>用户名:</label>
          <input type="text" value={username} disabled />
        </div>

        <div className="form-group">
          <label>新密码:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>确认密码:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" className='butto'>更新密码</button>
      </form>
    </div>
  );
};

export default ChangePassword;