import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContextValue';

const AddClient = () => {
  const { addClient, teams, addNotification } = useAppContext();
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
    status: 'active',
    budget: '',
    currency: 'USD',
    installments: '1',
    paymentNote: '',
    notes: ''
  });
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    formCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
      maxWidth: '900px',
      margin: '0 auto'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    formSection: {
      marginBottom: '32px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '2px solid #3b82f6'
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
    inputError: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
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
      minHeight: '100px',
      resize: 'vertical',
      transition: 'all 0.2s ease',
      fontFamily: 'inherit'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e5e7eb'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '120px'
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
    durationDisplay: {
      background: '#f0f9ff',
      padding: '12px 16px',
      borderRadius: '10px',
      border: '1px solid #bae6fd',
      fontSize: '14px',
      fontWeight: 600,
      color: '#0369a1'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '4px',
      fontWeight: 500
    },
    infoCard: {
      background: '#f0f9ff',
      padding: '16px',
      borderRadius: '10px',
      border: '1px solid #bae6fd',
      marginBottom: '20px'
    },
    infoText: {
      fontSize: '13px',
      color: '#0369a1',
      margin: 0
    },
    serviceTypeGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: '10px',
      marginTop: '8px'
    },
    serviceTypeButton: {
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      background: '#ffffff',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    },
    serviceTypeActive: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      borderColor: '#3b82f6'
    }
  };

  const serviceTypes = [
    'Web Development', 'Mobile App', 'UI/UX Design', 'Digital Marketing',
    'SEO Optimization', 'E-commerce', 'Branding', 'Consulting',
    'Software Development', 'Content Writing', 'Social Media', 'Analytics'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Client name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (form.phone && !/^[+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (form.budget && (isNaN(form.budget) || parseFloat(form.budget) < 0)) {
      newErrors.budget = 'Please enter a valid budget amount';
    }
    
    if (form.projectStart && form.projectDeadline) {
      const start = new Date(form.projectStart);
      const end = new Date(form.projectDeadline);
      if (end <= start) {
        newErrors.projectDeadline = 'Deadline must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setForm((s) => ({ ...s, [field]: value }));
    
    // Auto-calculate duration
    if (field === 'projectStart' || field === 'projectDeadline') {
      const start = field === 'projectStart' ? value : form.projectStart;
      const end = field === 'projectDeadline' ? value : form.projectDeadline;
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const d = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setDuration(d > 0 ? `${d} days` : 'Invalid date range');
      } else {
        setDuration('');
      }
    }
  };

  const handleServiceTypeClick = (serviceType) => {
    setForm(prev => ({ ...prev, serviceType }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification({
        title: 'Validation Error',
        message: 'Please fix the errors in the form',
        category: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const clientData = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        projectStart: form.projectStart,
        projectDeadline: form.projectDeadline,
        serviceType: form.serviceType,
        teamId: form.teamId,
        status: form.status,
        budget: form.budget ? parseFloat(form.budget) : 0,
        currency: form.currency,
        installments: parseInt(form.installments) || 1,
        paymentNote: form.paymentNote.trim(),
        notes: form.notes.trim(),
        duration: duration,
        createdAt: new Date().toISOString(),
        attachments: []
      };

      const created = addClient(clientData);
      
      addNotification({
        title: 'Client Added Successfully',
        message: `${clientData.name} has been added to the system`,
        category: 'success'
      });

      // Redirect to client details page
      navigate(`/clients/${created.id}`);
      
    } catch {
      addNotification({
        title: 'Error Adding Client',
        message: 'There was an error adding the client. Please try again.',
        category: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (form.name || form.email) {
      if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        navigate('/clients');
      }
    } else {
      navigate('/clients');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Add New Client</h1>
          <div style={styles.subtitle}>Create a new client profile and project details</div>
        </div>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionTitle}>Basic Information</div>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Client Name *
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    style={{
                      ...styles.input,
                      ...(errors.name ? styles.inputError : {}),
                      ...(form.name ? { borderColor: '#10b981' } : {})
                    }}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = { ...styles.input, ...(errors.name ? styles.inputError : {}) }}
                    placeholder="Enter client full name"
                  />
                </label>
                {errors.name && <div style={styles.errorText}>{errors.name}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Email Address *
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {}),
                      ...(form.email ? { borderColor: '#10b981' } : {})
                    }}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = { ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                    placeholder="client@company.com"
                  />
                </label>
                {errors.email && <div style={styles.errorText}>{errors.email}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Phone Number
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    style={{
                      ...styles.input,
                      ...(errors.phone ? styles.inputError : {})
                    }}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = { ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
                    placeholder="+1 (555) 123-4567"
                  />
                </label>
                {errors.phone && <div style={styles.errorText}>{errors.phone}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Company Name
                  <input
                    type="text"
                    value={form.company}
                    onChange={handleChange('company')}
                    style={styles.input}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = styles.input}
                    placeholder="Company or organization name"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionTitle}>Project Details</div>
            <div style={styles.infoCard}>
              <div style={styles.infoText}>
                💡 Provide detailed project information to help with team assignment and timeline management
              </div>
            </div>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Service Type
                  <input
                    type="text"
                    value={form.serviceType}
                    onChange={handleChange('serviceType')}
                    style={styles.input}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = styles.input}
                    placeholder="e.g., Web Development, Marketing"
                  />
                </label>
                <div style={styles.serviceTypeGrid}>
                  {serviceTypes.map(service => (
                    <div
                      key={service}
                      style={{
                        ...styles.serviceTypeButton,
                        ...(form.serviceType === service ? styles.serviceTypeActive : {})
                      }}
                      onClick={() => handleServiceTypeClick(service)}
                      onMouseEnter={(e) => {
                        if (form.serviceType !== service) {
                          e.target.style.background = '#f8fafc';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (form.serviceType !== service) {
                          e.target.style.background = '#ffffff';
                        }
                      }}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Project Start Date
                  <input
                    type="date"
                    value={form.projectStart}
                    onChange={handleChange('projectStart')}
                    style={styles.input}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = styles.input}
                  />
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Project Deadline
                  <input
                    type="date"
                    value={form.projectDeadline}
                    onChange={handleChange('projectDeadline')}
                    style={{
                      ...styles.input,
                      ...(errors.projectDeadline ? styles.inputError : {})
                    }}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = { ...styles.input, ...(errors.projectDeadline ? styles.inputError : {}) }}
                  />
                </label>
                {errors.projectDeadline && <div style={styles.errorText}>{errors.projectDeadline}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Project Duration</label>
                <div style={styles.durationDisplay}>
                  {duration || 'Set start and end dates to calculate duration'}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionTitle}>Financial Information</div>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Budget
                  <input
                    type="number"
                    value={form.budget}
                    onChange={handleChange('budget')}
                    style={{
                      ...styles.input,
                      ...(errors.budget ? styles.inputError : {})
                    }}
                    onFocus={(e) => e.target.style = { ...styles.input, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = { ...styles.input, ...(errors.budget ? styles.inputError : {}) }}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </label>
                {errors.budget && <div style={styles.errorText}>{errors.budget}</div>}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Currency
                  <select
                    value={form.currency}
                    onChange={handleChange('currency')}
                    style={styles.select}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Installments
                  <select
                    value={form.installments}
                    onChange={handleChange('installments')}
                    style={styles.select}
                  >
                    <option value="1">1 (Full Payment)</option>
                    <option value="2">2 Installments</option>
                    <option value="3">3 Installments</option>
                    <option value="4">4 Installments</option>
                    <option value="6">6 Installments</option>
                  </select>
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Assign Team
                  <select
                    value={form.teamId}
                    onChange={handleChange('teamId')}
                    style={styles.select}
                  >
                    <option value="">— Unassigned —</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name} ({team.members?.length || 0} members)
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div style={styles.formSection}>
            <div style={styles.sectionTitle}>Additional Information</div>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Payment Notes
                  <textarea
                    value={form.paymentNote}
                    onChange={handleChange('paymentNote')}
                    style={styles.textarea}
                    onFocus={(e) => e.target.style = { ...styles.textarea, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = styles.textarea}
                    placeholder="Special payment terms, conditions, or instructions..."
                  />
                </label>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Project Notes
                  <textarea
                    value={form.notes}
                    onChange={handleChange('notes')}
                    style={styles.textarea}
                    onFocus={(e) => e.target.style = { ...styles.textarea, ...styles.inputFocus }}
                    onBlur={(e) => e.target.style = styles.textarea}
                    placeholder="Additional project requirements, client preferences, or important notes..."
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleCancel}
              style={{...styles.button, ...styles.secondaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{...styles.button, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
              disabled={loading}
            >
              {loading ? 'Creating Client...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;