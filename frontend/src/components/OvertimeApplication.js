import React, { useState } from 'react';
import { useOvertime } from './OvertimeContext'; // 确保这个导入路径正确
import '../styles/App.css'; // 引入组件的CSS文件

const OvertimeApplication = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [reason, setReason] = useState('');
  const { pendingApplications, addApplication, removeApplication } = useOvertime();

  const handleSubmit = (e) => {
    e.preventDefault();
    const application = { date, hours, reason };
    addApplication(application);
    // 清空表单
    setDate('');
    setHours('');
    setReason('');
  };

  console.log("OvertimeApplication:", pendingApplications);
  return (
    <div>
      <h2 className="text1">加班申请</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>日期:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>工作小时数:</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>加班原因:</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
        </div>
        <button type="submit" className='butto'>提交申请</button>
      </form>
      <h3 className="text2">我的加班申请</h3>
      <table className="text3">
        <thead >
          <tr>
            <th>日期</th>
            <th>工作小时数</th>
            <th>原因</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {pendingApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.date}</td>
              <td>{app.hours}</td>
              <td>{app.reason}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => removeApplication(app.id)}>取消加班</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeApplication;