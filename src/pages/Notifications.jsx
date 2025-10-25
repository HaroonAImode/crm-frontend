import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContextValue';

const Notifications = () => {
  const { notifications, setNotifications, addNotification } = useAppContext();
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Enhanced styles with premium design
  const styles = {
    container: {
      padding: '24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1e293b',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '4px'
    },
    actionButtons: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: '#f8fafc',
      color: '#475569',
      border: '1px solid #e2e8f0'
    },
    dangerButton: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    filterContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    activeFilter: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
    },
    contentCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
      color: '#475569'
    },
    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: 0.5
    },
    notificationList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    notificationItem: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    notificationItemHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      borderColor: '#3b82f6'
    },
    notificationItemUnread: {
      borderLeft: '4px solid #3b82f6',
      background: '#f0f9ff'
    },
    notificationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    notificationTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 4px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    notificationCategory: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase'
    },
    categorySuccess: {
      background: '#f0fdf4',
      color: '#16a34a'
    },
    categoryError: {
      background: '#fef2f2',
      color: '#dc2626'
    },
    categoryWarning: {
      background: '#fffbeb',
      color: '#d97706'
    },
    categoryInfo: {
      background: '#f0f9ff',
      color: '#0369a1'
    },
    categorySystem: {
      background: '#f8fafc',
      color: '#475569'
    },
    notificationTime: {
      fontSize: '12px',
      color: '#64748b',
      fontWeight: 500
    },
    notificationMessage: {
      fontSize: '14px',
      color: '#374151',
      lineHeight: '1.5',
      marginBottom: '12px'
    },
    notificationExpanded: {
      marginTop: '12px',
      padding: '16px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    expandedContent: {
      fontSize: '14px',
      color: '#475569',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap'
    },
    notificationActions: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-end',
      marginTop: '12px'
    },
    actionButton: {
      padding: '6px 12px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '12px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    markAsReadButton: {
      background: '#f0f9ff',
      color: '#0369a1',
      border: '1px solid #bae6fd'
    },
    deleteButton: {
      background: '#fef2f2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#1e293b',
      margin: '8px 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    unreadStat: {
      color: '#3b82f6'
    },
    successStat: {
      color: '#10b981'
    },
    warningStat: {
      color: '#f59e0b'
    },
    errorStat: {
      color: '#ef4444'
    }
  };

  // Notification categories
  const categories = [
    { value: 'all', label: 'All', icon: '📬', count: notifications.length },
    { value: 'unread', label: 'Unread', icon: '🔔', count: notifications.filter(n => !n.read).length },
    { value: 'success', label: 'Success', icon: '✅', count: notifications.filter(n => n.category === 'success').length },
    { value: 'warning', label: 'Warning', icon: '⚠️', count: notifications.filter(n => n.category === 'warning').length },
    { value: 'error', label: 'Error', icon: '❌', count: notifications.filter(n => n.category === 'error').length },
    { value: 'info', label: 'Info', icon: 'ℹ️', count: notifications.filter(n => n.category === 'info').length },
    { value: 'system', label: 'System', icon: '⚙️', count: notifications.filter(n => n.category === 'system').length }
  ];

  // Calculate notification statistics
  const notificationStats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const success = notifications.filter(n => n.category === 'success').length;
    const warning = notifications.filter(n => n.category === 'warning').length;
    const error = notifications.filter(n => n.category === 'error').length;
    const today = notifications.filter(n => {
      const notifDate = new Date(n.createdAt);
      const today = new Date();
      return notifDate.toDateString() === today.toDateString();
    }).length;

    return { total, unread, success, warning, error, today };
  }, [notifications]);

  // Filter notifications based on active filter
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    switch(activeFilter) {
      case 'unread':
        filtered = filtered.filter(n => !n.read);
        break;
      case 'success':
        filtered = filtered.filter(n => n.category === 'success');
        break;
      case 'warning':
        filtered = filtered.filter(n => n.category === 'warning');
        break;
      case 'error':
        filtered = filtered.filter(n => n.category === 'error');
        break;
      case 'info':
        filtered = filtered.filter(n => n.category === 'info');
        break;
      case 'system':
        filtered = filtered.filter(n => n.category === 'system');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }
    
    return filtered;
  }, [notifications, activeFilter]);

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    addNotification({
      title: 'Notification Dismissed',
      message: 'The notification has been removed',
      category: 'info'
    });
  };

  const dismissAll = () => {
    if (notifications.length === 0) return;
    
    setNotifications([]);
    addNotification({
      title: 'All Notifications Cleared',
      message: 'All notifications have been dismissed',
      category: 'success'
    });
  };

  const markAllAsRead = () => {
    if (notifications.filter(n => !n.read).length === 0) return;
    
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addNotification({
      title: 'All Notifications Read',
      message: 'All notifications have been marked as read',
      category: 'success'
    });
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const toggleExpand = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  const getCategoryStyle = (category) => {
    switch(category) {
      case 'success': return {...styles.notificationCategory, ...styles.categorySuccess};
      case 'error': return {...styles.notificationCategory, ...styles.categoryError};
      case 'warning': return {...styles.notificationCategory, ...styles.categoryWarning};
      case 'info': return {...styles.notificationCategory, ...styles.categoryInfo};
      case 'system': return {...styles.notificationCategory, ...styles.categorySystem};
      default: return {...styles.notificationCategory, ...styles.categoryInfo};
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Notifications</h1>
          <div style={styles.subtitle}>Stay updated with your agency activities</div>
        </div>
        <div style={styles.actionButtons}>
          <button
            style={{...styles.button, ...styles.secondaryButton}}
            onClick={markAllAsRead}
            disabled={notificationStats.unread === 0}
            onMouseEnter={(e) => notificationStats.unread > 0 && (e.target.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => notificationStats.unread > 0 && (e.target.style.transform = 'none')}
          >
            📪 Mark All Read
          </button>
          <button
            style={{...styles.button, ...styles.dangerButton}}
            onClick={dismissAll}
            disabled={notifications.length === 0}
            onMouseEnter={(e) => notifications.length > 0 && (e.target.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => notifications.length > 0 && (e.target.style.transform = 'none')}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Notifications</div>
          <div style={styles.statValue}>{notificationStats.total}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Unread</div>
          <div style={{...styles.statValue, ...styles.unreadStat}}>{notificationStats.unread}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Today</div>
          <div style={{...styles.statValue, ...styles.successStat}}>{notificationStats.today}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Success</div>
          <div style={{...styles.statValue, ...styles.successStat}}>{notificationStats.success}</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filterContainer}>
        {categories.map(category => (
          <button
            key={category.value}
            style={{
              ...styles.filterButton,
              ...(activeFilter === category.value ? styles.activeFilter : {})
            }}
            onClick={() => setActiveFilter(category.value)}
          >
            {category.icon} {category.label} 
            {category.count > 0 && ` (${category.count})`}
          </button>
        ))}
      </div>

      <div style={styles.contentCard}>
        {filteredNotifications.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>🔔</div>
            <div style={styles.emptyStateTitle}>No notifications found</div>
            <div style={{color: '#64748b', marginBottom: '20px'}}>
              {activeFilter === 'all' 
                ? "You're all caught up! No notifications at the moment."
                : `No ${activeFilter} notifications found.`}
            </div>
            <button
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => addNotification({
                title: 'Test Notification',
                message: 'This is a test notification to show how notifications work in the system.',
                category: 'info',
                extendedContent: 'This is extended content that provides more details about the notification. You can include additional information, links, or actions here.'
              })}
            >
              + Add Test Notification
            </button>
          </div>
        ) : (
          <div style={styles.notificationList}>
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  ...styles.notificationItem,
                  ...(!notification.read ? styles.notificationItemUnread : {}),
                }}
                onMouseEnter={(e) => e.currentTarget.style = {...styles.notificationItem, ...styles.notificationItemHover, ...(!notification.read ? styles.notificationItemUnread : {})}}
                onMouseLeave={(e) => e.currentTarget.style = {...styles.notificationItem, ...(!notification.read ? styles.notificationItemUnread : {})}}
                onClick={() => {
                  markAsRead(notification.id);
                  toggleExpand(notification.id);
                }}
              >
                <div style={styles.notificationHeader}>
                  <div style={styles.notificationTitle}>
                    {getCategoryIcon(notification.category)} {notification.title}
                    <span style={getCategoryStyle(notification.category)}>
                      {notification.category}
                    </span>
                  </div>
                  <div style={styles.notificationTime}>
                    {formatTime(notification.createdAt)}
                  </div>
                </div>

                <div style={styles.notificationMessage}>
                  {notification.message}
                </div>

                {expandedNotification === notification.id && notification.extendedContent && (
                  <div style={styles.notificationExpanded}>
                    <div style={styles.expandedContent}>
                      {notification.extendedContent}
                    </div>
                  </div>
                )}

                <div style={styles.notificationActions}>
                  {!notification.read && (
                    <button
                      style={{...styles.actionButton, ...styles.markAsReadButton}}
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    style={{...styles.actionButton, ...styles.deleteButton}}
                    onClick={(e) => {
                      e.stopPropagation();
                      dismiss(notification.id);
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;