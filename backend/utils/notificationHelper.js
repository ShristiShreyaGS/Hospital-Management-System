const Notification = require('../models/Notification');

const createNotification = async ({ userId, title, message, type, priority, relatedEntity, relatedEntityId, actionUrl }) => {
  try {
    await Notification.create({
      userId,
      title,
      message,
      type: type || 'System',
      priority: priority || 'Medium',
      relatedEntity: relatedEntity || null,
      relatedEntityId: relatedEntityId || null,
      actionUrl: actionUrl || null,
    })
  } catch (error) {
    console.error('Failed to create notification:', error.message)
  }
}

module.exports = createNotification