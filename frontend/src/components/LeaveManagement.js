import React from 'react';
import { useLeave } from './LeaveContext';
import ErrorBoundary from './ErrorBoundary'; // 确保正确导入 ErrorBoundary

const LeaveManagement = () => {
  const { pendingApplications, approveApplication, rejectApplication } = useLeave();

  const handleApprove = async (application) => {
    await approveApplication(application);
  };

  const handleReject = async (application) => {
    await rejectApplication(application);
  };

  return (
    <ErrorBoundary> {/* 使用 ErrorBoundary 包裹 LeaveManagement */}
      <div className="leave-management">
        <h2 className='text1'>请假管理</h2>
        <table className="text4">
          <thead>
            <tr>
              <th>用户名</th>
              <th>时间</th>
              <th>理由</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pendingApplications) && pendingApplications.length > 0 ? (
              pendingApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.username}</td>
                  <td>{app.startDate} - {app.endDate}</td>
                  <td>{app.reason}</td>
                  <td>{app.status}</td>
                  <td>
                    <button onClick={() => handleApprove(app)}>批准请假</button>
                    <button onClick={() => handleReject(app)}>拒绝请假</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">没有待审批的请假申请。</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  );
};

export default LeaveManagement;