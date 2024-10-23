// 路由配置文件
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Header user={JSON.parse(localStorage.getItem('user'))} />
      <div className="layout-container">
        <Sidebar />
        <div className="main-content">
          <Outlet /> {/* 这将渲染嵌套的路由 */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;