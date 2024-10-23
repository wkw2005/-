//用户管理组件

import React, { useState, useEffect } from 'react';
import { getMembers, handleEditMember, deleteMember } from '../services/api';
import"../styles/App.css"

const UserManagement = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentUser, setCurrentUser] = useState(null); // 添加当前用户的状态

  // 获取所有成员信息
  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
      // 假设第一个成员是当前登录的用户
      setCurrentUser(data[0]);
    } catch (err) {
      setError('无法获取成员。');
    }
  };

  // 处理表单数据变更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 更新成员信息
  const handleUpdateMember = async () => { // 将函数改名为 handleUpdateMember
    try {
      if (editingMember) {
        const updatedData = {
          username: formData.username,
          email: formData.email,
          role: formData.role
        };
        await handleEditMember(updatedData, currentUser); // 确保调用 api.js 中的函数
        fetchMembers();
        setEditingMember(null); // 重置编辑状态
        setFormData({}); // 重置表单数据
        alert('成员更新成功。');
      } else {
        setError('请选择一个成员进行编辑。');
      }
    } catch (err) {
      setError('无法更新成员。');
    }
  };
// 删除成员信息
const handleDeleteMember = async (username) => {
  // 使用 confirm 函数询问用户是否确定删除
  const confirmDeletion = window.confirm('确定要删除这个成员吗？');
  if (confirmDeletion) {
    try {
      await deleteMember(username); // 确保调用 api.js 中的函数，并且它接受 username 参数
      fetchMembers(); // 更新成员列表
      alert('成员删除成功。');
    } catch (err) {
      setError('无法删除成员。');
    }
  }
};

  // 组件加载时获取成员信息
  useEffect(() => {
    fetchMembers();
  }, []);

  // 处理编辑按钮点击事件
  const handleEditClick = (member) => {
    setEditingMember(member);
    setFormData({
      username: member.username,
      email: member.email,
      role: member.role
    });
  };

  return (
    <div>
      <h2 style={{marginLeft: "180px"}  }>成员管理</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>名字</th>
            <th>电子邮件</th>
            <th>身份</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                <button onClick={() => handleEditClick(member)}>编辑</button>
                {/* 在点击删除按钮时，调用 handleDeleteMember 函数，并传递 member.username */}
                <button onClick={() => handleDeleteMember(member.username)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 编辑表单 */}
      {editingMember && (
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>名字:</label>
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>电子邮件:</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>身份:</label>
            <input
              type="text"
              name="role"
              value={formData.role || ''}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <button type="button" onClick={handleUpdateMember}>提交</button>
          <button type="button" onClick={() => setEditingMember(null)}>取消</button>
        </form>
      )}
    </div>
  );
}
export default UserManagement;