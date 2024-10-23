const { login, register } = require('../services/authService');
const { SomeSpecificError } = require('../utils/authErrors');
const { generateToken, verifyToken } = require('../utils/authUtils');

const AuthController = {};

AuthController.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: '未提供刷新令牌' });

    const decoded = await verifyToken(refreshToken);
    if (!decoded) return res.status(401).json({ message: '无效的刷新令牌' });

    const newAccessToken = generateToken(decoded.userId);
    const newRefreshToken = generateToken(decoded.userId);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

AuthController.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const result = await login(username, password, role);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message });
    } else if (error instanceof SomeSpecificError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: '请检查用户名，密码，角色是否正确' });
    }
  }
};

AuthController.register = async (req, res) => {
  try {
    const userData = req.body;
    const result = await register(userData);
    if (result && result.token && result.user) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: '无法登录该账户' });
    }
  } catch (error) {
    console.error(error);
    if (error.message === 'Username is already taken') {
      res.status(400).json({ message: '该用户名已被使用' });
    } else if (error instanceof SomeSpecificError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: '该邮箱已经被注册' });
    }
  }
};

module.exports = AuthController;