import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/components.css';
import logo from '../assets/logo.jpg';

const AdminHome = () => {
  const navigate = useNavigate(); // 获取 navigate 函数

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>实验室考勤系统</h1>
        <div className="user-info">
          <span>用户身份：管理员</span>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      </div>
      <div className="layout-container">
        <div className="sidebar">
          <nav>
            <ul>
              <li><Link to="/admin/users" className="nav-link" activeClassName="active">成员管理</Link></li>
              <li><Link to="/admin/attendance" className="nav-link" activeClassName="active">考勤记录</Link></li>
              <li><Link to="/admin/leave" className="nav-link" activeClassName="active">请假审批</Link></li>
              <li><Link to="/admin/overtime" className="nav-link" activeClassName="active">加班审批</Link></li>
              <li><Link to="/admin/notifications" className="nav-link" activeClassName="active">发布通知</Link></li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <Outlet /> {/* 使用 Outlet 来渲染匹配的子路由组件 */}
        </div>
      </div>
      <div className="footer">
        <span>版权信息 © 2024</span>
      </div>
    </div>
  );
};

export default AdminHome;