//定义考勤相关的路由和控制器。

const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

// 获取所有考勤记录
router.get('/records', authMiddleware, AttendanceController.getAttendanceRecords);

// 添加新的考勤记录
router.post('/record', authMiddleware, AttendanceController.addAttendanceRecord);

module.exports = router;