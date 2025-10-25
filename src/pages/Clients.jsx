import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';
import ClientTable from '../components/ClientTable';
import FilterBar from '../components/FilterBar';
import ModalPopup from '../components/ModalPopup';

const filtersList = [
  { label: 'All Clients', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Unassigned', value: 'unassigned' },
  { label: 'By Service', value: 'service' },
];

// Enhanced dummy data that will always be available
const dummyClients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc',
    projectDeadline: '2024-12-31',
    status: 'active',
    budget: 75000,
    currency: 'USD',
    installments: 4,
    serviceType: 'Web Development',
    paymentNote: '50% advance, 25% on milestone 1, 25% on completion',
    attachments: [],
    teamId: '1',
    notes: 'Enterprise client with complex requirements. Requires regular updates and meetings.',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@designstudio.com',
    phone: '+1 (555) 987-6543',
    company: 'Design Studio LLC',
    projectDeadline: '2024-10-15',
    status: 'active',
    budget: 35000,
    currency: 'USD',
    installments: 3,
    serviceType: 'UI/UX Design',
    paymentNote: 'Monthly payments upon delivery',
    attachments: [],
    teamId: '2',
    notes: 'Creative agency needing branding and website redesign. Very collaborative.',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@consulting.com',
    phone: '+1 (555) 456-7890',
    company: 'Business Solutions Inc',
    projectDeadline: '2024-08-30',
    status: 'overdue',
    budget: 120000,
    currency: 'USD',
    installments: 6,
    serviceType: 'Business Strategy',
    paymentNote: 'Custom payment plan with quarterly reviews',
    attachments: [],
    teamId: '1',
    notes: 'Long-term strategic partnership. Multiple projects planned.',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Alex Thompson',
    email: 'alex@startup.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Startup',
    projectDeadline: '2024-11-20',
    status: 'active',
    budget: 25000,
    currency: 'USD',
    installments: 2,
    serviceType: 'Mobile App Development',
    paymentNote: '50% upfront, 50% on delivery',
    attachments: [],
    teamId: null,
    notes: 'Early stage startup. Flexible on timeline but strict on budget.',
    createdAt: '2024-03-05'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa@retailgroup.com',
    phone: '+1 (555) 876-5432',
    company: 'Retail Group International',
    projectDeadline: '2024-09-15',
    status: 'completed',
    budget: 95000,
    currency: 'USD',
    installments: 5,
    serviceType: 'E-commerce Platform',
    paymentNote: 'Milestone-based payments',
    attachments: [],
    teamId: '2',
    notes: 'Large retail chain expanding online presence. Project completed successfully.',
    createdAt: '2024-01-08'
  },
  {
    id: '6',
    name: 'David Kim',
    email: 'david@financepro.com',
    phone: '+1 (555) 345-6789',
    company: 'Finance Pro Solutions',
    projectDeadline: '2024-07-20',
    status: 'active',
    budget: 65000,
    currency: 'USD',
    installments: 3,
    serviceType: 'Financial Software',
    paymentNote: '30% advance, 40% on delivery, 30% after support period',
    attachments: [],
    teamId: '1',
    notes: 'Financial services company needing custom accounting software.',
    createdAt: '2024-02-10'
  },
  {
    id: '7',
    name: 'Maria Garcia',
    email: 'maria@healthcare.org',
    phone: '+1 (555) 567-8901',
    company: 'Healthcare Systems Inc',
    projectDeadline: '2024-11-30',
    status: 'active',
    budget: 150000,
    currency: 'USD',
    installments: 6,
    serviceType: 'Healthcare Platform',
    paymentNote: 'Quarterly payments based on milestones',
    attachments: [],
    teamId: '3',
    notes: 'Large healthcare provider needing patient management system.',
    createdAt: '2024-01-25'
  },
  {
    id: '8',
    name: 'James Wilson',
    email: 'james@educonnect.com',
    phone: '+1 (555) 678-9012',
    company: 'EduConnect Learning',
    projectDeadline: '2024-06-15',
    status: 'overdue',
    budget: 45000,
    currency: 'USD',
    installments: 2,
    serviceType: 'Educational Platform',
    paymentNote: '50% upfront, 50% on completion',
    attachments: [],
    teamId: null,
    notes: 'Educational technology startup building online learning platform.',
    createdAt: '2024-03-01'
  }
];

