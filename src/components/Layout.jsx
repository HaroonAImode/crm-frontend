import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAppContext } from '../context/AppContextValue';

const Layout = ({ children }) => {
  const { user, logout } = useAppContext();

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif'}}>
      <Sidebar />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <Topbar>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{fontSize: 14, color: '#333'}}>Signed in as <strong>{user?.email}</strong></div>
            <button onClick={logout} style={{padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: '#fff', cursor: 'pointer'}}>Logout</button>
          </div>
        </Topbar>
        <main style={{padding: 20, background: '#f7fafc', minHeight: 'calc(100vh - 64px)'}}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
