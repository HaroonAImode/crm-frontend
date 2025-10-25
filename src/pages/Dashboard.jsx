import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

export default function Dashboard() {
  const { clients, teams, invoices, expenses, addNotification } = useAppContext();
  const navigate = useNavigate();

  // Mock data for charts and analytics
  const revenueData = [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 75, 95];
  const expenseData = [28, 48, 40, 19, 86, 27, 90, 45, 60, 35, 50, 70];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Calculate metrics
  const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const netProfit = totalRevenue - totalExpenses;
  const activeProjects = clients.filter(client => client.status === 'active').length;
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue').length;

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
      marginBottom: '24px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1e293b',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '4px'
    },
    row: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    card: {
      flex: 1,
      background: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
      minWidth: '200px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    },
    cardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
    },
    metricLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px'
    },
    metricValue: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '4px'
    },
    metricChange: {
      fontSize: '12px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    positiveChange: {
      color: '#10b981'
    },
    negativeChange: {
      color: '#ef4444'
    },
    actions: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px'
    },
    button: {
      padding: '10px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: 600,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: '#f8fafc',
      color: '#475569',
      border: '1px solid #e2e8f0'
    },
    chartContainer: {
      background: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
      marginBottom: '20px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '16px'
    },
    quickActions: {
      background: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9'
    },
    actionButton: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: 'none',
      background: '#f8fafc',
      color: '#475569',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '10px',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    recentActivity: {
      background: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    activityIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 600
    },
    activityContent: {
      flex: 1
    },
    activityTitle: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#1e293b',
      margin: 0
    },
    activityTime: {
      fontSize: '12px',
      color: '#64748b'
    }
  };

  // Mock recent activities
  const recentActivities = [
    { type: 'invoice', title: 'New invoice created', time: '2 minutes ago', color: '#10b981' },
    { type: 'client', title: 'Client ABC updated profile', time: '1 hour ago', color: '#3b82f6' },
    { type: 'payment', title: 'Payment received from XYZ Corp', time: '3 hours ago', color: '#8b5cf6' },
    { type: 'expense', title: 'New expense recorded', time: '5 hours ago', color: '#f59e0b' }
  ];

  // Simple bar chart component
  const BarChart = ({ data, labels, color }) => {
    const maxValue = Math.max(...data);
    
    return (
      <div style={{ display: 'flex', alignItems: 'end', gap: '8px', height: '200px', padding: '20px 0' }}>
        {data.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div
              style={{
                height: `${(value / maxValue) * 100}%`,
                background: `linear-gradient(to top, ${color}80, ${color})`,
                width: '100%',
                borderRadius: '4px 4px 0 0',
                minHeight: '4px'
              }}
            />
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>{labels[index]}</div>
          </div>
        ))}
      </div>
    );
  };

  // Simple line chart component
  const LineChart = ({ data, labels, color }) => {
    const maxValue = Math.max(...data);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div style={{ height: '200px', position: 'relative', padding: '20px 0' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
          />
          {/* Add circles at data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={color}
              />
            );
          })}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          {labels.map((label, index) => (
            <div key={index} style={{ fontSize: '10px', color: '#64748b' }}>{label}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard Overview</h1>
          <div style={styles.subtitle}>Welcome back! Here's what's happening today.</div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            style={{...styles.button, ...styles.secondaryButton}}
            onClick={() => addNotification({ title: 'Data Refreshed', category: 'success', message: 'Dashboard data has been updated' })}
          >
            Refresh Data
          </button>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onClick={() => navigate('/reports')}
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div style={styles.row}>
        <div 
          style={styles.card} 
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <div style={styles.metricLabel}>Total Revenue</div>
          <div style={styles.metricValue}>${totalRevenue.toLocaleString()}</div>
          <div style={{...styles.metricChange, ...styles.positiveChange}}>
            ↑ 12.5% from last month
          </div>
          <div style={styles.actions}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/invoices')}
            >
              View Invoices
            </button>
          </div>
        </div>

        <div 
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <div style={styles.metricLabel}>Active Clients</div>
          <div style={styles.metricValue}>{clients.length}</div>
          <div style={{...styles.metricChange, ...styles.positiveChange}}>
            ↑ {activeProjects} active projects
          </div>
          <div style={styles.actions}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/clients')}
            >
              Manage Clients
            </button>
          </div>
        </div>

        <div 
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <div style={styles.metricLabel}>Team Members</div>
          <div style={styles.metricValue}>{teams.length}</div>
          <div style={{...styles.metricChange, ...styles.positiveChange}}>
            ↑ 2 new this quarter
          </div>
          <div style={styles.actions}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/teams')}
            >
              View Team
            </button>
          </div>
        </div>

        <div 
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
        >
          <div style={styles.metricLabel}>Net Profit</div>
          <div style={styles.metricValue}>${netProfit.toLocaleString()}</div>
          <div style={{...styles.metricChange, ...(netProfit >= 0 ? styles.positiveChange : styles.negativeChange)}}>
            {netProfit >= 0 ? '↑' : '↓'} {Math.abs((netProfit / totalRevenue) * 100).toFixed(1)}% margin
          </div>
          <div style={styles.actions}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate('/reports')}
            >
              View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Charts and Additional Metrics */}
      <div style={styles.row}>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Revenue Chart */}
          <div style={styles.chartContainer}>
            <div style={styles.chartTitle}>Revenue Overview</div>
            <LineChart data={revenueData} labels={months} color="#3b82f6" />
          </div>

          {/* Additional Metrics */}
          <div style={styles.statsGrid}>
            <div style={styles.card}>
              <div style={styles.metricLabel}>Pending Invoices</div>
              <div style={styles.metricValue}>{pendingInvoices}</div>
              <div style={{...styles.metricChange, ...styles.negativeChange}}>
                ${(pendingInvoices * 1500).toLocaleString()} total value
              </div>
            </div>
            
            <div style={styles.card}>
              <div style={styles.metricLabel}>Overdue Invoices</div>
              <div style={{...styles.metricValue, color: '#ef4444'}}>{overdueInvoices}</div>
              <div style={{...styles.metricChange, ...styles.negativeChange}}>
                Requires immediate attention
              </div>
            </div>
            
            <div style={styles.card}>
              <div style={styles.metricLabel}>Active Projects</div>
              <div style={styles.metricValue}>{activeProjects}</div>
              <div style={{...styles.metricChange, ...styles.positiveChange}}>
                On track for delivery
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <h3 style={styles.chartTitle}>Quick Actions</h3>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/clients/add')}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
            >
              <span>👤</span> Add New Client
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/invoices/create')}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
            >
              <span>🧾</span> Create Invoice
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/teams')}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
            >
              <span>👥</span> Manage Team
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => navigate('/reports')}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
            >
              <span>📊</span> View Reports
            </button>
            <button 
              style={styles.actionButton}
              onClick={() => addNotification({ 
                title: 'Quick Note', 
                category: 'info', 
                message: 'Quick action completed successfully' 
              })}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f8fafc'}
            >
              <span>🔔</span> Test Notification
            </button>
          </div>

          {/* Recent Activity */}
          <div style={styles.recentActivity}>
            <h3 style={styles.chartTitle}>Recent Activity</h3>
            {recentActivities.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <div style={{...styles.activityIcon, background: `${activity.color}20`, color: activity.color}}>
                  {activity.type === 'invoice' ? '🧾' : 
                   activity.type === 'client' ? '👤' : 
                   activity.type === 'payment' ? '💳' : '💰'}
                </div>
                <div style={styles.activityContent}>
                  <div style={styles.activityTitle}>{activity.title}</div>
                  <div style={styles.activityTime}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense Chart */}
      <div style={styles.chartContainer}>
        <div style={styles.chartTitle}>Expense Analysis</div>
        <BarChart data={expenseData} labels={months} color="#ef4444" />
      </div>
    </div>
  );
}