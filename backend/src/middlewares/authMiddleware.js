//认证中间件
const { verifyToken } = require('../utils/authUtils');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未提供令牌或令牌格式不正确' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: '无效的令牌' });
  }
};

module.exports = authMiddleware;