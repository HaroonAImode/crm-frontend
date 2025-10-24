import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

export default function Dashboard() {
  const { clients, teams, invoices, expenses, addNotification } = useAppContext();
  const navigate = useNavigate();

  const styles = {
    row: { display: 'flex', gap: 16, marginBottom: 20, alignItems: 'stretch' },
    card: { flex: 1, background: '#fff', padding: 16, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' },
    actions: { display: 'flex', gap: 8, marginTop: 12 }
  };

  return (
    <div>
      <h2 style={{marginBottom: 12}}>Overview</h2>

      <div style={styles.row}>
        <div style={styles.card}>
          <div style={{fontSize: 12, color: '#6b7280'}}>Clients</div>
          <div style={{fontSize: 28, fontWeight: 700}}>{clients.length}</div>
          <div style={styles.actions}>
            <button onClick={() => navigate('/clients')} style={{padding: '8px 12px'}}>View</button>
            <button onClick={() => navigate('/clients/add')} style={{padding: '8px 12px'}}>Add</button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{fontSize: 12, color: '#6b7280'}}>Teams</div>
          <div style={{fontSize: 28, fontWeight: 700}}>{teams.length}</div>
          <div style={styles.actions}>
            <button onClick={() => navigate('/teams')} style={{padding: '8px 12px'}}>Manage</button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{fontSize: 12, color: '#6b7280'}}>Invoices</div>
          <div style={{fontSize: 28, fontWeight: 700}}>{invoices.length}</div>
          <div style={styles.actions}>
            <button onClick={() => navigate('/invoices')} style={{padding: '8px 12px'}}>Invoices</button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{fontSize: 12, color: '#6b7280'}}>Expenses</div>
          <div style={{fontSize: 28, fontWeight: 700}}>{expenses.length}</div>
          <div style={styles.actions}>
            <button onClick={() => navigate('/reports')} style={{padding: '8px 12px'}}>Reports</button>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', gap: 16}}>
        <div style={{flex: 2, background: '#fff', padding: 16, borderRadius: 8}}>
          <h3 style={{marginTop: 0}}>Revenue (placeholder)</h3>
          <div style={{height: 180, background: '#f1f5f9', borderRadius: 6}} />
        </div>

        <div style={{flex: 1, background: '#fff', padding: 16, borderRadius: 8}}>
          <h3 style={{marginTop: 0}}>Quick Actions</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <button onClick={() => navigate('/clients/add')} style={{padding: '10px 12px'}}>Add Client</button>
            <button onClick={() => navigate('/teams')} style={{padding: '10px 12px'}}>Add / Manage Team</button>
            <button onClick={() => { addNotification({ title: 'Quick note', category: 'info', message: 'Quick action triggered' }); }} style={{padding: '10px 12px'}}>Send Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
}
