//页面头部组件。
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components.css';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>考勤管理系统</h1>
      {user && (
        <div className="user-info">
          <span>欢迎, {user.username}</span>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      )}
    </header>
  );
};

export default Header;