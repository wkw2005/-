// 用户数据模型
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false, // 确保数据库中不允许为空
    defaultValue: '' // 提供一个默认值
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: 'member'
  }
}, {
  timestamps: false
});

User.sync({ force: false })
  .then(() => {
    console.log('User model synced');
  })
  .catch(err => {
    console.error('Error syncing User model:', err);
  });

module.exports = User;