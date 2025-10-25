import React, { useState, useCallback, useMemo } from 'react';
import { useAppContext } from '../context/AppContextValue';
import ModalPopup from '../components/ModalPopup';
import FilterBar from '../components/FilterBar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const filtersList = [
  { label: 'All Invoices', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Partial', value: 'partial' },
  { label: 'This Month', value: 'month' }
];

// Default agency info
const agencyInfo = {
  name: 'Creative Agency Pro',
  address: '123 Business Avenue\nNew York, NY 10001',
  email: 'billing@creativeagency.com',
  phone: '+1 (555) 123-4567',
  website: 'www.creativeagency.com'
};

const Invoices = () => {
  const { invoices = [], addInvoice, clients = [], addNotification, updateInvoice } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null, data: null });
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    clientId: '',
    amount: '',
    currency: 'USD',
    installments: '1',
    dueDate: '',
    description: '',
    projectType: '',
    taxRate: '0',
    discount: '0',
    bankDetails: {
      accountName: 'Creative Agency Pro',
      accountNumber: 'XXXX-XXXX-XXXX-1234',
      bankName: 'Global Business Bank',
      swiftCode: 'GLBBUS33',
      routingNumber: '021000021'
    },
    instructions: 'Please make payment within 15 days of invoice date. Late payments may be subject to fees.',
    terms: 'Net 15. 1.5% monthly interest on overdue balances.'
  });

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
    textarea: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      minHeight: '80px',
      resize: 'vertical',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit'
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
    warningButton: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white'
    },
    invoiceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '20px'
    },
    invoiceCard: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },
    invoiceCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      borderColor: '#3b82f6'
    },
    invoiceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    clientInfo: {
      flex: 1
    },
    clientName: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 4px 0'
    },
    clientEmail: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    amountBadge: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#1e293b'
    },
    invoiceMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      fontSize: '13px',
      color: '#64748b'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      textTransform: 'uppercase'
    },
    statusUnpaid: {
      background: '#fef2f2',
      color: '#dc2626'
    },
    statusPaid: {
      background: '#f0fdf4',
      color: '#16a34a'
    },
    statusPartial: {
      background: '#fffbeb',
      color: '#d97706'
    },
    statusOverdue: {
      background: '#fef2f2',
      color: '#dc2626'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      background: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '12px'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      transition: 'width 0.3s ease'
    },
    progressText: {
      fontSize: '12px',
      color: '#64748b',
      textAlign: 'center',
      marginBottom: '16px'
    },
    installmentList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px'
    },
    installmentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    installmentInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    },
    installmentTitle: {
      fontSize: '13px',
      fontWeight: 600,
      color: '#1e293b'
    },
    installmentDate: {
      fontSize: '11px',
      color: '#64748b'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px'
    },
    smallButton: {
      padding: '8px 12px',
      fontSize: '12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flex: 1
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
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
    positiveAmount: {
      color: '#10b981'
    },
    negativeAmount: {
      color: '#ef4444'
    },
    warningAmount: {
      color: '#f59e0b'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
      color: '#475569'
    }
  };

  // Helper function to determine invoice status
  const getInvoiceStatus = (invoice) => {
    const paidCount = invoice.payments?.filter(p => p.status === 'done').length || 0;
    const totalCount = invoice.payments?.length || 1;
    
    if (paidCount === totalCount) return 'paid';
    if (paidCount > 0) return 'partial';
    
    const dueDate = new Date(invoice.dueDate);
    if (dueDate < new Date()) return 'overdue';
    
    return 'unpaid';
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'paid': return {...styles.statusBadge, ...styles.statusPaid};
      case 'partial': return {...styles.statusBadge, ...styles.statusPartial};
      case 'overdue': return {...styles.statusBadge, ...styles.statusOverdue};
      default: return {...styles.statusBadge, ...styles.statusUnpaid};
    }
  };

  // Calculate invoice statistics - SINGLE DEFINITION
  const invoiceStats = useMemo(() => {
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
    const paidInvoices = invoices.filter(inv => getInvoiceStatus(inv) === 'paid');
    const unpaidInvoices = invoices.filter(inv => getInvoiceStatus(inv) === 'unpaid');
    const overdueInvoices = invoices.filter(inv => getInvoiceStatus(inv) === 'overdue');
    const partialInvoices = invoices.filter(inv => getInvoiceStatus(inv) === 'partial');
    
    const paidAmount = paidInvoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);

    return {
      totalInvoices,
      totalAmount,
      paidInvoices: paidInvoices.length,
      unpaidInvoices: unpaidInvoices.length,
      overdueInvoices: overdueInvoices.length,
      partialInvoices: partialInvoices.length,
      paidAmount,
      overdueAmount,
      collectionRate: totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    };
  }, [invoices]);

  // Enhanced PDF generation with proper bank details handling
  const generateInvoicePDF = useCallback(async (invoice, client) => {
    let tempDiv = null;

    try {
      const dueDate = new Date(invoice.dueDate).toLocaleDateString();
      const invoiceDate = new Date(invoice.createdAt).toLocaleDateString();
      const taxAmount = (parseFloat(invoice.amount) * (parseFloat(invoice.taxRate) || 0) / 100);
      const discountAmount = parseFloat(invoice.discount) || 0;
      const subtotal = parseFloat(invoice.amount);
      const total = subtotal + taxAmount - discountAmount;
      const installmentAmount = (total / parseInt(invoice.installments)).toFixed(2);

      // Ensure bank details exist with fallbacks
      const bankDetails = invoice.bankDetails || {
        accountName: 'Creative Agency Pro',
        accountNumber: 'XXXX-XXXX-XXXX-1234',
        bankName: 'Global Business Bank',
        swiftCode: 'GLBBUS33',
        routingNumber: '021000021'
      };

      tempDiv = document.createElement('div');
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '40px';
      tempDiv.style.background = '#ffffff';
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(tempDiv);

      tempDiv.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #3b82f6; border-radius: 12px;">
          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
            <div>
              <h1 style="color: #3b82f6; margin: 0; font-size: 28px; font-weight: bold;">${agencyInfo.name}</h1>
              <p style="color: #64748b; margin: 5px 0; white-space: pre-line;">${agencyInfo.address}</p>
              <p style="color: #64748b; margin: 5px 0;">Tel: ${agencyInfo.phone} | Email: ${agencyInfo.email}</p>
              <p style="color: #64748b; margin: 5px 0;">Website: ${agencyInfo.website}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #1e293b; margin: 0; font-size: 24px;">INVOICE</h2>
              <p style="color: #64748b; margin: 5px 0;"><strong>Invoice #:</strong> ${invoice.id}</p>
              <p style="color: #64748b; margin: 5px 0;"><strong>Date:</strong> ${invoiceDate}</p>
              <p style="color: #64748b; margin: 5px 0;"><strong>Due Date:</strong> ${dueDate}</p>
            </div>
          </div>

          <!-- Client & Agency Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
            <div>
              <h3 style="color: #374151; margin-bottom: 10px;">Bill To:</h3>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                <p style="margin: 0; font-weight: bold; color: #1e293b;">${client.name}</p>
                <p style="margin: 5px 0; color: #64748b;">${client.email}</p>
                <p style="margin: 0; color: #64748b;">${client.phone || 'Not provided'}</p>
                ${client.company ? `<p style="margin: 5px 0; color: #64748b;">${client.company}</p>` : ''}
              </div>
            </div>
            <div>
              <h3 style="color: #374151; margin-bottom: 10px;">Project Details:</h3>
              <div style="background: #f0f9ff; padding: 15px; border-radius: 8px;">
                <p style="margin: 0; color: #0369a1;"><strong>Service:</strong> ${invoice.projectType || 'Professional Services'}</p>
                <p style="margin: 5px 0; color: #0369a1;"><strong>Description:</strong> ${invoice.description || 'Project deliverables and services'}</p>
              </div>
            </div>
          </div>

          <!-- Amount Breakdown -->
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f8fafc; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #3b82f6;">
                <th style="padding: 15px; text-align: left; color: white; font-weight: bold;">Description</th>
                <th style="padding: 15px; text-align: right; color: white; font-weight: bold;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0;">Project Fee</td>
                <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">${invoice.currency} ${subtotal.toFixed(2)}</td>
              </tr>
              ${discountAmount > 0 ? `
                <tr>
                  <td style="padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0;">Discount</td>
                  <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">-${invoice.currency} ${discountAmount.toFixed(2)}</td>
                </tr>
              ` : ''}
              ${taxAmount > 0 ? `
                <tr>
                  <td style="padding: 15px; text-align: left; border-bottom: 1px solid #e2e8f0;">Tax (${invoice.taxRate}%)</td>
                  <td style="padding: 15px; text-align: right; border-bottom: 1px solid #e2e8f0;">${invoice.currency} ${taxAmount.toFixed(2)}</td>
                </tr>
              ` : ''}
              <tr style="background: #1e293b;">
                <td style="padding: 15px; text-align: left; color: white; font-weight: bold; font-size: 16px;">TOTAL</td>
                <td style="padding: 15px; text-align: right; color: white; font-weight: bold; font-size: 16px;">${invoice.currency} ${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <!-- Payment Schedule -->
          <div style="margin: 30px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">Payment Schedule (${invoice.installments} Installments)</h3>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
              ${Array(parseInt(invoice.installments)).fill(0).map((_, i) => {
                const installmentDue = new Date(invoice.dueDate);
                installmentDue.setDate(installmentDue.getDate() + (i * 30)); // 30 days between installments
                return `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: ${i < invoice.installments - 1 ? '1px solid #e2e8f0' : 'none'};">
                    <span style="color: #374151;">Installment ${i + 1}</span>
                    <span style="font-weight: bold; color: #1e293b;">${invoice.currency} ${installmentAmount}</span>
                    <span style="color: #64748b;">Due: ${installmentDue.toLocaleDateString()}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Bank Details -->
          <div style="margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 8px; color: white;">
            <h3 style="margin: 0 0 15px 0; color: white;">Payment Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 5px 0;"><strong>Bank Name:</strong><br>${bankDetails.bankName}</p>
                <p style="margin: 5px 0;"><strong>Account Name:</strong><br>${bankDetails.accountName}</p>
              </div>
              <div>
                <p style="margin: 5px 0;"><strong>Account Number:</strong><br>${bankDetails.accountNumber}</p>
                <p style="margin: 5px 0;"><strong>SWIFT Code:</strong><br>${bankDetails.swiftCode}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
              <div>
                <h4 style="color: #374151; margin-bottom: 10px;">Payment Instructions</h4>
                <p style="color: #64748b; margin: 0; line-height: 1.5;">${invoice.instructions}</p>
              </div>
              <div>
                <h4 style="color: #374151; margin-bottom: 10px;">Terms & Conditions</h4>
                <p style="color: #64748b; margin: 0; line-height: 1.5;">${invoice.terms}</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 30px; padding: 15px; background: #f8fafc; border-radius: 8px;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Thank you for your business! Please contact us if you have any questions.
              </p>
            </div>
          </div>
        </div>
      `;

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
      
      const cleanClientName = (client.name || 'invoice').replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const dateStr = new Date().toISOString().split('T')[0];
      pdf.save(`invoice-${cleanClientName}-${dateStr}.pdf`);

      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    } finally {
      if (tempDiv && tempDiv.parentNode) {
        tempDiv.parentNode.removeChild(tempDiv);
      }
    }
  }, []);

  const handleDownloadPDF = async (invoice) => {
    setLoading(true);
    try {
      const client = clients.find(c => c.id === invoice.clientId);
      if (!client) {
        throw new Error('Client not found');
      }
      await generateInvoicePDF(invoice, client);
      addNotification({
        title: 'PDF Generated',
        message: `Invoice for ${client.name} has been downloaded`,
        category: 'success'
      });
    } catch (error) {
      console.error('Error:', error);
      addNotification({
        title: 'PDF Generation Failed',
        message: error.message,
        category: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.clientId || !form.amount || !form.dueDate) {
      addNotification({
        title: 'Validation Error',
        message: 'Client, amount, and due date are required',
        category: 'error'
      });
      return;
    }

    const client = clients.find(c => c.id === form.clientId);
    const subtotal = parseFloat(form.amount);
    const taxAmount = subtotal * (parseFloat(form.taxRate) || 0) / 100;
    const discountAmount = parseFloat(form.discount) || 0;
    const total = subtotal + taxAmount - discountAmount;

    const invoice = {
      ...form,
      id: `INV-${Date.now()}`,
      amount: total,
      subtotal: subtotal,
      taxAmount: taxAmount,
      discountAmount: discountAmount,
      createdAt: new Date().toISOString(),
      status: 'unpaid',
      payments: Array(parseInt(form.installments)).fill(null).map((_, index) => ({
        number: index + 1,
        amount: (total / parseInt(form.installments)).toFixed(2),
        dueDate: new Date(new Date(form.dueDate).getTime() + (index * 30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 days apart
        status: 'pending',
        proofImage: null,
        paidDate: null
      }))
    };

    // Show preview modal
    setModal({
      open: true,
      type: 'preview',
      data: {
        invoice,
        client,
        onConfirm: () => {
          addInvoice(invoice);
          addNotification({
            title: 'Invoice Created',
            message: `New invoice created for ${client.name}`,
            category: 'success'
          });
          
          // Reset form
          setForm({
            clientId: '',
            amount: '',
            currency: 'USD',
            installments: '1',
            dueDate: '',
            description: '',
            projectType: '',
            taxRate: '0',
            discount: '0',
            bankDetails: {
              accountName: 'Creative Agency Pro',
              accountNumber: 'XXXX-XXXX-XXXX-1234',
              bankName: 'Global Business Bank',
              swiftCode: 'GLBBUS33',
              routingNumber: '021000021'
            },
            instructions: 'Please make payment within 15 days of invoice date. Late payments may be subject to fees.',
            terms: 'Net 15. 1.5% monthly interest on overdue balances.'
          });
          
          setModal({ open: false, type: null, data: null });
        }
      }
    });
  };

  const markPaymentAsPaid = (invoice, paymentIndex) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPayments = [...invoice.payments];
          newPayments[paymentIndex] = {
            ...newPayments[paymentIndex],
            status: 'done',
            proofImage: e.target?.result,
            paidDate: new Date().toISOString()
          };
          
          const updatedInvoice = { ...invoice, payments: newPayments };
          updateInvoice(updatedInvoice);
          
          addNotification({
            title: 'Payment Recorded',
            message: `Installment ${paymentIndex + 1} marked as paid for ${clients.find(c => c.id === invoice.clientId)?.name}`,
            category: 'success'
          });

          // Check if all payments are now paid
          if (newPayments.every(p => p.status === 'done')) {
            addNotification({
              title: 'Invoice Fully Paid!',
              message: `All installments have been paid for ${clients.find(c => c.id === invoice.clientId)?.name}`,
              category: 'success'
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const filteredInvoices = useMemo(() => {
    let filtered = invoices;
    
    switch(filter) {
      case 'unpaid':
        filtered = filtered.filter(inv => getInvoiceStatus(inv) === 'unpaid');
        break;
      case 'paid':
        filtered = filtered.filter(inv => getInvoiceStatus(inv) === 'paid');
        break;
      case 'overdue':
        filtered = filtered.filter(inv => getInvoiceStatus(inv) === 'overdue');
        break;
      case 'partial':
        filtered = filtered.filter(inv => getInvoiceStatus(inv) === 'partial');
        break;
      case 'month': {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        filtered = filtered.filter(inv => {
          const invDate = new Date(inv.createdAt);
          return invDate.getMonth() === thisMonth && invDate.getFullYear() === thisYear;
        });
        break;
      }
      default:
        // 'all' - no filter
        break;
    }
    
    return filtered;
  }, [invoices, filter]);

  const projectTypes = [
    'Web Development', 'Mobile App', 'UI/UX Design', 'Digital Marketing',
    'SEO Optimization', 'Branding', 'Consulting', 'Content Creation',
    'Social Media', 'E-commerce', 'Software Development', 'Other'
  ];

  // Show empty state if no invoices
  if (!loading && (!invoices || invoices.length === 0)) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Invoice Management</h1>
            <div style={styles.subtitle}>Create, track, and manage client invoices</div>
          </div>
        </div>
        <div style={styles.contentCard}>
          <div style={styles.emptyState}>
            <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>🧾</div>
            <div style={styles.emptyStateTitle}>No Invoices Yet</div>
            <div style={{marginBottom: '20px', color: '#64748b'}}>
              Get started by creating your first invoice for a client
            </div>
            <button
              onClick={() => setModal({ open: true, type: 'create', data: null })}
              style={{...styles.button, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              🧾 Create Your First Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Invoice Management</h1>
          <div style={styles.subtitle}>Create, track, and manage client invoices</div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Invoices</div>
          <div style={styles.statValue}>{invoiceStats.totalInvoices}</div>
          <div style={{fontSize: '12px', color: '#3b82f6'}}>${invoiceStats.totalAmount.toLocaleString()} total</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Paid Invoices</div>
          <div style={{...styles.statValue, ...styles.positiveAmount}}>{invoiceStats.paidInvoices}</div>
          <div style={{fontSize: '12px', color: '#10b981'}}>${invoiceStats.paidAmount.toLocaleString()} collected</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Overdue</div>
          <div style={{...styles.statValue, ...styles.negativeAmount}}>{invoiceStats.overdueInvoices}</div>
          <div style={{fontSize: '12px', color: '#ef4444'}}>${invoiceStats.overdueAmount.toLocaleString()} pending</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Collection Rate</div>
          <div style={{...styles.statValue, ...styles.positiveAmount}}>{invoiceStats.collectionRate.toFixed(1)}%</div>
          <div style={{fontSize: '12px', color: '#10b981'}}>Of total amount</div>
        </div>
      </div>

      <FilterBar filters={filtersList} active={filter} onChange={setFilter} />

      <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
        {/* Invoice Creation Form */}
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px'}}>Create New Invoice</h3>
          <form onSubmit={submit}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Client *
                  <select
                    value={form.clientId}
                    onChange={(e) => setForm({...form, clientId: e.target.value})}
                    style={styles.select}
                    required
                  >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} {client.company ? `(${client.company})` : ''}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Amount *
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({...form, amount: e.target.value})}
                    style={styles.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Currency
                  <select
                    value={form.currency}
                    onChange={(e) => setForm({...form, currency: e.target.value})}
                    style={styles.select}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="PKR">PKR (₨)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Installments
                  <select
                    value={form.installments}
                    onChange={(e) => setForm({...form, installments: e.target.value})}
                    style={styles.select}
                  >
                    <option value="1">1 (One-time)</option>
                    <option value="2">2 (Two installments)</option>
                    <option value="3">3 (Three installments)</option>
                    <option value="4">4 (Four installments)</option>
                    <option value="6">6 (Six installments)</option>
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Due Date *
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({...form, dueDate: e.target.value})}
                    style={styles.input}
                    required
                  />
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Project Type
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({...form, projectType: e.target.value})}
                    style={styles.select}
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Tax Rate (%)
                  <input
                    type="number"
                    value={form.taxRate}
                    onChange={(e) => setForm({...form, taxRate: e.target.value})}
                    style={styles.input}
                    placeholder="0"
                    step="0.1"
                    min="0"
                    max="50"
                  />
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Discount Amount
                  <input
                    type="number"
                    value={form.discount}
                    onChange={(e) => setForm({...form, discount: e.target.value})}
                    style={styles.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </label>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Description
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  style={styles.textarea}
                  placeholder="Describe the work or services provided..."
                />
              </label>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Payment Instructions
                <textarea
                  value={form.instructions}
                  onChange={(e) => setForm({...form, instructions: e.target.value})}
                  style={styles.textarea}
                  placeholder="Payment instructions for the client..."
                />
              </label>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Terms & Conditions
                <textarea
                  value={form.terms}
                  onChange={(e) => setForm({...form, terms: e.target.value})}
                  style={styles.textarea}
                  placeholder="Terms and conditions for this invoice..."
                />
              </label>
            </div>

            <button
              type="submit"
              style={{...styles.button, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Invoice'}
            </button>
          </form>
        </div>

        {/* Invoices List */}
        <div>
          <div style={styles.contentCard}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{margin: 0}}>All Invoices ({filteredInvoices.length})</h3>
              <div style={{fontSize: '14px', color: '#64748b'}}>
                Filtered by: {filtersList.find(f => f.value === filter)?.label}
              </div>
            </div>

            {filteredInvoices.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>🔍</div>
                <div style={styles.emptyStateTitle}>No Invoices Found</div>
                <div style={{color: '#64748b'}}>
                  {filter === 'all' 
                    ? 'Create your first invoice to get started'
                    : `No ${filtersList.find(f => f.value === filter)?.label.toLowerCase()} invoices found`
                  }
                </div>
              </div>
            ) : (
              <div style={styles.invoiceGrid}>
                {filteredInvoices.map((invoice) => {
                  const client = clients.find(c => c.id === invoice.clientId);
                  const status = getInvoiceStatus(invoice);
                  const paidPayments = invoice.payments?.filter(p => p.status === 'done').length || 0;
                  const totalPayments = invoice.payments?.length || 1;
                  const progress = (paidPayments / totalPayments) * 100;

                  if (!client) return null;

                  return (
                    <div
                      key={invoice.id}
                      style={styles.invoiceCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = styles.invoiceCardHover.boxShadow;
                        e.currentTarget.style.borderColor = styles.invoiceCardHover.borderColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = styles.invoiceCard.boxShadow;
                        e.currentTarget.style.borderColor = styles.invoiceCard.borderColor;
                      }}
                    >
                      <div style={styles.invoiceHeader}>
                        <div style={styles.clientInfo}>
                          <h4 style={styles.clientName}>{client.name}</h4>
                          <p style={styles.clientEmail}>{client.email}</p>
                          {client.company && (
                            <p style={{...styles.clientEmail, marginTop: '2px'}}>{client.company}</p>
                          )}
                        </div>
                        <div style={styles.amountBadge}>
                          {invoice.currency} {parseFloat(invoice.amount).toFixed(2)}
                        </div>
                      </div>

                      <div style={styles.invoiceMeta}>
                        <div>
                          <div style={{fontSize: '12px', color: '#64748b'}}>Due: {new Date(invoice.dueDate).toLocaleDateString()}</div>
                          <div style={{fontSize: '11px', color: '#94a3b8'}}>#{invoice.id}</div>
                        </div>
                        <div style={getStatusStyle(status)}>
                          {status}
                        </div>
                      </div>

                      {invoice.payments && invoice.payments.length > 1 && (
                        <>
                          <div style={styles.progressBar}>
                            <div 
                              style={{
                                ...styles.progressFill,
                                width: `${progress}%`,
                                background: status === 'overdue' ? '#ef4444' : styles.progressFill.background
                              }}
                            />
                          </div>
                          <div style={styles.progressText}>
                            {paidPayments} of {totalPayments} installments paid ({progress.toFixed(0)}%)
                          </div>
                        </>
                      )}

                      {invoice.payments && (
                        <div style={styles.installmentList}>
                          {invoice.payments.slice(0, 3).map((payment, index) => (
                            <div key={index} style={styles.installmentItem}>
                              <div style={styles.installmentInfo}>
                                <div style={styles.installmentTitle}>
                                  Installment {payment.number} - {invoice.currency} {payment.amount}
                                </div>
                                <div style={styles.installmentDate}>
                                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                                  {payment.paidDate && ` • Paid: ${new Date(payment.paidDate).toLocaleDateString()}`}
                                </div>
                              </div>
                              {payment.status !== 'done' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markPaymentAsPaid(invoice, index);
                                  }}
                                  style={{
                                    ...styles.smallButton,
                                    ...styles.successButton,
                                    padding: '6px 12px',
                                    fontSize: '11px'
                                  }}
                                >
                                  Mark Paid
                                </button>
                              )}
                            </div>
                          ))}
                          {invoice.payments.length > 3 && (
                            <div style={{...styles.installmentItem, justifyContent: 'center', background: 'transparent', border: 'none'}}>
                              <span style={{fontSize: '12px', color: '#64748b'}}>
                                +{invoice.payments.length - 3} more installments
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => handleDownloadPDF(invoice)}
                          style={{
                            ...styles.smallButton,
                            ...styles.secondaryButton
                          }}
                          disabled={loading}
                        >
                          📄 PDF
                        </button>
                        <button
                          onClick={() => {
                            setModal({
                              open: true,
                              type: 'details',
                              data: { invoice, client }
                            });
                          }}
                          style={{
                            ...styles.smallButton,
                            ...styles.secondaryButton
                          }}
                        >
                          👁️ Details
                        </button>
                        {status !== 'paid' && (
                          <button
                            onClick={() => {
                              // Mark all as paid
                              const newPayments = invoice.payments?.map(p => ({
                                ...p,
                                status: 'done',
                                paidDate: new Date().toISOString()
                              })) || [];
                              
                              const updatedInvoice = { ...invoice, payments: newPayments };
                              updateInvoice(updatedInvoice);
                              
                              addNotification({
                                title: 'Invoice Paid',
                                message: `All installments marked as paid for ${client.name}`,
                                category: 'success'
                              });
                            }}
                            style={{
                              ...styles.smallButton,
                              ...styles.successButton
                            }}
                          >
                            ✅ Mark All Paid
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModalPopup
        isOpen={modal.open}
        onClose={() => setModal({ open: false, type: null, data: null })}
        title={
          modal.type === 'preview' ? 'Preview Invoice' :
          modal.type === 'details' ? 'Invoice Details' :
          modal.type === 'existing_invoice' ? 'Invoice Exists' :
          'Create Invoice'
        }
      >
        {modal.type === 'preview' && modal.data && (
          <div>
            <div style={{padding: '20px', background: '#f8fafc', borderRadius: '8px', marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#1e293b'}}>Ready to Create Invoice</h4>
              <p style={{margin: '0', color: '#64748b'}}>
                This will create a new invoice for <strong>{modal.data.client.name}</strong> for {modal.data.invoice.currency} {parseFloat(modal.data.invoice.amount).toFixed(2)}
              </p>
              <div style={{marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '6px'}}>
                <h5 style={{margin: '0 0 8px 0', color: '#0369a1'}}>Invoice Details:</h5>
                <div style={{fontSize: '14px', color: '#64748b'}}>
                  <div><strong>Client:</strong> {modal.data.client.name}</div>
                  <div><strong>Amount:</strong> {modal.data.invoice.currency} {parseFloat(modal.data.invoice.amount).toFixed(2)}</div>
                  <div><strong>Installments:</strong> {modal.data.invoice.installments}</div>
                  <div><strong>Due Date:</strong> {new Date(modal.data.invoice.dueDate).toLocaleDateString()}</div>
                  <div><strong>Project:</strong> {modal.data.invoice.projectType || 'Not specified'}</div>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => setModal({ open: false, type: null, data: null })}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                Cancel
              </button>
              <button
                onClick={modal.data.onConfirm}
                style={{...styles.button, ...styles.primaryButton}}
              >
                Create Invoice
              </button>
            </div>
          </div>
        )}

        {modal.type === 'details' && modal.data && (
          <div>
            <div style={{marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 15px 0', color: '#1e293b'}}>Invoice Details</h4>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px'}}>
                <div><strong>Client:</strong> {modal.data.client.name}</div>
                <div><strong>Amount:</strong> {modal.data.invoice.currency} {parseFloat(modal.data.invoice.amount).toFixed(2)}</div>
                <div><strong>Status:</strong> <span style={getStatusStyle(getInvoiceStatus(modal.data.invoice))}>{getInvoiceStatus(modal.data.invoice)}</span></div>
                <div><strong>Due Date:</strong> {new Date(modal.data.invoice.dueDate).toLocaleDateString()}</div>
                <div><strong>Installments:</strong> {modal.data.invoice.payments?.length || 1}</div>
                <div><strong>Project:</strong> {modal.data.invoice.projectType || 'Not specified'}</div>
                <div><strong>Description:</strong> {modal.data.invoice.description || 'No description'}</div>
                <div><strong>Created:</strong> {new Date(modal.data.invoice.createdAt).toLocaleDateString()}</div>
              </div>
              
              {modal.data.invoice.payments && modal.data.invoice.payments.length > 0 && (
                <div style={{marginTop: '20px'}}>
                  <h5 style={{margin: '0 0 10px 0', color: '#1e293b'}}>Payment Schedule:</h5>
                  <div style={styles.installmentList}>
                    {modal.data.invoice.payments.map((payment, index) => (
                      <div key={index} style={styles.installmentItem}>
                        <div style={styles.installmentInfo}>
                          <div style={styles.installmentTitle}>
                            Installment {payment.number} - {modal.data.invoice.currency} {payment.amount}
                          </div>
                          <div style={styles.installmentDate}>
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                            {payment.paidDate && ` • Paid: ${new Date(payment.paidDate).toLocaleDateString()}`}
                          </div>
                        </div>
                        <div style={{
                          ...styles.statusBadge,
                          ...(payment.status === 'done' ? styles.statusPaid : styles.statusUnpaid)
                        }}>
                          {payment.status === 'done' ? 'Paid' : 'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => handleDownloadPDF(modal.data.invoice)}
                style={{...styles.button, ...styles.primaryButton}}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}

        {modal.type === 'existing_invoice' && modal.data && (
          <div>
            <div style={{padding: '20px', background: '#fffbeb', borderRadius: '8px', marginBottom: '20px', border: '1px solid #f59e0b'}}>
              <h4 style={{margin: '0 0 10px 0', color: '#92400e'}}>Invoice Already Exists</h4>
              <p style={{margin: '0', color: '#92400e'}}>
                {modal.data.client.name} already has an invoice ({modal.data.existingInvoice.id}) for {modal.data.existingInvoice.currency} {parseFloat(modal.data.existingInvoice.amount).toFixed(2)}
              </p>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
              <button
                onClick={() => setModal({ open: false, type: null, data: null })}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModal({ open: false, type: null, data: null });
                  // Optionally navigate to the existing invoice
                }}
                style={{...styles.button, ...styles.warningButton}}
              >
                View Existing Invoice
              </button>
            </div>
          </div>
        )}
      </ModalPopup>
    </div>
  );
};

export default Invoices;