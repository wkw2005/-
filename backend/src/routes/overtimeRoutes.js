//定义请假申请相关的路由
const express = require('express');
const router = express.Router();
const OvertimeController = require('../controllers/OvertimeController');



// 添加新的请假申请
router.post('/Overtime', OvertimeController.addOvertimeApplication);

module.exports = router;