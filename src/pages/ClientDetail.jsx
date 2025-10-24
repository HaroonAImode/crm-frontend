import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, teams, invoices } = useAppContext();

  const client = clients.find((c) => c.id === id);
  if (!client) return (
    <div style={{padding: 20}}>
      <h2>Client not found</h2>
      <button onClick={() => navigate('/clients')}>Back</button>
    </div>
  );

  const team = teams.find(t => t.id === client.teamId);

  const downloadReport = () => {
    const clientInvoices = invoices.filter(inv => inv.clientId === client.id);
    const html = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Client Report - ${client.name}</title>
      <style>
        body{font-family: Inter, sans-serif; padding:24px;}
        h1{color:#111827}
        .section{margin-bottom:18px}
        table{width:100%;border-collapse:collapse}
        th,td{padding:8px;border:1px solid #e5e7eb;text-align:left}
      </style>
    </head>
    <body>
      <h1>Client Report: ${client.name}</h1>
      <div class="section"><strong>Email:</strong> ${client.email || '-'}<br/><strong>Phone:</strong> ${client.phone || '-'}<br/><strong>Company:</strong> ${client.company || '-'}</div>
      <div class="section"><strong>Assigned Team:</strong> ${team ? team.name : '—'}</div>
      <div class="section"><h3>Invoices</h3>
        ${clientInvoices.length === 0 ? '<div>No invoices</div>' : `
          <table>
            <thead><tr><th>ID</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>${clientInvoices.map(i => `<tr><td>${i.id}</td><td>${i.amount}</td><td>${i.status || ''}</td><td>${new Date(i.createdAt).toLocaleString()}</td></tr>`).join('')}</tbody>
          </table>`}
      </div>
    </body>
    </html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-${client.id}-report.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{padding: 20}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{margin: 0}}>{client.name}</h2>
        <div>
          <button onClick={downloadReport} style={{marginRight: 8}}>Download Report</button>
          <button onClick={() => navigate('/clients')}>Back</button>
        </div>
      </div>

      <div style={{marginTop: 12, background: '#fff', padding: 12, borderRadius: 8}}>
        <div><strong>Email:</strong> {client.email}</div>
        <div><strong>Phone:</strong> {client.phone}</div>
        <div><strong>Company:</strong> {client.company}</div>
        <div><strong>Notes:</strong> <div style={{marginTop:6, whiteSpace: 'pre-wrap'}}>{client.notes}</div></div>
        <div style={{marginTop: 12}}><strong>Assigned Team:</strong> {team ? team.name : '—'}</div>
      </div>
    </div>
  );
};

export default ClientDetail;
