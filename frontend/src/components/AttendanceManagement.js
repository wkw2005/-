// 查看和审核所有成员的考勤记录的功能

import React, { useState, useEffect } from 'react';
import { getAttendanceRecords, approveAttendance, rejectAttendance } from '../services/api';

const AttendanceManagement = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取考勤记录的函数
  const fetchRecords = async () => {
    try {
      const data = await getAttendanceRecords();
      setRecords(data);
    } catch (err) {
      setError("无法获取考勤记录。");
    } finally {
      setLoading(false);
    }
  };

  // 批准考勤记录的函数
  const handleApprove = async (id) => {
    try {
      await approveAttendance(id);
      setRecords(records.map(record => record.id === id ? { ...record, status: 'approved' } : record));
    } catch (err) {
      setError("审批出勤记录失败。");
    }
  };

  // 拒绝考勤记录的函数
  const handleReject = async (id) => {
    try {
      await rejectAttendance(id);
      setRecords(records.map(record => record.id === id ? { ...record, status: 'rejected' } : record));
    } catch (err) {
      setError("无法拒绝出勤记录。");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>考勤记录管理</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>员工姓名</th>
            <th>时间戳</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.employeeName}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
              <td>{record.status}</td>
              <td>
                <button onClick={() => handleApprove(record.id)}>批准</button>
                <button onClick={() => handleReject(record.id)}>拒绝</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceManagement;