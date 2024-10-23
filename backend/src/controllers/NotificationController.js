//处理通知相关的请求
const { createNotification, getAllNotifications, updateNotification, deleteNotification } = require('../services/notificationService'); // 假设已实现这些函数

const NotificationController = {};

NotificationController.createNotification = async (req, res) => {
  try {
    const newNotification = req.body;
    const notification = await createNotification(newNotification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

NotificationController.getAllNotifications = async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

NotificationController.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = req.body;
    const notification = await updateNotification(id, updatedNotification);
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

NotificationController.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteNotification(id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = NotificationController;