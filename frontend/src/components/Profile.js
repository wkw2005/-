import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import '../styles/App.css'; // 导入 CSS 文件

const Profile = () => {
  const [user, setUser] = useState({}); // 使用对象形式初始化，更清晰
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data); // 直接设置用户数据
      } catch (err) {
        setError("无法获取用户信息。");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // 空依赖数组表示仅在组件挂载时执行

  // 处理输入字段变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // 从 localStorage 获取当前登录用户的信息
      const userFromStorage = localStorage.getItem('user');
      if (!userFromStorage) {
        throw new Error('用户未登录');
      }

      // 将 localStorage 中的字符串转换为对象
      const userObj = JSON.parse(userFromStorage);

      // 创建一个新对象，包含用户在表单中输入的所有数据
      const userData = {
        username: user.username || userObj.username, // 使用表单中的值，如果未更改则使用存储的值
        email: user.email || userObj.email, // 使用表单中的值，如果未更改则使用存储的值
      };

      // // 在发送请求之前打印 userData 对象
      // console.log('Sending userData:', userData);

      // 发送更新请求
      const updatedProfile = await updateUserProfile(userData);
      setUser(updatedProfile);
      alert('用户信息更新成功。');
    } catch (err) {
      console.error('更新用户信息失败:', err);
      alert('更新用户信息失败，请重试。');
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2 className='text1'>个人资料</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label >用户名:</label>
          <input
          className="form-group"
            name="username"
            type="text"
            value={user.username || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-group"
            name="email"
            type="email"
            value={user.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>身份:</label>
          <input
            className="form-group"
            name="role"
            type="text"
            value={user.role || ''}
            onChange={handleInputChange}
            disabled // 角色通常由系统设置，不允许用户更改
          />
        </div>
        <button type="submit" className='butto'>保存更改</button>
      </form>
      {/* 打印用户信息 */}
      <div>
        <p className='xinxi'>用户名: {user.username}</p>
        <p className='xinxi'>Email: {user.email}</p>
        <p className='xinxi'>角色: {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;