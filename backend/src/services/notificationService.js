//封装了通知相关的业务逻辑
const Notification = require('../models/Notification');

const createNotification = async (notificationData) => {
  const newNotification = new Notification(notificationData);
  return newNotification.save();
};

const getAllNotifications = async () => {
  return Notification.find().exec();
};

const updateNotification = async (id, updatedData) => {
  const updatedNotification = await Notification.findByIdAndUpdate(id, updatedData, { new: true });
  if (!updatedNotification) {
    throw new Error('Notification not found');
  }
  return updatedNotification;
};

const deleteNotification = async (id) => {
  const deletedNotification = await Notification.findByIdAndDelete(id);
  if (!deletedNotification) {
    throw new Error('Notification not found');
  }
  return deletedNotification;
};

module.exports = { createNotification, getAllNotifications, updateNotification, deleteNotification };