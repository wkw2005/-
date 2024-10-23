// 登录入口文件
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // 确保路径正确

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 控制是登录还是注册模式
  const [role, setRole] = useState('member'); // 默认角色为成员
  const [loading, setLoading] = useState(false); // 加载状态
  const navigate = useNavigate();

  // 从 localStorage 获取用户名
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("用户名和密码是必需的。");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/login', { username, password, role });
      if (response.data.token && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('username', username); // 存储用户名
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        alert('用户名或密码无效。');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '登录失败，请重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      alert("用户名、密码和邮箱是必需的。");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('/register', { username, password, email, role });
      if (response.data.token && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('username', username); // 存储用户名
        navigate('/home');
      } else {
        alert('注册失败，请重试。');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '注册失败，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
        <h2>{isRegisterMode ? '注册' : '登录'}</h2>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        {isRegisterMode && (
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        )}
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <div>
          <label>角色:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">成员</option>
            <option value="admin">管理员</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '正在处理...' : isRegisterMode ? '注册' : '登录'}
        </button>
        <div>
          {isRegisterMode ? (
            <button type="button" onClick={() => setIsRegisterMode(false)}>
              已有账户？登录
            </button>
          ) : (
            <button type="button" onClick={() => setIsRegisterMode(true)}>
              注册新账户
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;