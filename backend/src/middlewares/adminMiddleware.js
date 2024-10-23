//检查用户的角色是否为管理员
const { verifyToken } = require('../utils/authUtils');

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // 假设使用的是Bearer Token
    if (!token) {
      return res.status(401).json({ message: '没有提供令牌' });
    }

    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: '仅允许管理员访问'});
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
}

module.exports = adminMiddleware;