import React from 'react';
import { useAppContext } from '../context/AppContextValue';

const Reports = () => {
  const { clients } = useAppContext();

  const downloadAllClients = () => {
    const rows = clients.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.company || ''}</td></tr>`).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Clients Report</title><style>body{font-family:Inter, sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #e5e7eb;padding:8px;text-align:left}</style></head><body><h1>Clients</h1><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Company</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
    const blob = new Blob([html], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients-report.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{padding: 20}}>
      <h2>Reports</h2>
      <div style={{background: '#fff', padding: 12, borderRadius: 8}}>
        <p>Generate downloadable reports for clients.</p>
        <button onClick={downloadAllClients} style={{padding: '8px 12px'}}>Download Clients Report</button>
      </div>
    </div>
  );
};

export default Reports;
