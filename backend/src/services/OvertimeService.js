const OvertimeApplicationModel = require('../models/OvertimeApplication'); // 确保路径正确


const addOvertimeApplication = async (OvertimeData) => {
  try {
    const result = await OvertimeApplicationModel.add(OvertimeData);
    if (result && result.username) {
      // 返回 username
      return { username: result.username };
    } else {
      throw new Error('Failed to retrieve user name');
    }
  } catch (error) {
    console.error('Error adding Overtime application:', error);
    throw error;
  }
};

module.exports = { addOvertimeApplication };