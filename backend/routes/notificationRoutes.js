const express = require('express');
const router = express.Router();
const {
  addNotification,
  getUserNotifications,
  getUnreadNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} = require('../controllers/notificationController');

const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin'), addNotification);

// ✅ Specific routes BEFORE param routes
router.get('/unread', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), getUnreadNotifications);
router.put('/read-all', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), markAllAsRead);
router.delete('/delete-all', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), deleteAllNotifications);

// ✅ Param routes AFTER specific routes
router.get('/', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), getUserNotifications);
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), getNotificationById);
router.put('/:id/read', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), markAsRead);
router.delete('/:id', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), deleteNotification);

module.exports = router;