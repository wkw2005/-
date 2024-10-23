//包含一些通用的辅助函数
const helpers = {
    // 一个通用函数，用于格式化日期
    formatDate: (date) => {
      return date.toISOString().slice(0, 10);
    },
  
    // 一个函数，用于发送电子邮件（需要一个电子邮件服务提供商）
    sendEmail: async (options) => {
      // 使用Nodemailer或其他类似的库来发送电子邮件
      // 以下代码需要根据你选择的电子邮件服务进行配置
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'your-smtp-host',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'your-email-address',
          pass: 'your-email-password',
        },
      });
  
      const mailOptions = {
        from: 'your-email-address',
        to: options.to,
        subject: options.subject,
        text: options.text,
      };
  
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        throw new Error('Email sending failed');
      }
    },
  };
  
  module.exports = helpers;