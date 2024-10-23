//通知数据模型
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

const Notification = {
    // 获取所有通知
    getAll: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM notifications', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    // 根据 ID 获取通知
    getById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM notifications WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    // 添加新通知
    add: (notificationData) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO notifications SET ?', [notificationData], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    // 更新通知
    update: (id, updateData) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE notifications SET ? WHERE id = ?', [updateData, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    },
    // 删除通知
    delete: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM notifications WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
};

module.exports = Notification;