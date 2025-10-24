import React, { useState } from 'react';
import { useAppContext } from '../context/AppContextValue';
import InvoiceForm from '../components/InvoiceForm';
import ModalPopup from '../components/ModalPopup';
import FilterBar from '../components/FilterBar';

const filtersList = [
  { label: 'All', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Partial', value: 'partial' },
  { label: 'By Client', value: 'client' }
];

const agencyInfo = {
  name: 'Your Agency Name',
  address: 'Your Business Address\nCity, Country',
  phone: '+1 234 567 890',
  email: 'contact@youragency.com',
  bankDetails: {
    accountName: 'Your Agency LLC',
    accountNumber: '1234567890',
    bankName: 'Your Bank Name',
    swiftCode: 'BANKCODE123'
  }
};

const generateInvoicePDF = (invoice, client, agencyInfo) => {
  const dueDate = new Date(invoice.dueDate).toLocaleDateString();
  const invoiceDate = new Date().toLocaleDateString();
  const installmentAmount = (parseFloat(invoice.amount) / invoice.installments).toFixed(2);
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #2563eb; margin: 0; }
        .header p { color: #666; margin: 5px 0; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .invoice-details div { flex: 1; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f8fafc; }
        .total { font-size: 1.2em; text-align: right; margin-top: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
        .payment-schedule { margin: 20px 0; }
        .bank-details { margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${agencyInfo.name}</h1>
        <p>${agencyInfo.address}</p>
        <p>Tel: ${agencyInfo.phone} | Email: ${agencyInfo.email}</p>
      </div>

      <div class="invoice-details">
        <div>
          <h3>Bill To:</h3>
          <p><strong>${client.name}</strong><br>
          ${client.email}<br>
          ${client.phone || ''}</p>
        </div>
        <div style="text-align: right;">
          <h2>INVOICE</h2>
          <p><strong>Invoice Date:</strong> ${invoiceDate}<br>
          <strong>Due Date:</strong> ${dueDate}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${invoice.requirements || 'Professional Services'}</td>
            <td>${invoice.amount} ${invoice.currency}</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <strong>Total Amount: ${invoice.amount} ${invoice.currency}</strong>
      </div>

      <div class="payment-schedule">
        <h3>Payment Schedule</h3>
        ${Array(invoice.installments).fill(0).map((_, i) => `
          <p>Installment ${i + 1}: ${invoice.currency} ${installmentAmount}
          ${i === 0 ? ` (Due by ${dueDate})` : ''}</p>
        `).join('')}
      </div>

      <div class="bank-details">
        <h3>Bank Details</h3>
        <p><strong>Bank Name:</strong> ${invoice.bankDetails.bankName}<br>
        <strong>Account Name:</strong> ${invoice.bankDetails.accountName}<br>
        <strong>Account Number:</strong> ${invoice.bankDetails.accountNumber}<br>
        <strong>SWIFT/BIC Code:</strong> ${invoice.bankDetails.swiftCode}</p>
      </div>

      <div class="footer">
        <p><strong>Payment Instructions:</strong><br>${invoice.instructions}</p>
        <p><strong>Note:</strong> Please include your invoice number with the payment and send proof of payment to ${agencyInfo.email}</p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${client.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

const Invoices = () => {
  const { invoices, addInvoice, clients, addNotification } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ open: false, type: null, data: null });
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(urls => {
      setForm(s => ({...s, attachments: [...s.attachments, ...urls]}));
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.clientId || !form.amount || !form.dueDate) {
      return alert('Client, amount and due date are required');
    }
    
    const client = clients.find(c => c.id === form.clientId);
    const invoice = {
      ...form,
      id: Date.now().toString(),
      amount: parseFloat(form.amount),
      createdAt: new Date().toISOString(),
      status: 'unpaid',
      payments: Array(parseInt(form.installments)).fill(null).map(() => ({
        status: 'pending',
        proofImage: null,
        date: null
      }))
    };
    
    addInvoice(invoice);
    addNotification({
      title: 'Invoice Created',
      message: `New invoice created for ${client?.name}`,
      category: 'success'
    });
    
    setForm({
      clientId: '',
      amount: '',
      currency: 'USD',
      installments: '1',
      description: '',
      dueDate: '',
      attachments: []
    });
  };

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'unpaid') return !inv.payments?.some(p => p.status === 'done');
    if (filter === 'paid') return inv.payments?.every(p => p.status === 'done');
    if (filter === 'partial') return inv.payments?.some(p => p.status === 'done') && !inv.payments?.every(p => p.status === 'done');
    if (filter === 'overdue') return new Date(inv.dueDate) < new Date() && !inv.payments?.every(p => p.status === 'done');
    return true;
  });

  const getPaymentStatus = (inv) => {
    const done = inv.payments?.filter(p => p.status === 'done').length || 0;
    const total = inv.payments?.length || 1;
    return `${done}/${total} installments paid`;
  };

  return (
    <div style={{padding: 20}}>
      <h2>Invoices</h2>
      
      <FilterBar filters={filtersList} active={filter} onChange={setFilter} />
      
      <div style={{display: 'flex', gap: 16, marginTop: 16}}>
        <form onSubmit={submit} style={{background: '#fff', padding: 12, borderRadius: 8, minWidth: 320}}>
          <div style={{marginBottom: 8}}>
            <label>Client</label>
            <select value={form.clientId} onChange={e => setForm(s=>({...s, clientId: e.target.value}))} style={{display: 'block', padding: 8, width: '100%'}}>
              <option value="">Select client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
            </select>
          </div>
          
          <div style={{marginBottom: 8}}>
            <label>Amount</label>
            <div style={{display: 'flex', gap: 8}}>
              <input value={form.amount} onChange={e => setForm(s=>({...s, amount: e.target.value}))} style={{display: 'block', padding: 8, flex: 1}} type="number" min="0" step="0.01" />
              <select value={form.currency} onChange={e => setForm(s=>({...s, currency: e.target.value}))} style={{padding: 8, width: 100}}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          
          <div style={{marginBottom: 8}}>
            <label>Installments</label>
            <select value={form.installments} onChange={e => setForm(s=>({...s, installments: e.target.value}))} style={{display: 'block', padding: 8, width: '100%'}}>
              {[1,2,3,4,6,12].map(n => <option key={n} value={n}>{n} payment{n>1?'s':''}</option>)}
            </select>
          </div>
          
          <div style={{marginBottom: 8}}>
            <label>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(s=>({...s, dueDate: e.target.value}))} style={{display: 'block', padding: 8, width: '100%'}} />
          </div>
          
          <div style={{marginBottom: 8}}>
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm(s=>({...s, description: e.target.value}))} style={{display: 'block', padding: 8, width: '100%', minHeight: 80}} />
          </div>
          
          <div style={{marginBottom: 8}}>
            <label>Attachments</label>
            <input type="file" onChange={handleFileChange} multiple accept="image/*" style={{display: 'block', marginTop: 4}} />
            {form.attachments.length > 0 && (
              <div style={{display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap'}}>
                {form.attachments.map((url, idx) => (
                  <img key={idx} src={url} alt={`Attachment ${idx + 1}`} style={{width: 60, height: 60, objectFit: 'cover', borderRadius: 4}} />
                ))}
              </div>
            )}
          </div>
          
          <button type="submit" style={{padding: '8px 12px', width: '100%'}}>Create Invoice</button>
        </form>

        <div style={{flex: 1, background: '#fff', padding: 12, borderRadius: 8}}>
          <h3 style={{marginTop: 0}}>Recent Invoices</h3>
          {filteredInvoices.length === 0 ? <div style={{color: '#6b7280'}}>No invoices found.</div> : (
            <div style={{display: 'grid', gap: 12}}>
              {filteredInvoices.map(inv => (
                <div key={inv.id} style={{padding: 12, borderRadius: 8, border: '1px solid #eee', cursor: 'pointer'}} onClick={() => setModal({open: true, invoice: inv})}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
                    <div>
                      <strong>{clients.find(c => c.id === inv.clientId)?.name}</strong>
                      <div style={{color: '#666', fontSize: 14}}>{inv.description}</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: 500}}>{inv.amount} {inv.currency}</div>
                      <div style={{color: '#666', fontSize: 14}}>{getPaymentStatus(inv)}</div>
                    </div>
                  </div>
                  {inv.attachments?.length > 0 && (
                    <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                      {inv.attachments.map((url, idx) => (
                        <img key={idx} src={url} alt={`Doc ${idx + 1}`} style={{width: 40, height: 40, objectFit: 'cover', borderRadius: 4}} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalPopup open={modal.open} onClose={() => setModal({open: false, invoice: null})}>
        {modal.invoice && (
          <div style={{padding: 20}}>
            <h3 style={{marginTop: 0}}>Invoice Details</h3>
            <div style={{marginBottom: 16}}>
              <strong>Client:</strong> {clients.find(c => c.id === modal.invoice.clientId)?.name}
            </div>
            <div style={{marginBottom: 16}}>
              <strong>Amount:</strong> {modal.invoice.amount} {modal.invoice.currency}
            </div>
            <div style={{marginBottom: 16}}>
              <strong>Due Date:</strong> {new Date(modal.invoice.dueDate).toLocaleDateString()}
            </div>
            <div style={{marginBottom: 16}}>
              <strong>Payments:</strong>
              <div style={{marginTop: 8}}>
                {modal.invoice.payments.map((p, idx) => (
                  <div key={idx} style={{marginBottom: 8, padding: 8, background: '#f9fafb', borderRadius: 4}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: p.proofImage ? 8 : 0}}>
                      <div>Installment {idx + 1}</div>
                      <div>
                        {p.status === 'pending' ? (
                          <button onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  const newPayments = [...modal.invoice.payments];
                                  newPayments[idx] = {
                                    status: 'done',
                                    proofImage: e.target.result,
                                    date: new Date().toISOString()
                                  };
                                  addInvoice({...modal.invoice, payments: newPayments});
                                  addNotification({
                                    title: 'Payment Updated',
                                    message: `Installment ${idx + 1} marked as paid`,
                                    category: 'success'
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }} style={{padding: '4px 8px'}}>Mark as Paid</button>
                        ) : (
                          <span style={{color: '#059669'}}>✓ Paid on {new Date(p.date).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    {p.proofImage && (
                      <img src={p.proofImage} alt={`Payment proof ${idx + 1}`} style={{width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 4}} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom: 16}}>
              <strong>Description:</strong>
              <div style={{marginTop: 4, whiteSpace: 'pre-wrap'}}>{modal.invoice.description}</div>
            </div>
            {modal.invoice.attachments?.length > 0 && (
              <div>
                <strong>Attachments:</strong>
                <div style={{display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap'}}>
                  {modal.invoice.attachments.map((url, idx) => (
                    <img key={idx} src={url} alt={`Document ${idx + 1}`} style={{width: 100, height: 100, objectFit: 'cover', borderRadius: 4}} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </ModalPopup>
    </div>
  );
};

export default Invoices;