const Clients = () => {
  const { teams = [], user, invoices = [], addNotification } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, client: null, mode: 'view' });
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({});
  
  // Use local state for clients - this ensures data persistence
  const [localClients, setLocalClients] = useState(() => {
    // Initialize with dummy clients
    return dummyClients;
  });

  // Enhanced styles with premium design - consistent with other pages
  const styles = {
    container: {
      padding: '24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      padding: '32px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '36px',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0,
      letterSpacing: '-0.5px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      marginTop: '8px',
      fontWeight: 500,
      letterSpacing: '0.2px'
    },
    button: {
      padding: '16px 32px',
      borderRadius: '14px',
      border: 'none',
      fontWeight: 700,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)',
      letterSpacing: '0.3px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      color: '#475569',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    },
    dangerButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.3)'
    },
    successButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
    },
    searchInput: {
      padding: '18px 28px',
      borderRadius: '16px',
      border: '2px solid transparent',
      fontSize: '16px',
      width: '100%',
      maxWidth: '600px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
      marginBottom: '28px',
      transition: 'all 0.3s ease',
      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)',
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
      fontWeight: 500
    },
    contentCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      padding: '36px',
      boxShadow: '0 12px 48px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.9)',
      marginBottom: '28px',
      backdropFilter: 'blur(10px)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '28px',
      marginBottom: '36px'
    },
    statCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '32px 28px',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      border: '1px solid rgba(255,255,255,0.8)',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    statValue: {
      fontSize: '36px',
      fontWeight: 800,
      color: '#1e293b',
      margin: '16px 0 8px 0',
      letterSpacing: '-0.5px'
    },
    statLabel: {
      fontSize: '14px',
      fontWeight: 700,
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '1.2px'
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '24px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    },
    emptyState: {
      padding: '100px 40px',
      textAlign: 'center',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '16px',
      color: '#475569',
      letterSpacing: '-0.3px'
    },
    modalContent: {
      padding: '32px 0',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    modalSection: {
      marginBottom: '32px',
      paddingBottom: '32px',
      borderBottom: '1px solid #f1f5f9'
    },
    modalLabel: {
      fontSize: '16px',
      fontWeight: 700,
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '1.2px',
      marginBottom: '20px'
    },
    modalValue: {
      fontSize: '18px',
      color: '#1e293b',
      fontWeight: 600,
      marginBottom: '12px',
      lineHeight: '1.6'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '28px',
      marginBottom: '32px'
    },
    inputGroup: {
      marginBottom: '28px'
    },
    label: {
      display: 'block',
      fontSize: '16px',
      fontWeight: 700,
      color: '#374151',
      marginBottom: '16px',
      letterSpacing: '0.3px'
    },
    input: {
      width: '100%',
      padding: '18px 24px',
      borderRadius: '16px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      background: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      fontWeight: 500
    },
    select: {
      width: '100%',
      padding: '18px 24px',
      borderRadius: '16px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      background: '#ffffff',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      fontWeight: 500
    },
    textarea: {
      width: '100%',
      padding: '18px 24px',
      borderRadius: '16px',
      border: '2px solid #e2e8f0',
      fontSize: '16px',
      minHeight: '140px',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      fontWeight: 500
    },
    statusBadge: {
      padding: '12px 24px',
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.8px'
    },
    statusActive: {
      background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      color: '#166534',
      boxShadow: '0 4px 16px rgba(34, 197, 94, 0.2)'
    },
    statusCompleted: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      color: '#1e40af',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
    },
    statusOverdue: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
      color: '#dc2626',
      boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)'
    },
    actionButtons: {
      display: 'flex',
      gap: '20px',
      marginTop: '40px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    // Enhanced table styles
    tableContainer: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      border: '1px solid rgba(255,255,255,0.8)'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px 24px',
      borderBottom: '2px solid #e2e8f0'
    },
    tableRow: {
      transition: 'all 0.3s ease',
      borderBottom: '1px solid #f1f5f9'
    },
    tableCell: {
      padding: '20px 24px',
      fontSize: '15px',
      fontWeight: 500,
      color: '#374151',
      borderRight: '1px solid #f1f5f9'
    },
    tableCellHighlight: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      fontWeight: 600,
      color: '#0369a1'
    }
  };

  // Helper function to get status style
  const getStatusStyle = (status) => {
    switch(status) {
      case 'active': return {...styles.statusBadge, ...styles.statusActive};
      case 'completed': return {...styles.statusBadge, ...styles.statusCompleted};
      case 'overdue': return {...styles.statusBadge, ...styles.statusOverdue};
      default: return {...styles.statusBadge, ...styles.statusActive};
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q) setQuery(q);
    
    setLoading(false);
  }, [location.search]);

  // Initialize edit form when modal opens
  useEffect(() => {
    if (modal.client && modal.mode === 'edit') {
      setEditForm({ ...modal.client });
    }
  }, [modal.client, modal.mode]);

  // Calculate client statistics
  const clientStats = useMemo(() => {
    const totalClients = localClients.length;
    const activeClients = localClients.filter(c => c.status === 'active').length;
    const overdueClients = localClients.filter(c => {
      if (!c.projectDeadline) return false;
      return new Date(c.projectDeadline) < new Date() && c.status !== 'completed';
    }).length;
    const unassignedClients = localClients.filter(c => !c.teamId).length;
    const totalRevenue = localClients.reduce((sum, client) => {
      const clientInvoices = invoices.filter(inv => inv.clientId === client.id);
      return sum + clientInvoices.reduce((invSum, inv) => invSum + (parseFloat(inv.amount) || 0), 0);
    }, 0);

    return {
      totalClients,
      activeClients,
      overdueClients,
      unassignedClients,
      totalRevenue
    };
  }, [localClients, invoices]);

  // Enhanced filtering logic
  const visibleClients = useMemo(() => {
    let list = [...localClients];

    if (!user) {
      return [];
    }

    // Filter by user role
    if (user.role !== 'admin') {
      const myTeamIds = teams.filter(t => Array.isArray(t.members) && t.members.includes(user.email)).map(t => t.id);
      list = list.filter(c => c.teamId && myTeamIds.includes(c.teamId));
    }

    // Ensure status exists
    list = list.map(c => ({
      ...c, 
      status: c.status || 'active',
      projectDeadline: c.projectDeadline || '',
      budget: c.budget || 0,
      currency: c.currency || 'USD',
      installments: c.installments || 1,
      serviceType: c.serviceType || 'General Services',
      paymentNote: c.paymentNote || '',
      notes: c.notes || ''
    }));
    
    // Apply filters
    if (filter === 'active') list = list.filter(c => c.status === 'active');
    if (filter === 'completed') list = list.filter(c => c.status === 'completed');
    if (filter === 'overdue') list = list.filter(c => {
      if (!c.projectDeadline) return false;
      return new Date(c.projectDeadline) < new Date() && c.status !== 'completed';
    });
    if (filter === 'unassigned') list = list.filter(c => !c.teamId);
    if (filter === 'service') list = list.filter(c => c.serviceType && c.serviceType !== 'General Services');
    
    return list;
  }, [localClients, teams, user, filter]);

  const filtered = visibleClients.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    (c.email || '').toLowerCase().includes(query.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(query.toLowerCase()) ||
    (c.serviceType || '').toLowerCase().includes(query.toLowerCase())
  );

  // Prepare table data with proper values (not objects)
  const tableData = filtered.map(c => {
    // Days left calculation
    let daysLeft = '';
    let daysLeftValue = 0;
    let isOverdue = false;
    
    if (c.projectDeadline) {
      const deadline = new Date(c.projectDeadline);
      const today = new Date();
      const d = Math.ceil((deadline - today) / (1000*60*60*24));
      daysLeftValue = d;
      isOverdue = d < 0;
      daysLeft = isOverdue ? `${Math.abs(d)} days overdue` : `${d} days`;
    }

    // Payment summary
    const clientInvoices = invoices.filter(inv => inv.clientId === c.id);
    let paymentSummary = '';
    if (clientInvoices.length > 0) {
      const totalAmount = clientInvoices.reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
      const paidAmount = clientInvoices.reduce((acc, inv) => {
        const paidPayments = inv.payments?.filter(p => p.status === 'done') || [];
        return acc + paidPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
      }, 0);
      paymentSummary = `${c.currency} ${paidAmount.toFixed(0)} / ${totalAmount.toFixed(0)}`;
    } else {
      paymentSummary = 'No invoices';
    }

    // Team assignment
    let team = '-';
    if (c.teamId) {
      const t = teams.find(t => t.id === c.teamId);
      team = t ? t.name : '-';
    }

    // Determine actual status (overrides if overdue)
    const actualStatus = isOverdue ? 'overdue' : c.status;

    // Return simple values instead of objects
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      company: c.company,
      projectDeadline: c.projectDeadline ? new Date(c.projectDeadline).toLocaleDateString() : '-',
      daysLeft: daysLeft,
      daysLeftWarning: isOverdue || daysLeftValue <= 7,
      status: actualStatus,
      statusStyle: getStatusStyle(actualStatus),
      paymentSummary: paymentSummary,
      team: team,
      serviceType: c.serviceType,
      budget: c.budget,
      // Keep original data for actions
      originalData: c
    };
  });

  // Enhanced columns for table - FIXED: Use simple keys
  const columns = [
    { key: 'name', label: 'Client Name', width: '200px' },
    { key: 'email', label: 'Email', width: '220px' },
    { key: 'phone', label: 'Contact', width: '150px' },
    { key: 'company', label: 'Company', width: '180px' },
    { key: 'projectDeadline', label: 'Deadline', width: '120px' },
    { key: 'daysLeft', label: 'Days Left', width: '120px' },
    { key: 'status', label: 'Status', width: '120px' },
    { key: 'paymentSummary', label: 'Payment', width: '140px' },
    { key: 'team', label: 'Team', width: '120px' },
  ];

  // Enhanced actions for table
  const actions = {
    view: (client) => setModal({ open: true, client: client.originalData, mode: 'view' }),
    edit: (client) => setModal({ open: true, client: client.originalData, mode: 'edit' }),
    delete: (client) => {
      if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
        // Update local state
        setLocalClients(prev => prev.filter(c => c.id !== client.id));
        addNotification({
          title: 'Client Deleted',
          message: `${client.name} has been removed from the system`,
          category: 'success'
        });
      }
    },
    assign: user?.role === 'admin' ? (client) => (
      <select 
        value={client.originalData.teamId || ''} 
        onChange={(e) => {
          const newTeamId = e.target.value;
          // Update local state
          setLocalClients(prev => prev.map(c => 
            c.id === client.id ? { ...c, teamId: newTeamId } : c
          ));
          addNotification({
            title: 'Team Assigned',
            message: `${client.name} assigned to ${teams.find(t => t.id === newTeamId)?.name || 'No Team'}`,
            category: 'success'
          });
        }}
        style={{
          padding: '12px 16px',
          borderRadius: '12px',
          border: '2px solid #e2e8f0',
          background: '#ffffff',
          fontSize: '13px',
          minWidth: '160px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
      >
        <option value="">— Select Team —</option>
        {teams.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
    ) : null
  };

  const handleSaveEdit = () => {
    if (editForm.name && editForm.email) {
      // Update local state
      setLocalClients(prev => prev.map(c => 
        c.id === editForm.id ? editForm : c
      ));
      addNotification({
        title: 'Client Updated',
        message: `${editForm.name} has been updated successfully`,
        category: 'success'
      });
      setModal({ open: false, client: null, mode: 'view' });
    } else {
      addNotification({
        title: 'Validation Error',
        message: 'Name and email are required fields',
        category: 'error'
      });
    }
  };

  const handleCreateInvoice = (client) => {
    navigate('/invoices', { state: { prefillClient: client } });
    addNotification({
      title: 'Create Invoice',
      message: `Redirecting to create invoice for ${client.name}`,
      category: 'info'
    });
  };

  const handleAddDummyClient = () => {
    const newClient = {
      id: `CLI-${Date.now()}`,
      name: `New Client ${localClients.length + 1}`,
      email: `client${localClients.length + 1}@example.com`,
      phone: '+1 (555) 000-0000',
      company: 'Example Company Inc',
      projectDeadline: '2024-12-31',
      status: 'active',
      budget: 50000,
      currency: 'USD',
      installments: 3,
      serviceType: 'Web Development',
      paymentNote: 'Standard payment terms apply',
      attachments: [],
      teamId: null,
      notes: 'New client added to the system',
      createdAt: new Date().toISOString()
    };

    setLocalClients(prev => [...prev, newClient]);

    addNotification({
      title: 'Client Added',
      message: `${newClient.name} has been added to the system`,
      category: 'success'
    });
  };

  const handleClearAllClients = () => {
    if (window.confirm('Are you sure you want to clear all clients? This will reset to the default dummy data.')) {
      setLocalClients(dummyClients);
      addNotification({
        title: 'Clients Reset',
        message: 'All clients have been reset to default data',
        category: 'info'
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Client Management</h1>
          <div style={styles.subtitle}>Manage and track all your client relationships</div>
        </div>
        <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
          <button 
            onClick={handleAddDummyClient}
            style={{...styles.button, ...styles.successButton}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
          >
            ⚡ Quick Add Client
          </button>
          <button 
            onClick={() => navigate('/clients/add')} 
            style={{...styles.button, ...styles.primaryButton}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
          >
            👥 Add New Client
          </button>
          <button 
            onClick={handleClearAllClients}
            style={{...styles.button, ...styles.secondaryButton}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
          >
            🔄 Reset Data
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        {[
          { 
            label: 'Total Clients', 
            value: clientStats.totalClients, 
            color: '#3b82f6', 
            bgColor: '#dbeafe',
            icon: '👥',
            description: 'All clients in system'
          },
          { 
            label: 'Active Projects', 
            value: clientStats.activeClients, 
            color: '#10b981', 
            bgColor: '#dcfce7',
            icon: '🚀',
            description: 'Currently working'
          },
          { 
            label: 'Overdue', 
            value: clientStats.overdueClients, 
            color: '#ef4444', 
            bgColor: '#fef2f2',
            icon: '⏰',
            description: 'Past deadline'
          },
          { 
            label: 'Total Revenue', 
            value: `$${clientStats.totalRevenue.toLocaleString()}`, 
            color: '#8b5cf6', 
            bgColor: '#f3e8ff',
            icon: '💰',
            description: 'From all clients'
          }
        ].map((stat, index) => (
          <div 
            key={index}
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{...styles.statIcon, background: stat.bgColor, color: stat.color}}>
              {stat.icon}
            </div>
            <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
            <div style={{fontSize: '13px', color: '#94a3b8', marginTop: '12px', fontWeight: 500}}>
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      <FilterBar filters={filtersList} active={filter} onChange={setFilter} />

      <input 
        placeholder="🔍 Search clients by name, email, company, or service..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        style={styles.searchInput}
        onFocus={(e) => e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)'}
        onBlur={(e) => e.target.style.backgroundImage = 'linear-gradient(white, white), linear-gradient(135deg, #e2e8f0, #e2e8f0)'}
      />

      <div style={styles.contentCard}>
        {loading ? (
          <div style={styles.emptyState}>
            <div>Loading clients...</div>
          </div>
        ) : tableData.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{fontSize: '80px', marginBottom: '24px', opacity: 0.5}}>👥</div>
            <div style={styles.emptyStateTitle}>No clients found</div>
            <div style={{marginBottom: '32px', color: '#64748b', fontSize: '16px', maxWidth: '400px', margin: '0 auto 32px'}}>
              {filter === 'all' 
                ? 'Get started by adding your first client or use the quick add button to add sample data.' 
                : `No clients match the "${filtersList.find(f => f.value === filter)?.label}" filter`
              }
            </div>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button 
                onClick={handleAddDummyClient}
                style={{...styles.button, ...styles.successButton}}
              >
                ⚡ Add Sample Client
              </button>
              <button 
                onClick={() => navigate('/clients/add')} 
                style={{...styles.button, ...styles.primaryButton}}
              >
                👥 Add New Client
              </button>
              <button 
                onClick={() => setFilter('all')} 
                style={{...styles.button, ...styles.secondaryButton}}
              >
                🔄 Show All Clients
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <ClientTable 
              columns={columns} 
              data={tableData} 
              actions={actions}
              enhancedStyle={true}
            />
          </div>
        )}
      </div>

      <ModalPopup 
        open={modal.open} 
        onClose={() => setModal({ open: false, client: null, mode: 'view' })}
        title={modal.client ? `${modal.client.name} - ${modal.mode === 'view' ? 'Details' : 'Edit'}` : ''}
        size="extra-large"
        sticky={true}
        maxWidth="1200px"
      >
        {modal.client && modal.mode === 'view' && (
          <div style={styles.modalContent}>
            <div style={styles.modalSection}>
              <div style={styles.modalLabel}>Contact Information</div>
              <div style={styles.modalValue}>
                <strong>Email:</strong> {modal.client.email || 'Not provided'}
              </div>
              <div style={styles.modalValue}>
                <strong>Phone:</strong> {modal.client.phone || 'Not provided'}
              </div>
              <div style={styles.modalValue}>
                <strong>Company:</strong> {modal.client.company || 'Not provided'}
              </div>
            </div>

            <div style={styles.modalSection}>
              <div style={styles.modalLabel}>Project Details</div>
              <div style={styles.modalValue}>
                <strong>Deadline:</strong> {modal.client.projectDeadline ? new Date(modal.client.projectDeadline).toLocaleDateString() : 'Not set'}
              </div>
              <div style={styles.modalValue}>
                <strong>Budget:</strong> {modal.client.currency} {modal.client.budget ? modal.client.budget.toLocaleString() : '0'}
              </div>
              <div style={styles.modalValue}>
                <strong>Installments:</strong> {modal.client.installments || 1}
              </div>
              <div style={styles.modalValue}>
                <strong>Service Type:</strong> {modal.client.serviceType || 'General Services'}
              </div>
              <div style={{marginTop: '20px'}}>
                <span style={getStatusStyle(modal.client.status)}>
                  {modal.client.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div style={styles.modalSection}>
              <div style={styles.modalLabel}>Team Assignment</div>
              <div style={styles.modalValue}>
                {teams.find(t => t.id === modal.client.teamId)?.name || 'Unassigned'}
              </div>
            </div>

            <div style={styles.modalSection}>
              <div style={styles.modalLabel}>Payment Notes</div>
              <div style={{...styles.modalValue, background: '#f0f9ff', padding: '24px', borderRadius: '16px', border: '1px solid #bae6fd', fontSize: '16px', lineHeight: '1.6'}}>
                {modal.client.paymentNote || 'No payment notes provided'}
              </div>
            </div>

            <div style={styles.modalSection}>
              <div style={styles.modalLabel}>Additional Notes</div>
              <div style={{...styles.modalValue, whiteSpace: 'pre-wrap', background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '16px', lineHeight: '1.6'}}>
                {modal.client.notes || 'No additional notes provided'}
              </div>
            </div>

            <div style={styles.actionButtons}>
              <button 
                style={{...styles.button, ...styles.primaryButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={() => setModal({ ...modal, mode: 'edit' })}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                ✏️ Edit Client
              </button>
              <button 
                style={{...styles.button, ...styles.successButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={() => handleCreateInvoice(modal.client)}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                🧾 Create Invoice
              </button>
              <button 
                style={{...styles.button, ...styles.dangerButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={() => {
                  if (window.confirm(`Delete ${modal.client.name}? This action cannot be undone.`)) {
                    // Update local state
                    setLocalClients(prev => prev.filter(c => c.id !== modal.client.id));
                    addNotification({
                      title: 'Client Deleted',
                      message: `${modal.client.name} has been removed`,
                      category: 'success'
                    });
                    setModal({ open: false, client: null, mode: 'view' });
                  }
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                🗑️ Delete Client
              </button>
              <button 
                style={{...styles.button, ...styles.secondaryButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={() => setModal({ open: false, client: null, mode: 'view' })}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                ✕ Close
              </button>
            </div>
          </div>
        )}

        {modal.client && modal.mode === 'edit' && (
          <div style={styles.modalContent}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Client Name *</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Company</label>
                <input
                  type="text"
                  value={editForm.company || ''}
                  onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Project Deadline</label>
                <input
                  type="date"
                  value={editForm.projectDeadline || ''}
                  onChange={(e) => setEditForm({...editForm, projectDeadline: e.target.value})}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Status</label>
                <select
                  value={editForm.status || 'active'}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  style={styles.select}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Budget</label>
                <input
                  type="number"
                  value={editForm.budget || ''}
                  onChange={(e) => setEditForm({...editForm, budget: parseFloat(e.target.value) || 0})}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Currency</label>
                <select
                  value={editForm.currency || 'USD'}
                  onChange={(e) => setEditForm({...editForm, currency: e.target.value})}
                  style={styles.select}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="PKR">PKR</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Service Type</label>
              <input
                type="text"
                value={editForm.serviceType || ''}
                onChange={(e) => setEditForm({...editForm, serviceType: e.target.value})}
                style={styles.input}
                placeholder="e.g., Web Development, Design, Consulting"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Payment Notes</label>
              <textarea
                value={editForm.paymentNote || ''}
                onChange={(e) => setEditForm({...editForm, paymentNote: e.target.value})}
                style={styles.textarea}
                placeholder="Payment terms and conditions..."
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Additional Notes</label>
              <textarea
                value={editForm.notes || ''}
                onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                style={styles.textarea}
                placeholder="Client notes, requirements, special instructions..."
              />
            </div>

            <div style={styles.actionButtons}>
              <button 
                style={{...styles.button, ...styles.primaryButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={handleSaveEdit}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                💾 Save Changes
              </button>
              <button 
                style={{...styles.button, ...styles.secondaryButton, padding: '18px 36px', fontSize: '16px'}}
                onClick={() => setModal({ ...modal, mode: 'view' })}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                ↩️ Cancel
              </button>
            </div>
          </div>
        )}
      </ModalPopup>
    </div>
  );
};

export default Clients;