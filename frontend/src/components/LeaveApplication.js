import React, { useState } from 'react';
import { useLeave } from './LeaveContext';

const LeaveApplication = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const { pendingApplications, addApplication, removeApplication } = useLeave();

  const handleSubmit = (e) => {
    e.preventDefault();
    const application = { startDate, endDate, reason };
    addApplication(application);
    
    // 清空表单
    setStartDate('');
    setEndDate('');
    setReason('');
  };
  console.log("LeaveApplication:",pendingApplications);
  return (
    <div>
      <h2 className='text1'>请假申请</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>开始日期:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>结束日期:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>请假原因:</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <button type="submit" className='butto'>提交申请</button>
      </form>
      <h3 className='text2'>我的请假申请</h3>
      <table className='text4'>
        <thead >
          <tr>
            <th>开始日期</th>
            <th>结束日期</th>
            <th>原因</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.startDate}</td>
              <td>{app.endDate}</td>
              <td>{app.reason}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => removeApplication(app)}>取消请假</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApplication;