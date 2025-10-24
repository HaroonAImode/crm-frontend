import React, { useState } from 'react';
import { useAppContext } from '../context/AppContextValue';

const Expenses = () => {
  const { expenses, addExpense } = useAppContext();
  const [form, setForm] = useState({ title: '', amount: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return alert('Title and amount required');
    addExpense({ title: form.title, amount: parseFloat(form.amount) });
    setForm({ title: '', amount: '' });
  };

  return (
    <div style={{padding: 20}}>
      <h2>Expenses</h2>
      <div style={{display: 'flex', gap: 16}}>
        <form onSubmit={submit} style={{background: '#fff', padding: 12, borderRadius: 8}}>
          <div style={{marginBottom: 8}}>
            <label>Title</label>
            <input value={form.title} onChange={e => setForm(s=>({...s, title: e.target.value}))} style={{display: 'block', padding: 8, width: 300}} />
          </div>
          <div style={{marginBottom: 8}}>
            <label>Amount</label>
            <input value={form.amount} onChange={e => setForm(s=>({...s, amount: e.target.value}))} style={{display: 'block', padding: 8, width: 300}} />
          </div>
          <button type="submit" style={{padding: '8px 12px'}}>Add Expense</button>
        </form>

        <div style={{flex: 1, background: '#fff', padding: 12, borderRadius: 8}}>
          <h3 style={{marginTop: 0}}>Recent Expenses</h3>
          {expenses.length === 0 ? <div style={{color: '#6b7280'}}>No expenses yet.</div> : (
            <ul style={{listStyle: 'none', padding: 0}}>
              {expenses.map(exp => (
                <li key={exp.id} style={{padding: 8, borderBottom: '1px solid #f3f4f6'}}>
                  <div style={{fontWeight: 600}}>${exp.amount} — {exp.title}</div>
                  <div style={{fontSize: 13, color: '#6b7280'}}>{new Date(exp.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
