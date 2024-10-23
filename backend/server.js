//后端应用的入口文件
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const overtimeRoutes = require('./src/routes/overtimeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const app = express();
const User = require('./src/models/User');
app.get('/', (req, res) => {
  res.send('服务器正在运行.');

});
// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
});
// 同步模型
User.sync({ force: false })
  .then(() => {
    console.log('User model synced');
  })
  .catch(err => {
    console.error('Error syncing User model:', err);
  });

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


// Middleware
app.use(cors());
app.use(express.json());

// 使用路由
app.use('/api', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api', leaveRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api', overtimeRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('SECRET_KEY:', process.env.SECRET_KEY);