// 注册页面组件
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member'); // 默认角色为成员
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("用户名、密码和邮箱是必需的。");
      return;
    }
    try {
      const response = await axios.post('/register', { username, password, email, role });
      if (response.data.token && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        alert('注册失败，请重试。');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>注册</h2>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <div>
          <label>角色:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">成员</option>
            <option value="admin">管理员</option>
          </select>
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  );
};

export default RegisterPage;