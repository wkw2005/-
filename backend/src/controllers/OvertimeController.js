const {  addOvertimeApplication } = require('../services/OvertimeService'); 

const OvertimeController = {};



OvertimeController.addOvertimeApplication = async (req, res) => {
  try {
    const application = req.body;
    const result = await addOvertimeApplication(application);
    if (result && result.username) {
      // 返回 username
      res.status(201).json({ username: result.username });
    } else {
      res.status(500).json({ message: "无法创建请假申请" });
    }
  } catch (error) {
    console.error('Error adding Overtime application:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = OvertimeController;