const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  charset: 'utf8mb4_general_ci'
});

const OvertimeApplication = {

  // 添加新的请假申请
  add: (OvertimeData) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO Overtime_applications SET ?', [OvertimeData], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // 返回新创建的记录的 username
          resolve({ username: OvertimeData.username });
        }
      });
    });
  },

};

module.exports = OvertimeApplication;