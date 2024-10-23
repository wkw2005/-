import axios from 'axios';

// 定义 API 基础 URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// 设置 axios 的基础 URL
axios.defaults.baseURL = API_BASE_URL;

// 设置 axios 请求拦截器，用于在请求发送前做一些操作，例如设置 Token
axios.interceptors.request.use(config => {
  // 仅对登录和注册请求添加令牌
  const token = localStorage.getItem('token');
  if (token && (config.url === '/login' || config.url === '/register')) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加 axios 响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么
  if (error.response) {
    // 这里可以处理各种错误状态码
    switch (error.response.status) {
      case 401:
        // 处理未授权情况，例如重定向到登录页面
        console.log('未授权，可能需要重新登录');
        break;
      // 您可以添加更多的 case 来处理不同的 HTTP 状态码
      default:
        // 处理其他响应错误
        break;
    }
  }
  // 如果存在其他类型的 HTTP 错误（如网络错误），则抛出错误
  return Promise.reject(error);
});



// 其他代码保持不变...
// 登录 API
export const login = async (username, password, role) => {
  try {
    const response = await axios.post('/login', { username, password, role });
    const userData = response.data;
    if (userData.token && userData.user) {
      // 确保存储用户名而不是name
      localStorage.setItem('user', JSON.stringify({ ...userData.user, username: username }));
    } else {
      throw new Error('无效的响应数据');
    }
    return userData;
  } catch (error) {
    console.error('登录错误:', error);
    if (error.response && error.response.status === 401) {
      console.error('登录失败：未授权');
    } else if (error.response && error.response.status === 404) {
      console.error('登录失败：未找到登录路由');
    } else {
      console.error('登录失败：', error.message);
    }
    throw error;
  }
};
// 获取当前用户的 username 的 API
export const getCurrentUserUsername = async () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('用户未登录');
    }
    const userObj = JSON.parse(user);
    return userObj.username; // 直接返回用户名字符串
  } catch (error) {
    console.error('获取当前用户错误：', error);
    throw error;
  }
};


// 注册 API
export const register = async (username, password, email, role) => {
  try {
    const response = await axios.post('/register', { username, password, email, role });
    const userData = response.data;
    if (userData.token && userData.user) {
      // 确保存储用户名而不是name
      localStorage.setItem('user', JSON.stringify({ ...userData.user, username: username }));
    } else {
      throw new Error('无效的响应数据');
    }
    return userData;
  } catch (error) {
    console.error('注册错误:', error);
    if (error.response && error.response.status === 400) {
      console.error('注册失败：请求参数不正确');
    } else if (error.response && error.response.status === 409) {
      console.error('注册失败：用户已存在');
    } else {
      console.error('注册失败：', error.message);
    }
    throw error;
  }
};
// 获取考勤记录 API
export const getAttendanceRecords = async (userId) => {
  try {
    const response = await axios.post(`/attendance/records${userId ? `?userId=${userId}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('获取出勤记录错误：', error);
    throw error;
  }
};
// 提交考勤记录 API
export const submitAttendance = async (attendanceData) => {
  try {
    const response = await axios.post('/attendance', attendanceData);
    return response.data;
  } catch (error) {
    console.error('提交出勤记录错误：', error);
    throw error;
  }
};
// 面部识别 API
export const faceRecognition = async (imageData) => {
  try {
    const response = await axios.post('/face-recognition', { imageData });
    return response.data;
  } catch (error) {
    console.error('人脸识别错误：', error);
    throw error;
  }
};
// 获取用户信息 API
export const getUserProfile = async () => {
  try {
    // 从 localStorage 获取用户名
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      throw new Error('用户未登录或用户信息不存在');
    }
    const username = JSON.parse(storedUser).username; // 假设后端在登录时返回了用户名

    // 使用用户名发送请求
    const response = await axios.get(`/users/profile`, {
      params: { username } // 确保后端接口可以通过查询参数接收用户名
    });
    return response.data;
  } catch (error) {
    console.error('获取用户配置文件错误：', error);
    throw error;
  }
};
// 更新用户信息 API
export const updateUserProfile = async (userData) => {
  try {
    // 从 localStorage 获取当前登录用户的信息
    const user = localStorage.getItem('user');
    if (!user) {
      throw new Error('用户未登录');
    }

    // 将 localStorage 中的字符串转换为对象
    const userObj = JSON.parse(user);

    // 设置请求头
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'username': userObj.username // 发送请求头包含用户名
      }
    };

    // 发送请求，Axios 会自动将 JavaScript 对象转换为 JSON 字符串
    const response = await axios.put(`/users/profile`, userData, config);

    // 返回响应数据
    return response.data;
  } catch (error) {
    // 打印错误信息并向外抛出，以便可以在调用此函数的地方进行处理
    console.error('更新用户配置文件错误：', error);
    throw error;
  }
};
// 特定的更新用户信息 API
export const handleEditMember = async (userData, currentUser) => {
  try {
    if (!currentUser) {
      throw new Error('用户未登录');
    }

    // 设置请求头
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'username': currentUser.username // 使用当前登录用户的用户名
      }
    };

    // 发送请求，Axios 会自动将 JavaScript 对象转换为 JSON 字符串
    const response = await axios.put(`/users/profile`, userData, config);

    // 返回响应数据
    return response.data;
  } catch (error) {
    // 打印错误信息并向外抛出，以便可以在调用此函数的地方进行处理
    console.error('更新用户配置文件错误：', error);
    throw error;
  }
}

