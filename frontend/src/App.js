import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import AttendanceStatistics from './components/AttendanceStatistics';
import LeaveApplication from './components/LeaveApplication';
import OvertimeApplication from './components/OvertimeApplication';
import ChangePassword from './components/ChangePassword';
import UserManagement from './components/UserManagement';
import AttendanceManagement from './components/AttendanceManagement';
import LeaveManagement from './components/LeaveManagement';
import OvertimeManagement from './components/OvertimeManagement';
import NotificationManagement from './components/NotificationManagement';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import { LeaveProvider } from './components/LeaveContext';
import { OvertimeProvider } from './components/OvertimeContext';

function App() {
  return (
    <Router>
      <LeaveProvider> {/* 将 LeaveProvider 包裹整个应用 */}
        <OvertimeProvider>
          <Header></Header>
          <Routes>
            {/* 登录页面作为根路径 */}
            <Route path="/" element={<LoginPage />} />

            {/* 成员布局和其子路由 */}
            <Route path="home" element={<HomePage />}>
              <Route path="statistics" element={<AttendanceStatistics />} />
              <Route path="leave" element={<LeaveApplication />} />
              <Route path="overtime" element={<OvertimeApplication />} />
              <Route path="password" element={<ChangePassword />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notification" element={<NotificationManagement />} />
            </Route>

            {/* 管理员布局和其子路由 */}
            <Route path="admin" element={<AdminHome />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="records" element={<AttendanceManagement />} />
              <Route path="leave" element={<LeaveManagement />} />
              <Route path="overtime" element={<OvertimeManagement />} />
              <Route path="notifications" element={<NotificationManagement />} />
            </Route>

            {/* 未找到页面 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer></Footer>
        </OvertimeProvider>
      </LeaveProvider>{/* 结束 LeaveProvider 包裹 */}
    </Router>
  );
}

export default App;