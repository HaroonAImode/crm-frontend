import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const AddClient = () => {
  const { addClient, teams } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectStart: '',
    projectDeadline: '',
    serviceType: '',
    teamId: '',
    status: 'active'
  });
  const [duration, setDuration] = useState('');

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    setForm((s) => ({ ...s, [field]: value }));
    // auto-calc duration
    if (field === 'projectStart' || field === 'projectDeadline') {
      const start = field === 'projectStart' ? value : form.projectStart;
      const end = field === 'projectDeadline' ? value : form.projectDeadline;
      if (start && end) {
        const d = Math.ceil((new Date(end) - new Date(start)) / (1000*60*60*24));
        setDuration(d > 0 ? d : '');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert('Name and email required');
    // Only send the fields we need
    const clientData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      projectStart: form.projectStart,
      projectDeadline: form.projectDeadline,
      serviceType: form.serviceType,
      teamId: form.teamId,
      status: form.status
    };
    const created = addClient({ ...clientData, duration });
    navigate(`/clients/${created.id}`);
  };

  return (
    <div style={{padding: 20}}>
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit} style={{maxWidth: 700}}>
        <div style={{display:'flex', gap:24, flexWrap:'wrap'}}>
          <div style={{flex:1, minWidth:320}}>
            <FormInput label="Client Name" value={form.name} onChange={handleChange('name')} />
            <FormInput label="Email" type="email" value={form.email} onChange={handleChange('email')} />
            <FormInput label="Contact Number" value={form.phone} onChange={handleChange('phone')} />
            <FormInput label="Company Name" value={form.company} onChange={handleChange('company')} />
            <FormInput label="Project Start Date" type="date" value={form.projectStart} onChange={handleChange('projectStart')} />
            <FormInput label="Project Deadline" type="date" value={form.projectDeadline} onChange={handleChange('projectDeadline')} />
            <FormInput label="Duration (days)" value={duration} readOnly />
            <label style={{display:'block', marginBottom:12}}>Service Type
              <input value={form.serviceType} onChange={handleChange('serviceType')} style={{padding:8, width:'100%'}} placeholder="e.g. Marketing, Design" />
            </label>
            <label style={{display:'block', marginBottom:12}}>Assign Team
              <select value={form.teamId} onChange={handleChange('teamId')} style={{padding:8, width:'100%'}}>
                <option value="">— Unassigned —</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div style={{display: 'flex', gap: 8, marginTop:24}}>
          <button type="submit" style={{padding: '10px 14px'}}>Save</button>
          <button type="button" onClick={() => navigate('/clients')} style={{padding: '10px 14px'}}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