// 注销用户 API
export const deleteMember = async (username) => {
  try {
    // 设置请求头，包含用户名
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'username': username // 请求头中包含用户名
      }
    };

    // 发送删除请求，使用请求头传递用户名
    const response = await axios.delete(`/users`, config);
    return response.data;
  } catch (error) {
    console.error('删除用户错误：', error);
    throw error;
  }
};

// 请假处理的 API
export const submitLeaveApplication = async (application) => {
  try {
    // 发送请求，axios 会自动将 JavaScript 对象转换为 JSON 字符串
    const response = await axios.post('/leave', application);
    // 确保后端返回了预期的数据
    if (response.data && response.data.username) {
      // 返回包含 username 的对象
      return response.data; // 直接返回整个响应对象
      
    } else {
      // 如果后端没有返回预期的数据，抛出错误
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    // 打印错误信息并向外抛出，以便可以在调用此函数的地方进行处理
    console.error('提交请假申请失败:', error);
    throw error;
  }
};

// 提交加班申请 API
export const submitOvertimeApplication = async (application) => {
  try {
    // 发送请求，axios 会自动将 JavaScript 对象转换为 JSON 字符串
    const response = await axios.post('/overtime', application);

    console.log('提交加班申请成功:', response.data);
    // 确保后端返回了预期的数据
    if (response.data && response.data.username) {
      // 返回包含 username 的对象
      console.log('响应的对象:', response.data);
      return response.data; // 直接返回整个响应对象
      
    } else {
      // 如果后端没有返回预期的数据，抛出错误
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    // 打印错误信息并向外抛出，以便可以在调用此函数的地方进行处理
    console.error('提交加班申请失败:', error);
    throw error;
  }
};
// api.js

// 工具函数，用于保存通知到localStorage
export const saveNotification = (notification) => {
  let notifications = getNotifications();
  notifications.push(notification);
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

// 工具函数，用于获取所有通知
export const getNotifications = () => {
  const notifications = localStorage.getItem('notifications');
  return notifications ? JSON.parse(notifications) : [];
};

// 工具函数，用于删除通知
export const deleteNotification = (id) => {
  let notifications = getNotifications();
  const filteredNotifications = notifications.filter(notification => notification.id !== id);
  localStorage.setItem('notifications', JSON.stringify(filteredNotifications));
};

// 创建通知函数
export const createNotification = (notificationData) => {
  const newNotification = {
    id: Date.now().toString(), // 使用时间戳作为ID
    ...notificationData,
  };
  saveNotification(newNotification);
  return newNotification;
};

// 删除通知函数
export const deleteNotificationById = (id) => {
  deleteNotification(id);
};
// 获取用户列表 API
export const getMembers = async () => {
  try {
    const response = await axios.get('/users');
    return response.data;
  } catch (error) {
    console.error('获取用户列表错误:', error);
    throw error;
  }
};


// 获取系统设置 API
export const getSystemSettings = async () => {
  try {
    const response = await axios.post('/settings');
    return response.data;
  } catch (error) {
    console.error('获取系统设置错误：', error);
    throw error;
  }
};
// 更新系统设置 API
export const updateSystemSettings = async (settingsData) => {
  try {
    const response = await axios.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('更新系统设置错误：', error);
    throw error;
  }
};
// 获取审计日志 API
export const getAuditLogs = async () => {
  try {
    const response = await axios.post('/audit/logs');
    return response.data;
  } catch (error) {
    console.error('获取审计日志错误：', error);
    throw error;
  }
};
// 更新用户角色 API
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await axios.patch(`/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    console.error('更新用户角色错误：', error);
    throw error;
  }
};
//批准出勤 API
export const approveAttendance = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/attendance/approve/${id}`);
    return response.data;
  } catch (error) {
    console.error("批准出勤错误：", error);
    throw error;
  }
};
//拒绝出勤 API
export const rejectAttendance = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/attendance/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error("拒绝出勤错误：", error);
    throw error;
  }
};
//获取出勤统计信息 API
export const getAttendanceStatistics = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/attendance/statistics`);
    return response.data;
  } catch (error) {
    console.error("获取出勤统计信息错误：", error);
    throw error;
  }
};
//更新用户密码 API
export const updateUserPassword = async (username, newPassword) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/password`, { username,newPassword });
    return response.data;
  } catch (error) {
    console.error("更新用户密码错误：", error);
    throw error;
  }
};
//获取考勤报告API
export const getAttendanceReport = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/attendance/report`);
    return response.data;
  } catch (error) {
    console.error("获取考勤报告错误：", error);
    throw error;
  }
};
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};