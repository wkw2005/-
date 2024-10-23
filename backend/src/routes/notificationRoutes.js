//定义通知相关的路由
const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// 获取所有通知
router.get('/notifications', authMiddleware, NotificationController.getAllNotifications);

// 创建新通知
router.post('/notification', authMiddleware, NotificationController.createNotification);

// 更新通知
router.patch('/notification/:id', authMiddleware, NotificationController.updateNotification);

// 删除通知
router.delete('/notification/:id', authMiddleware, NotificationController.deleteNotification);

module.exports = router;