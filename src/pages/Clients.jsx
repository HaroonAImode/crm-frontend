import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';
import ClientTable from '../components/ClientTable';
import FilterBar from '../components/FilterBar';
import ModalPopup from '../components/ModalPopup';

const filtersList = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Unassigned', value: 'unassigned' },
  { label: 'By Service', value: 'service' },
];

const Clients = () => {
  const { clients, teams, user, invoices, assignClientToTeam, addNotification } = useAppContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, client: null, mode: 'view' });

  // Debug log to check data
  console.log('Current clients:', clients);
  console.log('Current user:', user);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q) setQuery(q);
  }, [location.search]);

  // Filtering logic
  const visibleClients = useMemo(() => {
    console.log('Starting clients:', clients);
    let list = clients;
    
    if (!user) {
      console.log('No user, returning empty list');
      return [];
    }

    console.log('User role:', user.role);
    if (user.role !== 'admin') {
      const myTeamIds = teams.filter(t => Array.isArray(t.members) && t.members.includes(user.email)).map(t => t.id);
      console.log('Team IDs for current user:', myTeamIds);
      list = clients.filter(c => {
        const shouldInclude = c.teamId && myTeamIds.includes(c.teamId);
        console.log(`Client ${c.name}: teamId=${c.teamId}, included=${shouldInclude}`);
        return shouldInclude;
      });
    }

    console.log('After team filter:', list);

    // Default all clients to 'active' if status is not set
    list = list.map(c => ({...c, status: c.status || 'active'}));
    
    // Filter by category
    if (filter === 'active') list = list.filter(c => c.status === 'active');
    if (filter === 'completed') list = list.filter(c => c.status === 'completed');
    if (filter === 'overdue') list = list.filter(c => {
      if (!c.projectDeadline) return false;
      return new Date(c.projectDeadline) < new Date();
    });
    if (filter === 'unassigned') list = list.filter(c => !c.teamId);
    if (filter === 'service') list = list.filter(c => c.serviceType);
    
    console.log('After all filters:', list);
    return list;
  }, [clients, teams, user, filter]);

  const filtered = visibleClients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || (c.email || '').toLowerCase().includes(query.toLowerCase()));

  // Columns for table
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Contact' },
    { key: 'projectDeadline', label: 'Deadline' },
    { key: 'daysLeft', label: 'Days Left' },
    { key: 'status', label: 'Status' },
    { key: 'paymentSummary', label: 'Payment' },
    { key: 'team', label: 'Team' },
  ];

  // Prepare table data
  const tableData = filtered.map(c => {
    // Days left
    let daysLeft = '';
    if (c.projectDeadline) {
      const d = Math.ceil((new Date(c.projectDeadline) - new Date()) / (1000*60*60*24));
      daysLeft = d > 0 ? d : 0;
    }
    // Payment summary
    const clientInvoices = invoices.filter(inv => inv.clientId === c.id);
    let paymentSummary = '';
    if (clientInvoices.length > 0) {
      const paid = clientInvoices.reduce((acc, inv) => acc + (inv.payments?.filter(p => p.status === 'done').length || 0), 0);
      const total = clientInvoices.reduce((acc, inv) => acc + (inv.installments || 1), 0);
      paymentSummary = `Installment ${paid} Done, ${total-paid} Pending`;
    } else {
      paymentSummary = 'No invoices';
    }
    // Team
    let team = '-';
    if (c.teamId) {
      const t = teams.find(t => t.id === c.teamId);
      team = t ? t.name : '-';
    }
    return {
      ...c,
      daysLeft,
      paymentSummary,
      team,
    };
  });

  // Actions for table
  const actions = {
    view: (client) => setModal({ open: true, client, mode: 'view' }),
    edit: (client) => setModal({ open: true, client, mode: 'edit' }),
    download: (client) => {
      // Will implement PDF later, for now just show notification
      addNotification({
        title: 'Client Report',
        message: `Preparing PDF report for ${client.name}...`,
        category: 'info'
      });
    },
    assign: user?.role === 'admin' ? (client) => (
      <select 
        value={client.teamId || ''} 
        onChange={(e) => {
          assignClientToTeam(client.id, e.target.value);
          addNotification({
            title: 'Team Assigned',
            message: `${client.name} assigned to ${teams.find(t => t.id === e.target.value)?.name || 'No Team'}`,
            category: 'success'
          });
        }}
        style={{padding: '4px 8px'}}
      >
        <option value="">— Select Team —</option>
        {teams.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
    ) : null
  };

  return (
    <div style={{padding: 20}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
        <h2 style={{margin: 0}}>Clients</h2>
        <div>
          <button onClick={() => navigate('/clients/add')} style={{padding: '8px 12px'}}>Add Client</button>
        </div>
      </div>

      <FilterBar filters={filtersList} active={filter} onChange={setFilter} />

      <div style={{marginBottom: 12}}>
        <input placeholder="Search clients" value={query} onChange={(e) => setQuery(e.target.value)} style={{padding: 8, width: 260}} />
      </div>

      <div style={{background: '#fff', borderRadius: 8, padding: 12}}>
        {tableData.length === 0 ? (
          <div style={{padding: 20, color: '#6b7280'}}>No clients found.</div>
        ) : (
          <ClientTable columns={columns} data={tableData} actions={actions} />
        )}
      </div>

      <ModalPopup open={modal.open} onClose={() => setModal({ open: false, client: null, mode: 'view' })}>
        {/* TODO: Add client detail/edit form here */}
        {modal.client && modal.mode === 'view' && (
          <div>
            <h3>{modal.client.name}</h3>
            <div>Email: {modal.client.email}</div>
            <div>Contact: {modal.client.phone}</div>
            <div>Project Deadline: {modal.client.projectDeadline}</div>
            <div>Budget: {modal.client.budget} {modal.client.currency}</div>
            <div>Installments: {modal.client.installments}</div>
            <div>Team: {teams.find(t => t.id === modal.client.teamId)?.name || '-'}</div>
            <div>Status: {modal.client.status}</div>
            <div>Service Type: {modal.client.serviceType}</div>
            <div>Payment Note: {modal.client.paymentNote}</div>
            <div style={{marginTop:12}}>
              <strong>Proof Images:</strong>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                {modal.client.attachments?.map((att, idx) => att ? <img key={idx} src={att} alt={`Proof ${idx+1}`} style={{maxWidth:80, borderRadius:6}} /> : null)}
              </div>
            </div>
          </div>
        )}
        {/* TODO: Add edit form for modal.mode === 'edit' */}
      </ModalPopup>
    </div>
  );
};

export default Clients;
