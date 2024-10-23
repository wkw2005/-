//定义认证相关的路由
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

// 用户登录
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
// 其他需要保护的路由
router.get('/protected-endpoint', authMiddleware, (req, res) => {
  // 处理请求...
});

module.exports = router;