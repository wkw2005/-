import React from 'react';
import { useOvertime } from './OvertimeContext';
import ErrorBoundary from './ErrorBoundary'; // 确保正确导入 ErrorBoundary

const OvertimeManagement = () => {
  const { pendingApplications, approveApplication, rejectApplication } = useOvertime();

  const handleApprove = async (application) => {
    await approveApplication(application);
  };

  const handleReject = async (application) => {
    await rejectApplication(application);
  };

  return (
    <ErrorBoundary> {/* 使用 ErrorBoundary 包裹 OvertimeManagement */}
      <div >
        <h2 className='text1'>加班管理</h2>
        <table style={{marginLeft : "270px"}}>
          <thead>
            <tr>
              <th>用户名</th>
              <th>加班日期</th>
              <th>加班小时数</th>
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
                  <td>{app.date}</td>
                  <td>{app.hours}</td>
                  <td>{app.reason}</td>
                  <td>{app.status}</td>
                  <td>
                    <button onClick={() => handleApprove(app)}>批准加班</button>
                    <button onClick={() => handleReject(app)}>拒绝加班</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">没有待审批的加班申请。</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  );
};

export default OvertimeManagement;