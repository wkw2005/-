const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
//更新用户密码
router.put('/users/password', UserController.updateUserPassword);


// 获取所有成员信息
router.get('/users',  UserController.getMembers);
// console.log(a);

// 获取用户信息 
router.get('/users/profile', UserController.getUserProfile);

// 更新用户信息 
router.put('/users/profile', UserController.updateUserProfile);

// 删除用户信息
router.delete('/users',  UserController.deleteUserProfile);

module.exports = router;