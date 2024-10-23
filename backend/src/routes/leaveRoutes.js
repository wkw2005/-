//定义请假申请相关的路由
const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/LeaveController');



// 添加新的请假申请
router.post('/leave', LeaveController.addLeaveApplication);

module.exports = router;