const User = require('../models/User');
const bcrypt = require('bcrypt');
// 获取用户列表
const getMembers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'role']
  });

  return users;
};
// 根据用户名获取用户信息
const getUserByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('没有找到该用户');
  }
  return user;
};

// 根据用户名更新用户信息
const updateUserByUsername = async (username, updatedData) => {
  try {
    // 获取用户信息
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('用户未找到');
    }

    // 更新用户信息，这里使用 username 作为条件
    console.log(`Updating user ${username} with data:`, updatedData);

    const updatedUser = await User.update(updatedData, {
      where: { username } // 使用 username 作为更新条件
    });

    console.log(`Update result for user ${username}:`, updatedUser);

    // 检查更新是否成功
    if (updatedUser[0] === 0) {
      throw new Error('更新用户信息失败');
    }
    username = updatedData.username;

    // 返回更新后的用户信息
    const updatedUserInfo = await User.findOne({ where: { username } });
    console.log(`Updated user info:`, updatedUserInfo);
    return updatedUserInfo;
  } catch (error) {
    console.error('更新用户信息错误：', error);
    throw error;
  }
};

// 根据用户名删除用户信息
const deleteUserByUsername = async (username) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('用户未找到');
    }

    const result = await User.destroy({
      where: { username } // 使用 username 作为删除条件
    });

    if (result === 0) {
      throw new Error('删除用户失败');
    }

    return true;
  } catch (error) {
    console.error('删除用户信息错误：', error);
    throw error;
  }
};
// 更新用户密码
const updateUserPassword = async (username, newPassword) => {
  try {
    // 获取用户信息
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error('用户未找到');
    }

    // 加密新密码
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // 更新用户密码
    const updateResult = await User.update(
      { password: hashedPassword },
      { where: { username } }
    );

    if (updateResult[0] === 0) {
      throw new Error('更新用户信息失败');
    }

    // 返回更新后的用户信息
    const updatedUser = await User.findOne({ where: { username } });
    return updatedUser;
  } catch (error) {
    console.error('更新用户密码错误：', error);
    throw error;
  }
};
module.exports = { getMembers,getUserByUsername, updateUserByUsername, deleteUserByUsername ,updateUserPassword};
