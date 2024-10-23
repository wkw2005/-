//考勤记录数据模型
const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: process.env.DB_PASS,
  multipleStatements: true,
  charset: 'utf8mb4_general_ci'
});

// 定义 AttendanceRecord 模型
const AttendanceRecord = {
  // 获取所有考勤记录
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM attendance_records', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  // 添加新的考勤记录
  add: (attendanceData) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO attendance_records SET ?', [attendanceData], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  // 其他你需要的方法，如更新、删除等
};

module.exports = AttendanceRecord;