// 登录入口文件
import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member'); // 默认角色为成员
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 控制是登录还是注册模式
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("用户名和密码是必需的。");
      return;
    }
    try {
      const response = await login(username, password, role);
      if (response.data.success) {
        // 存储用户信息和token到localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
      alert(error.message);
    }
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("用户名和密码是必需的。");
      return;
    }
    try {
      const response = await register({ username, password, role });
      if (response.data.success) {
        // 存储用户信息和token到localStorage
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
      <form className="login-form" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
        <h2>{isRegisterMode ? '注册' : '登录'}</h2>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
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
        {!isRegisterMode && (
          <div>
            <button type="button" onClick={() => setIsRegisterMode(true)}>注册新账户</button>
          </div>
        )}
        {isRegisterMode && (
          <div>
            <button type="button" onClick={() => setIsRegisterMode(false)}>已有账户？登录</button>
          </div>
        )}
        <button type="submit">{isRegisterMode ? '注册' : '登录'}</button>
      </form>
    </div>
  );
};

export default Login;