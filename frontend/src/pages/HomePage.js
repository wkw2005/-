import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/components.css';
import logo from '../assets/logo.jpg';
import Notifications from '../components/Notifications';
import { useNavigate } from'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>实验室考勤系统</h1>
        <div className="user-info">
          <span>用户身份：成员</span>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      </div>
      <div className="layout-container">
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/home/statistics" className="nav-link" activeClassName="active">查看考勤</Link></li>
              <li><Link to="/home/leave" className="nav-link" activeClassName="active">请假申请</Link></li>
              <li><Link to="/home/overtime" className="nav-link" activeClassName="active">加班申请</Link></li>
              <li><Link to="/home/password" className="nav-link" activeClassName="active">修改密码</Link></li>
              <li><Link to="/home/profile" className="nav-link" activeClassName="active">个人资料</Link></li>
              {/* <li><Link to="/home/notification" className="nav-link" activeClassName="active">通知管理</Link></li> */}
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <Notifications /> {/* 固定在右侧的Notifications组件 */}
      <div className="footer">
        <span>版权信息 © 2024</span>
      </div>
    </div>
  );
};

export default HomePage;