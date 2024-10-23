// 引入JWT库

const jwt = require('jsonwebtoken');

// 生成JWT令牌
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

// 验证JWT令牌
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

module.exports = {
  generateToken,
  verifyToken
};