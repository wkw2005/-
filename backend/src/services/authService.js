// 封装了认证相关的业务逻辑
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecret';
const bcrypt = require('bcrypt');
const checkUsernameExists = async (username) => {
  const user = await User.findOne({ where: { username } });
  return user ? true : false;
};

const checkEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user ? true : false;
};

const register = async (userData) => {
  // 检查用户名和电子邮件是否已存在
  if (await checkUsernameExists(userData.username)) {
    throw new Error('Username is already taken');
  }
  if (await checkEmailExists(userData.email)) {
    throw new Error('Email is already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = new User({
    username: userData.username,
    password: hashedPassword,
    email: userData.email,
    role: userData.role // 确保前端传递了角色信息
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: '1h' });
  return { token, user: newUser };
};

const login = async (username, password, role) => {
  const user = await User.findOne({
    where: {
      username,
      role
    }
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('你的用户名或密码或者角色不正确。');


  }
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { login, register };