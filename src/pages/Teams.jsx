import React, { useState } from 'react';
import { useAppContext } from '../context/AppContextValue';

const Teams = () => {
  const { teams, addTeam, clients } = useAppContext();
  const [form, setForm] = useState({ name: '', members: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return alert('Team name required');
    const members = form.members.split(',').map(s => s.trim()).filter(Boolean);
    addTeam({ name: form.name, members });
    setForm({ name: '', members: '' });
  };

  return (
    <div style={{padding: 20}}>
      <h2>Teams</h2>
      <div style={{display: 'flex', gap: 16}}>
        <form onSubmit={handleSubmit} style={{background: '#fff', padding: 12, borderRadius: 8}}>
          <div style={{marginBottom: 8}}>
            <label style={{display: 'block'}}>Name</label>
            <input value={form.name} onChange={e => setForm(s => ({...s, name: e.target.value}))} style={{padding: 8, width: 240}} />
          </div>
          <div style={{marginBottom: 8}}>
            <label style={{display: 'block'}}>Members (comma separated emails)</label>
            <input value={form.members} onChange={e => setForm(s => ({...s, members: e.target.value}))} style={{padding: 8, width: 240}} />
          </div>
          <button type="submit" style={{padding: '8px 12px'}}>Create Team</button>
        </form>

        <div style={{flex: 1}}>
          <div style={{background: '#fff', padding: 12, borderRadius: 8}}>
            <h3 style={{marginTop: 0}}>Teams</h3>
            {teams.length === 0 ? <div style={{color: '#6b7280'}}>No teams yet.</div> : (
              <ul style={{listStyle: 'none', padding: 0}}>
                {teams.map(t => (
                  <li key={t.id} style={{padding: 8, borderBottom: '1px solid #f3f4f6'}}>
                    <div style={{fontWeight: 600}}>{t.name}</div>
                    <div style={{fontSize: 13, color: '#6b7280'}}>Members: {t.members?.join(', ') || '-'}</div>
                    <div style={{fontSize: 13, color: '#6b7280'}}>Assigned clients: {clients.filter(c => c.teamId === t.id).length}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
