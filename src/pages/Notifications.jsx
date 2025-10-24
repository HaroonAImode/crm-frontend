import React from 'react';
import { useAppContext } from '../context/AppContextValue';

const Notifications = () => {
  const { notifications, setNotifications } = useAppContext();

  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  return (
    <div style={{padding: 20}}>
      <h2>Notifications</h2>
      <div style={{marginTop: 12}}>
        {notifications.length === 0 ? (
          <div style={{color: '#6b7280'}}>You're all caught up.</div>
        ) : (
          <ul style={{listStyle: 'none', padding: 0}}>
            {notifications.map(n => (
              <li key={n.id} style={{background: '#fff', padding: 12, marginBottom: 8, borderRadius: 8, display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <div style={{fontWeight: 600}}>{n.title} <span style={{fontSize: 12, color: '#6b7280', marginLeft: 8}}>{n.category}</span></div>
                  <div style={{fontSize: 13, color: '#374151'}}>{n.message}</div>
                  <div style={{fontSize: 12, color: '#9ca3af', marginTop: 6}}>{new Date(n.createdAt).toLocaleString()}</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <button onClick={() => dismiss(n.id)} style={{padding: '6px 8px'}}>Dismiss</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
