import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContextValue';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Reports = () => {
  const { clients, teams, invoices, expenses, addNotification } = useAppContext();
  const [selectedReport, setSelectedReport] = useState('client');
  const [selectedClient, setSelectedClient] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(false);

  // Enhanced styles with premium design
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
    contentCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
      marginBottom: '20px'
    },
    reportGrid: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '24px'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    reportOption: {
      padding: '16px',
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    },
    reportOptionActive: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6',
      transform: 'translateX(4px)'
    },
    reportOptionHover: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6',
      transform: 'translateX(4px)'
    },
    reportIcon: {
      fontSize: '24px',
      marginBottom: '8px'
    },
    reportTitle: {
      fontSize: '16px',
      fontWeight: 600,
      margin: '0 0 4px 0'
    },
    reportDescription: {
      fontSize: '12px',
      opacity: 0.8,
      margin: 0
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      background: '#ffffff'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      background: '#ffffff',
      transition: 'all 0.2s ease'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
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
    successButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    previewSection: {
      marginTop: '24px',
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    previewTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '16px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#1e293b',
      margin: '8px 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    reportSummary: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '16px'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f1f5f9'
    },
    summaryLabel: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: 500
    },
    summaryValue: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1e293b'
    },
    positiveValue: {
      color: '#10b981'
    },
    negativeValue: {
      color: '#ef4444'
    }
  };

  // Report types with configurations
  const reportTypes = [
    {
      id: 'client',
      title: 'Client Report',
      description: 'Detailed client information and project history',
      icon: '👤',
      color: '#3b82f6'
    },
    {
      id: 'financial',
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      icon: '💰',
      color: '#10b981'
    },
    {
      id: 'team',
      title: 'Team Performance',
      description: 'Team workload and client assignments',
      icon: '👥',
      color: '#f59e0b'
    },
    {
      id: 'invoice',
      title: 'Invoice Report',
      description: 'Invoice status and payment tracking',
      icon: '🧾',
      color: '#8b5cf6'
    },
    {
      id: 'comprehensive',
      title: 'Comprehensive Report',
      description: 'Complete agency overview and analytics',
      icon: '📊',
      color: '#ec4899'
    }
  ];

  // Calculate report statistics
  const reportStats = useMemo(() => {
    const totalClients = clients.length;
    const totalTeams = teams.length;
    const totalInvoices = invoices.length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const netProfit = totalRevenue - totalExpenses;
    const paidInvoices = invoices.filter(inv => 
      inv.payments?.every(p => p.status === 'done')
    ).length;

    return {
      totalClients,
      totalTeams,
      totalInvoices,
      totalRevenue,
      totalExpenses,
      netProfit,
      paidInvoices,
      collectionRate: totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0
    };
  }, [clients, teams, invoices, expenses]);

  // Generate comprehensive PDF report
  const generatePDFReport = async (reportType, clientId = null) => {
    setLoading(true);
    let tempDiv = null;

    try {
      tempDiv = document.createElement('div');
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '40px';
      tempDiv.style.background = '#ffffff';
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(tempDiv);

      // const reportDate = new Date().toLocaleDateString();
      const selectedReportConfig = reportTypes.find(r => r.id === reportType);
      
      let reportContent = '';

      switch(reportType) {
        case 'client':
          reportContent = await generateClientReport(clientId, tempDiv);
          break;
        case 'financial':
          reportContent = generateFinancialReport(tempDiv);
          break;
        case 'team':
          reportContent = generateTeamReport(tempDiv);
          break;
        case 'invoice':
          reportContent = generateInvoiceReport(tempDiv);
          break;
        case 'comprehensive':
          reportContent = generateComprehensiveReport(tempDiv);
          break;
        default:
          reportContent = generateComprehensiveReport(tempDiv);
      }

      tempDiv.innerHTML = reportContent;

      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `${selectedReportConfig.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      addNotification({
        title: 'Report Generated',
        message: `${selectedReportConfig.title} has been downloaded successfully`,
        category: 'success'
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      addNotification({
        title: 'Report Generation Failed',
        message: 'There was an error generating the report. Please try again.',
        category: 'error'
      });
    } finally {
      setLoading(false);
      if (tempDiv && tempDiv.parentNode) {
        tempDiv.parentNode.removeChild(tempDiv);
      }
    }
  };

  // Client Report Generator
  const generateClientReport = async (clientId) => {
    const client = clients.find(c => c.id === clientId) || clients[0];
    const clientInvoices = invoices.filter(inv => inv.clientId === clientId);
    const clientTeam = teams.find(t => t.id === client.teamId);

    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #3b82f6; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <h1 style="color: #3b82f6; margin: 0; font-size: 32px; font-weight: bold;">Client Report</h1>
          <p style="color: #64748b; margin: 8px 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Client Information -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Client Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h3 style="color: #374151; margin-bottom: 12px;">Personal Details</h3>
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${client.name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${client.email}</p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> ${client.phone || 'Not provided'}</p>
                <p style="margin: 8px 0;"><strong>Company:</strong> ${client.company || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <h3 style="color: #374151; margin-bottom: 12px;">Project Details</h3>
              <div style="background: #f0f9ff; padding: 16px; border-radius: 8px;">
                <p style="margin: 8px 0;"><strong>Service Type:</strong> ${client.serviceType || 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Project Deadline:</strong> ${client.projectDeadline ? new Date(client.projectDeadline).toLocaleDateString() : 'Not set'}</p>
                <p style="margin: 8px 0;"><strong>Budget:</strong> ${client.budget ? `${client.currency} ${client.budget}` : 'Not specified'}</p>
                <p style="margin: 8px 0;"><strong>Status:</strong> ${client.status || 'Active'}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Assignment -->
        ${clientTeam ? `
          <div style="margin-bottom: 40px;">
            <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Team Assignment</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
              <p style="margin: 8px 0;"><strong>Assigned Team:</strong> ${clientTeam.name}</p>
              <p style="margin: 8px 0;"><strong>Department:</strong> ${clientTeam.department || 'Not specified'}</p>
              <p style="margin: 8px 0;"><strong>Team Members:</strong> ${clientTeam.members?.join(', ') || 'No members'}</p>
            </div>
          </div>
        ` : ''}

        <!-- Invoice History -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Invoice History</h2>
          ${clientInvoices.length === 0 ? 
            '<p style="color: #64748b; text-align: center; padding: 20px;">No invoices found for this client</p>' :
            `
            <table style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: #3b82f6;">
                  <th style="padding: 12px; color: white; text-align: left;">Invoice ID</th>
                  <th style="padding: 12px; color: white; text-align: right;">Amount</th>
                  <th style="padding: 12px; color: white; text-align: center;">Status</th>
                  <th style="padding: 12px; color: white; text-align: center;">Due Date</th>
                </tr>
              </thead>
              <tbody>
                ${clientInvoices.map(invoice => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${invoice.id}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: right;">${invoice.currency} ${parseFloat(invoice.amount).toFixed(2)}</td>
                    <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
                      <span style="padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; 
                        background: ${invoice.payments?.every(p => p.status === 'done') ? '#dcfce7' : '#fef3c7'}; 
                        color: ${invoice.payments?.every(p => p.status === 'done') ? '#166534' : '#92400e'};">
                        ${invoice.payments?.every(p => p.status === 'done') ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">${new Date(invoice.dueDate).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            `
          }
        </div>

        <!-- Summary -->
        <div style="background: #1e293b; color: white; padding: 20px; border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; color: white;">Report Summary</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <p style="margin: 4px 0;"><strong>Total Invoices:</strong> ${clientInvoices.length}</p>
              <p style="margin: 4px 0;"><strong>Paid Invoices:</strong> ${clientInvoices.filter(inv => inv.payments?.every(p => p.status === 'done')).length}</p>
            </div>
            <div>
              <p style="margin: 4px 0;"><strong>Total Amount:</strong> ${client.currency} ${clientInvoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0).toFixed(2)}</p>
              <p style="margin: 4px 0;"><strong>Outstanding:</strong> ${client.currency} ${clientInvoices.filter(inv => !inv.payments?.every(p => p.status === 'done')).reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Financial Report Generator
  const generateFinancialReport = () => {
    const totalRevenue = reportStats.totalRevenue;
    const totalExpenses = reportStats.totalExpenses;
    const netProfit = reportStats.netProfit;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #10b981; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <h1 style="color: #10b981; margin: 0; font-size: 32px; font-weight: bold;">Financial Report</h1>
          <p style="color: #64748b; margin: 8px 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Financial Overview -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Financial Overview</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 8px 0;">Total Revenue</h3>
              <p style="font-size: 24px; font-weight: bold; color: #0369a1; margin: 0;">$${totalRevenue.toLocaleString()}</p>
            </div>
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #dc2626; margin: 0 0 8px 0;">Total Expenses</h3>
              <p style="font-size: 24px; font-weight: bold; color: #dc2626; margin: 0;">$${totalExpenses.toLocaleString()}</p>
            </div>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #059669; margin: 0 0 8px 0;">Net Profit</h3>
              <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">$${netProfit.toLocaleString()}</p>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1e293b;">
              Profit Margin: <span style="color: ${profitMargin >= 0 ? '#059669' : '#dc2626'}">${profitMargin.toFixed(1)}%</span>
            </p>
          </div>
        </div>

        <!-- Recent Invoices -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Recent Invoices</h2>
          ${invoices.slice(0, 10).map(invoice => {
            const client = clients.find(c => c.id === invoice.clientId);
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 6px; margin-bottom: 8px;">
                <div>
                  <p style="margin: 0; font-weight: 600; color: #1e293b;">${client?.name || 'Unknown Client'}</p>
                  <p style="margin: 0; font-size: 12px; color: #64748b;">${invoice.id} • Due: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0; font-weight: 600; color: #1e293b;">${invoice.currency} ${parseFloat(invoice.amount).toFixed(2)}</p>
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    ${invoice.payments?.every(p => p.status === 'done') ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Expense Breakdown -->
        <div>
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Expense Breakdown</h2>
          ${expenses.slice(0, 10).map(expense => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border-radius: 6px; margin-bottom: 8px;">
              <div>
                <p style="margin: 0; font-weight: 600; color: #1e293b;">${expense.title}</p>
                <p style="margin: 0; font-size: 12px; color: #64748b;">${expense.category} • ${new Date(expense.createdAt).toLocaleDateString()}</p>
              </div>
              <p style="margin: 0; font-weight: 600; color: #dc2626;">-$${parseFloat(expense.amount).toFixed(2)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Team Report Generator
  const generateTeamReport = () => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #f59e0b; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <h1 style="color: #f59e0b; margin: 0; font-size: 32px; font-weight: bold;">Team Performance Report</h1>
          <p style="color: #64748b; margin: 8px 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Team Overview -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Team Overview</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 8px 0;">Total Teams</h3>
              <p style="font-size: 24px; font-weight: bold; color: #0369a1; margin: 0;">${teams.length}</p>
            </div>
            <div style="background: #fffbeb; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #d97706; margin: 0 0 8px 0;">Team Members</h3>
              <p style="font-size: 24px; font-weight: bold; color: #d97706; margin: 0;">${teams.reduce((sum, team) => sum + (team.members?.length || 0), 0)}</p>
            </div>
          </div>
        </div>

        <!-- Team Details -->
        <div>
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Team Details</h2>
          ${teams.map(team => {
            const teamClients = clients.filter(client => client.teamId === team.id);
            return `
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid ${team.color || '#f59e0b'};">
                <h3 style="color: #1e293b; margin: 0 0 8px 0;">${team.name}</h3>
                <p style="color: #64748b; margin: 0 0 12px 0;">${team.department} • ${team.members?.length || 0} members</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Assigned Clients:</strong> ${teamClients.length}</p>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Team Lead:</strong> ${team.teamLead || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p style="margin: 4px 0; font-size: 14px;"><strong>Skills:</strong> ${team.skills?.slice(0, 3).join(', ') || 'None'}</p>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  // Invoice Report Generator
  const generateInvoiceReport = () => {
    const paidInvoices = invoices.filter(inv => inv.payments?.every(p => p.status === 'done'));
    const pendingInvoices = invoices.filter(inv => !inv.payments?.every(p => p.status === 'done'));
    const totalPendingAmount = pendingInvoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);

    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #8b5cf6; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <h1 style="color: #8b5cf6; margin: 0; font-size: 32px; font-weight: bold;">Invoice Report</h1>
          <p style="color: #64748b; margin: 8px 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Invoice Statistics -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Invoice Statistics</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 8px 0;">Total Invoices</h3>
              <p style="font-size: 24px; font-weight: bold; color: #0369a1; margin: 0;">${invoices.length}</p>
            </div>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #059669; margin: 0 0 8px 0;">Paid Invoices</h3>
              <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${paidInvoices.length}</p>
            </div>
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #d97706; margin: 0 0 8px 0;">Pending Amount</h3>
              <p style="font-size: 24px; font-weight: bold; color: #d97706; margin: 0;">$${totalPendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <!-- Invoice List -->
        <div>
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Recent Invoices</h2>
          ${invoices.slice(0, 15).map(invoice => {
            const client = clients.find(c => c.id === invoice.clientId);
            const isPaid = invoice.payments?.every(p => p.status === 'done');
            return `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid ${isPaid ? '#10b981' : '#f59e0b'};">
                <div style="flex: 1;">
                  <p style="margin: 0 0 4px 0; font-weight: 600; color: #1e293b;">${client?.name || 'Unknown Client'}</p>
                  <p style="margin: 0; font-size: 12px; color: #64748b;">${invoice.id} • ${invoice.projectType || 'General Service'}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0 0 4px 0; font-weight: 600; color: #1e293b;">${invoice.currency} ${parseFloat(invoice.amount).toFixed(2)}</p>
                  <p style="margin: 0; font-size: 12px; color: #64748b;">
                    <span style="padding: 2px 8px; border-radius: 12px; font-weight: 600; background: ${isPaid ? '#dcfce7' : '#fef3c7'}; color: ${isPaid ? '#166534' : '#92400e'};">
                      ${isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  // Comprehensive Report Generator
  const generateComprehensiveReport = () => {
    return `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #ec4899; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <h1 style="color: #ec4899; margin: 0; font-size: 32px; font-weight: bold;">Comprehensive Agency Report</h1>
          <p style="color: #64748b; margin: 8px 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Executive Summary -->
        <div style="margin-bottom: 40px;">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Executive Summary</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #0369a1; margin: 0 0 8px 0;">Total Clients</h3>
              <p style="font-size: 24px; font-weight: bold; color: #0369a1; margin: 0;">${reportStats.totalClients}</p>
            </div>
            <div style="background: #fffbeb; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #d97706; margin: 0 0 8px 0;">Active Teams</h3>
              <p style="font-size: 24px; font-weight: bold; color: #d97706; margin: 0;">${reportStats.totalTeams}</p>
            </div>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #059669; margin: 0 0 8px 0;">Total Revenue</h3>
              <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">$${reportStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #dc2626; margin: 0 0 8px 0;">Net Profit</h3>
              <p style="font-size: 24px; font-weight: bold; color: #dc2626; margin: 0;">$${reportStats.netProfit.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <!-- Additional sections would go here for comprehensive report -->
        <div style="text-align: center; padding: 40px; background: #f8fafc; border-radius: 8px;">
          <p style="color: #64748b; margin: 0; font-size: 16px;">
            This comprehensive report includes detailed analytics across all agency operations.
            For full detailed analysis, please generate specific reports for each department.
          </p>
        </div>
      </div>
    `;
  };

  const handleGenerateReport = () => {
    if (selectedReport === 'client' && !selectedClient) {
      addNotification({
        title: 'Selection Required',
        message: 'Please select a client for the client report',
        category: 'warning'
      });
      return;
    }

    generatePDFReport(selectedReport, selectedClient);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Reports & Analytics</h1>
          <div style={styles.subtitle}>Generate comprehensive reports and business insights</div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Clients</div>
          <div style={styles.statValue}>{reportStats.totalClients}</div>
          <div style={{fontSize: '12px', color: '#3b82f6'}}>Active in system</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Revenue</div>
          <div style={{...styles.statValue, color: '#10b981'}}>${reportStats.totalRevenue.toLocaleString()}</div>
          <div style={{fontSize: '12px', color: '#10b981'}}>All-time earnings</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Net Profit</div>
          <div style={{...styles.statValue, color: reportStats.netProfit >= 0 ? '#10b981' : '#ef4444'}}>
            ${reportStats.netProfit.toLocaleString()}
          </div>
          <div style={{fontSize: '12px', color: reportStats.netProfit >= 0 ? '#10b981' : '#ef4444'}}>
            {reportStats.netProfit >= 0 ? 'Profit' : 'Loss'}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Collection Rate</div>
          <div style={{...styles.statValue, color: '#8b5cf6'}}>{reportStats.collectionRate.toFixed(1)}%</div>
          <div style={{fontSize: '12px', color: '#8b5cf6'}}>Invoice payments</div>
        </div>
      </div>

      <div style={styles.reportGrid}>
        {/* Report Type Selection */}
        <div style={styles.sidebar}>
          {reportTypes.map(report => (
            <button
              key={report.id}
              style={{
                ...styles.reportOption,
                ...(selectedReport === report.id ? styles.reportOptionActive : {})
              }}
              onClick={() => setSelectedReport(report.id)}
              onMouseEnter={(e) => selectedReport !== report.id && (e.target.style = {...styles.reportOption, ...styles.reportOptionHover})}
              onMouseLeave={(e) => selectedReport !== report.id && (e.target.style = styles.reportOption)}
            >
              <div style={styles.reportIcon}>{report.icon}</div>
              <div style={styles.reportTitle}>{report.title}</div>
              <div style={styles.reportDescription}>{report.description}</div>
            </button>
          ))}
        </div>

        {/* Report Configuration */}
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px', color: '#1e293b'}}>
            {reportTypes.find(r => r.id === selectedReport)?.title} Configuration
          </h3>

          <div style={styles.formGrid}>
            {/* Client Selection for Client Report */}
            {selectedReport === 'client' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Client *</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => e.target.style = {...styles.select, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.select}
                >
                  <option value="">Choose a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} {client.company ? `(${client.company})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Range for All Reports */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                style={styles.input}
                onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                onBlur={(e) => e.target.style = styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                style={styles.input}
                onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                onBlur={(e) => e.target.style = styles.input}
              />
            </div>
          </div>

          {/* Report Summary */}
          <div style={styles.previewSection}>
            <div style={styles.previewTitle}>Report Summary</div>
            <div style={styles.reportSummary}>
              <div style={styles.summaryItem}>
                <div style={styles.summaryLabel}>Report Type</div>
                <div style={styles.summaryValue}>
                  {reportTypes.find(r => r.id === selectedReport)?.title}
                </div>
              </div>
              {selectedReport === 'client' && selectedClient && (
                <div style={styles.summaryItem}>
                  <div style={styles.summaryLabel}>Selected Client</div>
                  <div style={styles.summaryValue}>
                    {clients.find(c => c.id === selectedClient)?.name}
                  </div>
                </div>
              )}
              <div style={styles.summaryItem}>
                <div style={styles.summaryLabel}>Date Range</div>
                <div style={styles.summaryValue}>
                  {dateRange.start && dateRange.end 
                    ? `${new Date(dateRange.start).toLocaleDateString()} - ${new Date(dateRange.end).toLocaleDateString()}`
                    : 'All time'
                  }
                </div>
              </div>
              <div style={styles.summaryItem}>
                <div style={styles.summaryLabel}>Estimated Pages</div>
                <div style={styles.summaryValue}>3-5 pages</div>
              </div>
            </div>
          </div>

          {/* Generate Report Button */}
          <button
            onClick={handleGenerateReport}
            disabled={loading || (selectedReport === 'client' && !selectedClient)}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...((loading || (selectedReport === 'client' && !selectedClient)) && { opacity: 0.6, cursor: 'not-allowed' })
            }}
            onMouseEnter={(e) => !loading && selectedReport !== 'client' || selectedClient && (e.target.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => !loading && selectedReport !== 'client' || selectedClient && (e.target.style.transform = 'none')}
          >
            {loading ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Generating Report...
              </>
            ) : (
              <>
                📊 Generate PDF Report
              </>
            )}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Reports;