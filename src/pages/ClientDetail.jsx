import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, teams, invoices, addNotification } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Enhanced styles with premium design - FIXED STYLING ISSUES
  const styles = {
    container: {
      padding: '24px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '32px',
      padding: '32px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)'
    },
    titleSection: {
      flex: 1
    },
    title: {
      fontSize: '36px',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0 0 12px 0',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#64748b',
      margin: '0 0 16px 0',
      fontWeight: 500,
      letterSpacing: '0.2px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    },
    button: {
      padding: '16px 28px',
      borderRadius: '14px',
      border: 'none',
      fontWeight: 700,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      letterSpacing: '0.3px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.3)'
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
    contentCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      border: '1px solid rgba(255,255,255,0.8)',
      marginBottom: '24px',
      backdropFilter: 'blur(10px)'
    },
    tabContainer: {
      display: 'flex',
      marginBottom: '32px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '16px',
      padding: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      border: '1px solid rgba(255,255,255,0.8)'
    },
    tab: {
      padding: '16px 28px',
      background: 'none',
      border: 'none',
      fontSize: '15px',
      fontWeight: 600,
      color: '#64748b',
      cursor: 'pointer',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      flex: 1,
      textAlign: 'center'
    },
    activeTab: {
      color: '#3b82f6',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    infoCard: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '28px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.8)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    label: {
      fontSize: '13px',
      fontWeight: 700,
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '16px'
    },
    value: {
      fontSize: '16px',
      color: '#1e293b',
      fontWeight: 500,
      marginBottom: '12px',
      lineHeight: '1.5'
    },
    largeValue: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '12px',
      letterSpacing: '-0.3px'
    },
    statusBadge: {
      padding: '10px 20px',
      borderRadius: '24px',
      fontSize: '12px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      display: 'inline-block'
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
    invoiceTable: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    },
    tableCell: {
      padding: '16px 20px',
      textAlign: 'left',
      borderBottom: '1px solid #f1f5f9'
    },
    progressBar: {
      width: '100%',
      height: '10px',
      background: '#e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      marginTop: '12px'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      transition: 'width 0.5s ease',
      borderRadius: '8px'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '20px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    activityIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      fontWeight: 600,
      flexShrink: 0
    },
    activityContent: {
      flex: 1
    },
    activityTitle: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 4px 0',
      lineHeight: '1.4'
    },
    activityTime: {
      fontSize: '13px',
      color: '#64748b',
      fontWeight: 500
    },
    emptyState: {
      padding: '60px 40px',
      textAlign: 'center',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#475569'
    }
  };

  // Enhanced fallback client data with better dummy data
  const client = clients.find((c) => c.id === id) || {
    id: id,
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
    notes: 'Enterprise client with complex requirements. Requires regular updates and meetings. Very responsive and provides clear feedback.',
    createdAt: '2024-01-15'
  };

  const team = teams.find(t => t.id === client.teamId);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);
  }, [id]);

  // Enhanced mock invoices data
  const clientInvoices = invoices.filter(inv => inv.clientId === client.id).length > 0 
    ? invoices.filter(inv => inv.clientId === client.id)
    : [
        {
          id: 'INV-001',
          clientId: client.id,
          amount: 18750,
          status: 'paid',
          createdAt: '2024-01-15',
          dueDate: '2024-02-15',
          items: [{ description: 'Project Advance (25%)', amount: 18750 }]
        },
        {
          id: 'INV-002',
          clientId: client.id,
          amount: 18750,
          status: 'paid',
          createdAt: '2024-03-01',
          dueDate: '2024-04-01',
          items: [{ description: 'Milestone 1 Completion', amount: 18750 }]
        },
        {
          id: 'INV-003',
          clientId: client.id,
          amount: 18750,
          status: 'pending',
          createdAt: '2024-05-15',
          dueDate: '2024-06-15',
          items: [{ description: 'Milestone 2 Progress', amount: 18750 }]
        },
        {
          id: 'INV-004',
          clientId: client.id,
          amount: 18750,
          status: 'pending',
          createdAt: '2024-07-01',
          dueDate: '2024-08-01',
          items: [{ description: 'Final Delivery', amount: 18750 }]
        }
      ];

  // Enhanced activities with more realistic data
  const activities = [
    { type: 'invoice', title: 'Invoice INV-003 sent to client', time: '2 hours ago', color: '#3b82f6' },
    { type: 'meeting', title: 'Weekly progress review meeting completed', time: '1 day ago', color: '#8b5cf6' },
    { type: 'update', title: 'Project requirements updated based on client feedback', time: '3 days ago', color: '#f59e0b' },
    { type: 'invoice', title: 'Invoice INV-002 marked as paid', time: '1 week ago', color: '#10b981' },
    { type: 'communication', title: 'Client provided positive feedback on latest deliverable', time: '2 weeks ago', color: '#06b6d4' },
    { type: 'milestone', title: 'Project milestone 1 completed successfully', time: '3 weeks ago', color: '#84cc16' }
  ];

  const downloadReport = () => {
    const html = `<!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Client Report - ${client.name}</title>
      <style>
        body{font-family: Inter, sans-serif; padding:32px; background: #f8fafc;}
        .report-container{max-width:800px; margin:0 auto; background:white; padding:40px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.08);}
        h1{color:#1e293b; margin-bottom:8px;}
        .subtitle{color:#64748b; margin-bottom:32px;}
        .section{margin-bottom:32px;}
        .section-title{font-size:18px; font-weight:600; color:#1e293b; margin-bottom:16px; padding-bottom:8px; border-bottom:2px solid #3b82f6;}
        .grid{display:grid; grid-template-columns:1fr 1fr; gap:20px;}
        .info-item{margin-bottom:12px;}
        .label{font-size:12px; font-weight:600; color:#64748b; textTransform:uppercase; margin-bottom:4px;}
        .value{font-size:16px; color:#1e293b; font-weight:500;}
        table{width:100%; border-collapse:collapse; margin-top:16px;}
        th,td{padding:12px 16px; text-align:left; border-bottom:1px solid #e2e8f0;}
        th{background:#f8fafc; font-weight:600; color:#475569;}
        .status-paid{background:#dcfce7; color:#166534; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600;}
        .status-pending{background:#fef3c7; color:#92400e; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:600;}
        .footer{margin-top:40px; padding-top:20px; border-top:1px solid #e2e8f0; color:#64748b; font-size:12px;}
      </style>
    </head>
    <body>
      <div class="report-container">
        <h1>Client Report: ${client.name}</h1>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString()}</div>
        
        <div class="section">
          <div class="section-title">Client Information</div>
          <div class="grid">
            <div class="info-item">
              <div class="label">Email</div>
              <div class="value">${client.email || '-'}</div>
            </div>
            <div class="info-item">
              <div class="label">Phone</div>
              <div class="value">${client.phone || '-'}</div>
            </div>
            <div class="info-item">
              <div class="label">Company</div>
              <div class="value">${client.company || '-'}</div>
            </div>
            <div class="info-item">
              <div class="label">Assigned Team</div>
              <div class="value">${team ? team.name : '—'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Project Details</div>
          <div class="grid">
            <div class="info-item">
              <div class="label">Service Type</div>
              <div class="value">${client.serviceType || '-'}</div>
            </div>
            <div class="info-item">
              <div class="label">Project Deadline</div>
              <div class="value">${client.projectDeadline || '-'}</div>
            </div>
            <div class="info-item">
              <div class="label">Budget</div>
              <div class="value">${client.budget} ${client.currency}</div>
            </div>
            <div class="info-item">
              <div class="label">Installments</div>
              <div class="value">${client.installments}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Invoice History</div>
          ${clientInvoices.length === 0 ? '<div>No invoices found</div>' : `
            <table>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                ${clientInvoices.map(inv => `
                  <tr>
                    <td>${inv.id}</td>
                    <td>${inv.amount} ${client.currency}</td>
                    <td><span class="status-${inv.status}">${inv.status}</span></td>
                    <td>${new Date(inv.dueDate).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `}
        </div>

        <div class="footer">
          Report generated by CRM System • ${new Date().toLocaleString()}
        </div>
      </div>
    </body>
    </html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-${client.name}-report-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);

    addNotification({
      title: 'Report Downloaded',
      message: `Client report for ${client.name} has been downloaded`,
      category: 'success'
    });
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'active': return {...styles.statusBadge, ...styles.statusActive};
      case 'completed': return {...styles.statusBadge, ...styles.statusCompleted};
      case 'overdue': return {...styles.statusBadge, ...styles.statusOverdue};
      default: return {...styles.statusBadge, ...styles.statusActive};
    }
  };

  const getInvoiceStatusStyle = (status) => {
    switch(status) {
      case 'paid': return {...styles.statusBadge, ...styles.statusCompleted};
      case 'pending': return {...styles.statusBadge, ...styles.statusActive};
      default: return {...styles.statusBadge, ...styles.statusActive};
    }
  };

  const totalInvoiceAmount = clientInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = clientInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const progressPercentage = totalInvoiceAmount > 0 ? (paidAmount / totalInvoiceAmount) * 100 : 0;

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.contentCard}>
          <div style={{textAlign: 'center', padding: '60px', color: '#64748b', fontSize: '16px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>⏳</div>
            Loading client details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <h1 style={styles.title}>{client.name}</h1>
          <p style={styles.subtitle}>{client.company} • {client.serviceType}</p>
          <div style={{...getStatusStyle(client.status), marginTop: '12px'}}>
            {client.status.toUpperCase()}
          </div>
        </div>
        <div style={styles.buttonGroup}>
          <button 
            onClick={downloadReport}
            style={{...styles.button, ...styles.secondaryButton}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'none'}
          >
            📊 Download Report
          </button>
          <button 
            onClick={() => navigate('/clients')}
            style={{...styles.button, ...styles.secondaryButton}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'none'}
          >
            ← Back to Clients
          </button>
        </div>
      </div>

      <div style={styles.tabContainer}>
        {['overview', 'invoices', 'activity', 'documents'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div>
          <div style={styles.grid}>
            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div style={styles.label}>Contact Information</div>
              <div style={styles.value}>
                <strong>Email:</strong><br />{client.email}
              </div>
              <div style={styles.value}>
                <strong>Phone:</strong><br />{client.phone}
              </div>
              <div style={styles.value}>
                <strong>Company:</strong><br />{client.company}
              </div>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div style={styles.label}>Project Details</div>
              <div style={styles.value}>
                <strong>Deadline:</strong><br />
                {client.projectDeadline ? new Date(client.projectDeadline).toLocaleDateString() : 'Not set'}
              </div>
              <div style={styles.largeValue}>{client.budget.toLocaleString()} {client.currency}</div>
              <div style={styles.value}>{client.installments} installments</div>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div style={styles.label}>Team Assignment</div>
              <div style={styles.largeValue}>{team ? team.name : 'Unassigned'}</div>
              <div style={styles.value}>
                {team ? `${team.members?.length || 0} team members` : 'No team assigned'}
              </div>
            </div>

            <div 
              style={styles.infoCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              <div style={styles.label}>Payment Progress</div>
              <div style={styles.largeValue}>
                {paidAmount.toLocaleString()} / {totalInvoiceAmount.toLocaleString()} {client.currency}
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${progressPercentage}%`}}></div>
              </div>
              <div style={{...styles.value, color: '#10b981', fontWeight: 700}}>
                {Math.round(progressPercentage)}% paid
              </div>
            </div>
          </div>

          <div style={styles.contentCard}>
            <div style={styles.label}>Project Notes</div>
            <div style={{
              whiteSpace: 'pre-wrap', 
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
              padding: '24px', 
              borderRadius: '12px', 
              marginTop: '16px',
              border: '1px solid #e2e8f0',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#475569'
            }}>
              {client.notes || 'No additional notes provided.'}
            </div>
          </div>

          <div style={styles.contentCard}>
            <div style={styles.label}>Payment Instructions</div>
            <div style={{
              whiteSpace: 'pre-wrap', 
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
              padding: '24px', 
              borderRadius: '12px', 
              marginTop: '16px',
              border: '1px solid #bae6fd',
              fontSize: '15px',
              lineHeight: '1.6',
              color: '#0369a1',
              fontWeight: 500
            }}>
              {client.paymentNote || 'Standard payment terms apply.'}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '24px', color: '#1e293b', fontSize: '24px'}}>Invoice History</h3>
          {clientInvoices.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>🧾</div>
              <div style={styles.emptyStateTitle}>No invoices found</div>
              <div style={{color: '#64748b'}}>No invoices have been created for this client yet.</div>
            </div>
          ) : (
            <table style={styles.invoiceTable}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableCell}>Invoice ID</th>
                  <th style={styles.tableCell}>Amount</th>
                  <th style={styles.tableCell}>Status</th>
                  <th style={styles.tableCell}>Due Date</th>
                  <th style={styles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td style={styles.tableCell}>
                      <strong>{invoice.id}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      <strong>{invoice.amount.toLocaleString()} {client.currency}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={getInvoiceStatusStyle(invoice.status)}>
                        {invoice.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={{
                          ...styles.button, 
                          padding: '8px 16px', 
                          fontSize: '13px',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'none'}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'activity' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '24px', color: '#1e293b', fontSize: '24px'}}>Recent Activity</h3>
          {activities.map((activity, index) => (
            <div key={index} style={styles.activityItem}>
              <div style={{
                ...styles.activityIcon, 
                background: `${activity.color}15`, 
                color: activity.color,
                border: `1px solid ${activity.color}20`
              }}>
                {activity.type === 'invoice' ? '🧾' : 
                 activity.type === 'meeting' ? '📅' : 
                 activity.type === 'update' ? '✏️' : 
                 activity.type === 'communication' ? '💬' :
                 activity.type === 'milestone' ? '🎯' : '👤'}
              </div>
              <div style={styles.activityContent}>
                <div style={styles.activityTitle}>{activity.title}</div>
                <div style={styles.activityTime}>{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '24px', color: '#1e293b', fontSize: '24px'}}>Documents</h3>
          <div style={styles.emptyState}>
            <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>📁</div>
            <div style={styles.emptyStateTitle}>No documents uploaded</div>
            <div style={{color: '#64748b', marginBottom: '24px'}}>
              Upload project documents, contracts, and other files related to this client.
            </div>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              📤 Upload Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetail;