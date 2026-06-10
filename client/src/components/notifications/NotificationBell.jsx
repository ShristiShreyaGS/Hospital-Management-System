import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead, deleteNotification } from '../../features/notifications/notificationSlice';
import { useNavigate } from 'react-router-dom';
import './NotificationBell.css';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount } = useSelector(state => state.notifications);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(getNotifications());
    const interval = setInterval(() => {
      dispatch(getNotifications());
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification._id));
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setShowDropdown(false);
    }
  };

  const handleDelete = (e, notificationId) => {
    e.stopPropagation();
    dispatch(deleteNotification(notificationId));
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <div className="bell-icon-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            <button 
              className="view-all-btn" 
              onClick={() => {
                navigate('/notifications');
                setShowDropdown(false);
              }}
            >
              View All
            </button>
          </div>

          <div className="notifications-list">
            {recentNotifications.length > 0 ? (
              recentNotifications.map(notification => (
                <div
                  key={notification._id}
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {new Date(notification.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, notification._id)}
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">No notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
