const {  addLeaveApplication } = require('../services/leaveService'); 

const LeaveController = {};



LeaveController.addLeaveApplication = async (req, res) => {
  try {
    const application = req.body;
    const result = await addLeaveApplication(application);
    if (result && result.username) {
      // 返回 username
      res.status(201).json({ username: result.username });
    } else {
      res.status(500).json({ message: "无法创建请假申请" });
    }
  } catch (error) {
    console.error('Error adding leave application:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = LeaveController;