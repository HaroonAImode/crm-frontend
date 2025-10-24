import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const Topbar = ({ children }) => {
  const { notifications } = useAppContext();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const submitSearch = (e) => {
    e && e.preventDefault();
    if (!query) return navigate('/clients');
    navigate(`/clients?q=${encodeURIComponent(query)}`);
    setQuery('');
  };

  return (
    <header style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>Agency CRM</div>
        <form onSubmit={submitSearch} style={{ display: 'flex', alignItems: 'center' }}>
          <input placeholder="Search clients..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} />
          <button type="submit" style={{ marginLeft: 8, padding: '8px 10px' }}>Search</button>
        </form>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} ref={ref}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setOpen(s => !s)} style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>
            🔔 <span style={{ marginLeft: 6, fontSize: 12 }}>{notifications.length}</span>
          </button>

          {open && (
            <div style={{ position: 'absolute', right: 0, marginTop: 8, width: 320, background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: 12, borderBottom: '1px solid #f3f4f6', fontWeight: 600 }}>Notifications</div>
              <div style={{ maxHeight: 260, overflow: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: 12, color: '#6b7280' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} style={{ padding: 12, borderBottom: '1px solid #f7fafc' }}>
                      <div style={{ fontWeight: 600 }}>{n.title} <span style={{ color: '#6b7280', fontSize: 12 }}>{n.category}</span></div>
                      <div style={{ fontSize: 13, color: '#374151' }}>{n.message}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {children}
      </div>
    </header>
  );
};

export default Topbar;
