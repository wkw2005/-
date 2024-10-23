//处理与考勤记录相关的请求
const { getAttendanceRecords, addAttendanceRecord } = require('../services/attendanceService'); // 假设已实现这些函数

const AttendanceController = {};

AttendanceController.getAttendanceRecords = async (req, res) => {
  try {
    const records = await getAttendanceRecords();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

AttendanceController.addAttendanceRecord = async (req, res) => {
  try {
    const record = req.body;
    const result = await addAttendanceRecord(record);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = AttendanceController;