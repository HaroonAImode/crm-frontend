import React from 'react';
import { useAppContext } from '../context/AppContextValue';
import storage from '../utils/storage';

const Settings = () => {
  const { setNotifications } = useAppContext();

  const clearStorage = () => {
    if (!confirm('Clear local storage and reset demo data?')) return;
    storage.remove('clients');
    storage.remove('teams');
    storage.remove('notifications');
    storage.remove('invoices');
    storage.remove('expenses');
    storage.remove('user');
    setNotifications([]);
    window.location.reload();
  };

  return (
    <div style={{padding: 20}}>
      <h2>Settings</h2>
      <div style={{background: '#fff', padding: 12, borderRadius: 8}}>
        <p>Demo settings</p>
        <button onClick={clearStorage} style={{padding: '8px 12px'}}>Reset Demo</button>
      </div>
    </div>
  );
};

export default Settings;
