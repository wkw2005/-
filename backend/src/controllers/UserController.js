const {  getMembers , getUserByUsername, updateUserByUsername, deleteUserByUsername,updateUserPassword } = require('../services/userService');

const UserController = {};

// 获取所有成员信息
UserController.getMembers = async (req, res) => {
  try {
    const members = await getMembers();
    // console.log('Fetched members:', members);

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 获取当前登录用户的信息
UserController.getUserProfile = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: '缺少必要的查询参数: username' });
    }

    const user = await getUserByUsername(username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: '用户未找到' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新当前登录用户的信息
UserController.updateUserProfile = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: '请求体不能为空' });
    }

    // 从请求头中获取用户名
    const username = req.headers.username;
    if (!username) {
      return res.status(400).json({ message: '未提供用户名' });
    }

    console.log(`Updating user ${username} with data:`, req.body);

    const updatedUser = await updateUserByUsername(username, req.body);
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: '没有找到该用户' });
    }
  } catch (error) {
    console.error('更新用户信息过程中发生错误:', error);
    return res.status(500).json({ message: error.message });
  }
};

// 删除要删除的用户的信息
UserController.deleteUserProfile = async (req, res) => {
  try {
    const username = req.headers['username']; // 从请求头中获取用户名
    if (!username) {
      return res.status(400).json({ message: '未提供用户名' });
    }

    const result = await deleteUserByUsername(username);
    if (result) {
      return res.status(200).json({ message: '用户删除成功' });
    } else {
      return res.status(404).json({ message: '用户未找到' });
    }
  } catch (error) {
    console.error('删除用户信息过程中发生错误:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = UserController;
// 更新用户密码
UserController.updateUserPassword = async (req, res) => {
  try {
    const { username } = req.body; // 从请求体中获取用户名
    const { newPassword } = req.body; // 从请求体中获取新密码

    // 调用 userService 中的函数来更新密码
    const updatedUser = await updateUserPassword(username, newPassword);
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: '没有找到该用户' });
    }
  } catch (error) {
    console.error('更新用户密码过程中发生错误:', error);
    return res.status(500).json({ message: error.message });
  }
};