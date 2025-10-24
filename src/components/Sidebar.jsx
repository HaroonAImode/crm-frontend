import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const linkStyle = (isActive) => ({
  display: 'block',
  padding: '10px 12px',
  borderRadius: 6,
  textDecoration: 'none',
  color: isActive ? '#fff' : '#111827',
  background: isActive ? '#2563eb' : 'transparent'
});

const Sidebar = () => {
  const { clients, teams, notifications } = useAppContext();

  return (
    <aside style={{ width: 250, padding: 16, borderRight: '1px solid #eee', background: '#f8fafc' }}>
      <h3 style={{ marginTop: 0 }}>Agency CRM</h3>
      <nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <NavLink to="/" style={({isActive}) => linkStyle(isActive)}>Dashboard</NavLink>
          <NavLink to="/clients" style={({isActive}) => linkStyle(isActive)}>Clients <span style={{float: 'right', opacity: 0.7}}>{clients.length}</span></NavLink>
          <NavLink to="/clients/add" style={({isActive}) => linkStyle(isActive)}>Add Client</NavLink>
          <NavLink to="/teams" style={({isActive}) => linkStyle(isActive)}>Teams <span style={{float: 'right', opacity: 0.7}}>{teams.length}</span></NavLink>
          <NavLink to="/invoices" style={({isActive}) => linkStyle(isActive)}>Invoices</NavLink>
          <NavLink to="/expenses" style={({isActive}) => linkStyle(isActive)}>Expenses</NavLink>
          <NavLink to="/reports" style={({isActive}) => linkStyle(isActive)}>Reports</NavLink>
          <NavLink to="/notifications" style={({isActive}) => linkStyle(isActive)}>Notifications <span style={{float: 'right', opacity: 0.7}}>{notifications.length}</span></NavLink>
          <NavLink to="/settings" style={({isActive}) => linkStyle(isActive)}>Settings</NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
