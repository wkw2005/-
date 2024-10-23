//封装了考勤记录相关的业务逻辑
const AttendanceRecord = require('../models/AttendanceRecord');

const getAttendanceRecords = async () => {
  return AttendanceRecord.find().exec();
};

const addAttendanceRecord = async (attendanceData) => {
  const newRecord = new AttendanceRecord(attendanceData);
  return newRecord.save();
};

module.exports = { getAttendanceRecords, addAttendanceRecord };