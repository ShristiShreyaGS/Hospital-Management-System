import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} from '../features/notifications/notificationSlice';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { notifications, loading, unreadCount } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      dispatch(deleteAllNotifications());
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="mark-all-read-btn" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="delete-all-btn" onClick={handleDeleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading notifications...</div>
      ) : notifications.length > 0 ? (
        <div className="notifications-container">
          {notifications.map(notification => (
            <div
              key={notification._id}
              className={`notification-card ${!notification.isRead ? 'unread' : ''}`}
            >
              <div className="notification-card-header">
                <h3 className="notification-card-title">{notification.title}</h3>
                <div className="notification-card-actions">
                  {!notification.isRead && (
                    <button
                      className="mark-read-btn"
                      onClick={() => handleMarkAsRead(notification._id)}
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(notification._id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <p className="notification-card-message">{notification.message}</p>

              <div className="notification-card-meta">
                <span className="notification-type">{notification.type}</span>
                <span className={`notification-priority priority-${notification.priority?.toLowerCase()}`}>
                  {notification.priority}
                </span>
                <span className="notification-date">
                  {new Date(notification.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
