import React, { useState } from 'react';

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'PKR', name: 'Pakistani Rupee' },
  { code: 'AED', name: 'UAE Dirham' }
];

const InvoiceForm = ({ clients, onSubmit, onPreview }) => {
  const [form, setForm] = useState({
    clientId: '',
    currency: 'USD',
    amount: '',
    installments: 1,
    dueDate: '',
    instructions: '',
    requirements: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      swiftCode: ''
    }
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return { ...prev, [parent]: { ...prev[parent], [child]: value }};
      }
      return { ...prev, [field]: value };
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.clientId || !form.amount || !form.currency || !form.dueDate) {
      return alert('Please fill all required fields');
    }
    
    // Show preview first
    onPreview(form);
  };

  return (
    <form onSubmit={submit} style={{background:'#fff', padding:24, borderRadius:12, maxWidth:800}}>
      <h3 style={{marginTop:0, marginBottom:20}}>Create New Invoice</h3>
      
      <div style={{display:'flex', gap:20, marginBottom:20}}>
        <div style={{flex:1}}>
          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Select Client *</div>
            <select 
              value={form.clientId} 
              onChange={handleChange('clientId')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}}
            >
              <option value="">Choose a client</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
              ))}
            </select>
          </label>

          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Currency *</div>
            <select 
              value={form.currency} 
              onChange={handleChange('currency')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}}
            >
              {currencies.map(curr => (
                <option key={curr.code} value={curr.code}>{curr.code} - {curr.name}</option>
              ))}
            </select>
          </label>

          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Amount *</div>
            <input 
              type="number" 
              value={form.amount} 
              onChange={handleChange('amount')} 
              placeholder="Enter amount" 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
        </div>

        <div style={{flex:1}}>
          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Number of Installments *</div>
            <select 
              value={form.installments} 
              onChange={handleChange('installments')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}}
            >
              {[1,2,3,4,6,12].map(n => (
                <option key={n} value={n}>{n} payment{n>1?'s':''}</option>
              ))}
            </select>
          </label>

          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Due Date *</div>
            <input 
              type="date" 
              value={form.dueDate} 
              onChange={handleChange('dueDate')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>

          <label style={{display:'block', marginBottom:16}}>
            <div style={{marginBottom:8, fontWeight:500}}>Project Requirements</div>
            <textarea 
              value={form.requirements} 
              onChange={handleChange('requirements')} 
              placeholder="Describe the project requirements" 
              style={{padding:10, width:'100%', minHeight:80, borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
        </div>
      </div>

      <div style={{marginBottom:20}}>
        <h4 style={{marginBottom:12}}>Bank Details</h4>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          <label style={{display:'block'}}>
            <div style={{marginBottom:8}}>Account Name</div>
            <input 
              value={form.bankDetails.accountName} 
              onChange={handleChange('bankDetails.accountName')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
          <label style={{display:'block'}}>
            <div style={{marginBottom:8}}>Account Number</div>
            <input 
              value={form.bankDetails.accountNumber} 
              onChange={handleChange('bankDetails.accountNumber')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
          <label style={{display:'block'}}>
            <div style={{marginBottom:8}}>Bank Name</div>
            <input 
              value={form.bankDetails.bankName} 
              onChange={handleChange('bankDetails.bankName')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
          <label style={{display:'block'}}>
            <div style={{marginBottom:8}}>SWIFT/BIC Code</div>
            <input 
              value={form.bankDetails.swiftCode} 
              onChange={handleChange('bankDetails.swiftCode')} 
              style={{padding:10, width:'100%', borderRadius:6, border:'1px solid #e5e7eb'}} 
            />
          </label>
        </div>
      </div>

      <label style={{display:'block', marginBottom:20}}>
        <div style={{marginBottom:8, fontWeight:500}}>Payment Instructions</div>
        <textarea 
          value={form.instructions} 
          onChange={handleChange('instructions')} 
          placeholder="Enter payment instructions and requirements for proof of payment" 
          style={{padding:10, width:'100%', minHeight:100, borderRadius:6, border:'1px solid #e5e7eb'}} 
        />
      </label>

      <div style={{display:'flex', gap:12, justifyContent:'flex-end'}}>
        <button type="button" onClick={() => onSubmit(null)} style={{padding:'10px 16px', borderRadius:6, border:'1px solid #e5e7eb'}}>
          Cancel
        </button>
        <button type="submit" style={{padding:'10px 16px', borderRadius:6, background:'#2563eb', color:'#fff', border:'none'}}>
          Preview Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
