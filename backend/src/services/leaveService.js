const LeaveApplicationModel = require('../models/LeaveApplication'); // 确保路径正确


const addLeaveApplication = async (leaveData) => {
  try {
    const result = await LeaveApplicationModel.add(leaveData);
    if (result && result.username) {
      // 返回 username
      return { username: result.username };
    } else {
      throw new Error('Failed to retrieve user name');
    }
  } catch (error) {
    console.error('Error adding leave application:', error);
    throw error;
  }
};

module.exports = { addLeaveApplication };