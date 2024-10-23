import React, { createContext, useContext, useState } from 'react';
import { getCurrentUserUsername, submitLeaveApplication } from '../services/api';

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  // 使用 localStorage 获取初始状态
  const [pendingApplications, setPendingApplications] = useState(() => {
    const applications = localStorage.getItem('pendingApplications');
    return applications ? JSON.parse(applications) : [];
  });

  const addApplication = async (application) => {
    const username = await getCurrentUserUsername();
    const newApplication = { ...application, username, status: 'pending', id: Date.now() };
    const updatedApplications = [...pendingApplications, newApplication];
    setPendingApplications(updatedApplications);
    // 更新 localStorage
    localStorage.setItem('pendingApplications', JSON.stringify(updatedApplications));
  };

  const submitApplication = async (application) => {
    try {
      await submitLeaveApplication(application);
    } catch (error) {
      console.error('提交请假申请失败:', error);
    }
  };


  const approveApplication = async (application) => {
    try {
      // 创建一个没有 id 的新对象用于提交
      const submittableApplication = { ...application, status: 'approved' };
      delete submittableApplication.id; // 删除 id 属性
      await submitLeaveApplication(submittableApplication);
      // 更新本地状态时使用原始 application 对象，它已经包含了 id
      const updatedApplications = pendingApplications.map(app =>
        app.id === application.id ? { ...application, status: 'approved' } : app
      );
      setPendingApplications(updatedApplications);
      // 更新 localStorage
      localStorage.setItem('pendingApplications', JSON.stringify(updatedApplications));
    } catch (error) {
      console.error('批准请假申请失败:', error);
    }
  };
  
  const rejectApplication = async (application) => {
    try {
      // 创建一个没有 id 的新对象用于提交
      const submittableApplication = { ...application, status: 'rejected' };
      delete submittableApplication.id; // 删除 id 属性
      await submitLeaveApplication(submittableApplication);
      // 更新本地状态时使用原始 application 对象，它已经包含了 id
      const updatedApplications = pendingApplications.filter(app => app.id !== application.id);
      setPendingApplications(updatedApplications);
      // 更新 localStorage
      localStorage.setItem('pendingApplications', JSON.stringify(updatedApplications));
    } catch (error) {
      console.error('拒绝请假申请失败:', error);
    }
  };

  const removeApplication = (application) => {
    const updatedApplications = pendingApplications.filter(app => app.id !== application.id);
    setPendingApplications(updatedApplications);
    // 更新 localStorage
    localStorage.setItem('pendingApplications', JSON.stringify(updatedApplications));
  };

  return (
    <LeaveContext.Provider value={{ pendingApplications, addApplication, submitApplication, approveApplication, rejectApplication, removeApplication }}>
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => useContext(LeaveContext);