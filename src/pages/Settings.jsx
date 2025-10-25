import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContextValue';
import storage from '../utils/storage';

const Settings = () => {
  const { setNotifications, user, setUser, addNotification } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@agency.com',
    role: user?.role || 'admin',
    phone: user?.phone || '+1 (555) 123-4567',
    department: user?.department || 'Management',
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReports: true,
      paymentAlerts: true,
      clientUpdates: true
    }
  });
  const [agencyForm, setAgencyForm] = useState({
    name: 'Creative Agency Pro',
    address: '123 Business Avenue\nNew York, NY 10001',
    email: 'hello@creativeagency.com',
    phone: '+1 (555) 123-4567',
    website: 'www.creativeagency.com',
    currency: 'USD',
    timezone: 'America/New_York',
    taxRate: '8.5',
    invoiceTerms: 'Net 15. 1.5% monthly interest on overdue balances.'
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
    tabContainer: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0',
      marginBottom: '24px',
      background: '#ffffff',
      borderRadius: '12px 12px 0 0',
      padding: '0 24px'
    },
    tab: {
      padding: '16px 24px',
      background: 'none',
      border: 'none',
      fontSize: '14px',
      fontWeight: 600,
      color: '#64748b',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s ease'
    },
    activeTab: {
      color: '#3b82f6',
      borderBottomColor: '#3b82f6'
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
    dangerButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white'
    },
    successButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    switchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    },
    switch: {
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '24px'
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#d1d5db',
      transition: '0.4s',
      borderRadius: '24px'
    },
    switchSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '16px',
      width: '16px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    },
    switchChecked: {
      backgroundColor: '#3b82f6'
    },
    switchCheckedBefore: {
      transform: 'translateX(20px)'
    },
    switchLabel: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#374151',
      flex: 1
    },
    switchDescription: {
      fontSize: '12px',
      color: '#64748b',
      marginTop: '2px'
    },
    dangerZone: {
      padding: '20px',
      background: '#fef2f2',
      borderRadius: '12px',
      border: '1px solid #fecaca',
      marginTop: '24px'
    },
    dangerZoneTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#dc2626',
      margin: '0 0 12px 0'
    },
    dangerZoneDescription: {
      fontSize: '14px',
      color: '#991b1b',
      margin: '0 0 20px 0'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '32px',
      paddingBottom: '24px',
      borderBottom: '1px solid #e2e8f0'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '32px',
      fontWeight: 600
    },
    profileInfo: {
      flex: 1
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#1e293b',
      margin: '0 0 4px 0'
    },
    profileRole: {
      fontSize: '16px',
      color: '#64748b',
      margin: 0
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
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
    backupSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    backupCard: {
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    backupIcon: {
      fontSize: '32px',
      marginBottom: '12px'
    },
    backupTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 8px 0'
    },
    backupDescription: {
      fontSize: '14px',
      color: '#64748b',
      margin: '0 0 16px 0'
    }
  };

  // Available timezones
  const timezones = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo',
    'Asia/Singapore', 'Australia/Sydney', 'UTC'
  ];

  // Available currencies
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...profileForm,
        updatedAt: new Date().toISOString()
      };
      
      setUser(updatedUser);
      storage.set('user', updatedUser);

      addNotification({
        title: 'Profile Updated',
        message: 'Your profile information has been updated successfully',
        category: 'success'
      });
    } catch {
      addNotification({
        title: 'Update Failed',
        message: 'There was an error updating your profile',
        category: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAgencyUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      storage.set('agencySettings', agencyForm);

      addNotification({
        title: 'Agency Settings Updated',
        message: 'Agency information has been updated successfully',
        category: 'success'
      });
    } catch {
      addNotification({
        title: 'Update Failed',
        message: 'There was an error updating agency settings',
        category: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = (key) => {
    setProfileForm(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const clearStorage = () => {
    if (!window.confirm('Are you sure you want to reset all demo data? This action cannot be undone and will delete all clients, teams, invoices, and other data.')) return;
    
    storage.remove('clients');
    storage.remove('teams');
    storage.remove('notifications');
    storage.remove('invoices');
    storage.remove('expenses');
    storage.remove('user');
    storage.remove('agencySettings');
    setNotifications([]);
    
    addNotification({
      title: 'System Reset',
      message: 'All demo data has been cleared successfully',
      category: 'success'
    });

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const exportData = () => {
    const data = {
      clients: storage.get('clients', []),
      teams: storage.get('teams', []),
      invoices: storage.get('invoices', []),
      expenses: storage.get('expenses', []),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agency-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    addNotification({
      title: 'Data Exported',
      message: 'All agency data has been exported successfully',
      category: 'success'
    });
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.clients) storage.set('clients', data.clients);
        if (data.teams) storage.set('teams', data.teams);
        if (data.invoices) storage.set('invoices', data.invoices);
        if (data.expenses) storage.set('expenses', data.expenses);

        addNotification({
          title: 'Data Imported',
          message: 'Agency data has been imported successfully',
          category: 'success'
        });

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch {
        addNotification({
          title: 'Import Failed',
          message: 'Invalid backup file format',
          category: 'error'
        });
      }
    };
    reader.readAsText(file);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'backup', label: 'Backup & Restore', icon: '💾' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Settings</h1>
          <div style={styles.subtitle}>Manage your agency preferences and system configuration</div>
        </div>
      </div>

      <div style={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px'}}>Agency Settings</h3>
          <form onSubmit={handleAgencyUpdate}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Agency Name *</label>
                <input
                  type="text"
                  value={agencyForm.name}
                  onChange={e => setAgencyForm(s => ({ ...s, name: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Email *</label>
                <input
                  type="email"
                  value={agencyForm.email}
                  onChange={e => setAgencyForm(s => ({ ...s, email: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  value={agencyForm.phone}
                  onChange={e => setAgencyForm(s => ({ ...s, phone: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Website</label>
                <input
                  type="url"
                  value={agencyForm.website}
                  onChange={e => setAgencyForm(s => ({ ...s, website: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  placeholder="https://example.com"
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Default Currency</label>
                <select
                  value={agencyForm.currency}
                  onChange={e => setAgencyForm(s => ({ ...s, currency: e.target.value }))}
                  style={styles.select}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Timezone</label>
                <select
                  value={agencyForm.timezone}
                  onChange={e => setAgencyForm(s => ({ ...s, timezone: e.target.value }))}
                  style={styles.select}
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Business Address</label>
              <textarea
                value={agencyForm.address}
                onChange={e => setAgencyForm(s => ({ ...s, address: e.target.value }))}
                style={styles.textarea}
                onFocus={(e) => e.target.style = {...styles.textarea, ...styles.inputFocus}}
                onBlur={(e) => e.target.style = styles.textarea}
                rows={3}
                placeholder="Enter your business address..."
              />
            </div>

            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Default Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={agencyForm.taxRate}
                  onChange={e => setAgencyForm(s => ({ ...s, taxRate: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Default Invoice Terms</label>
              <textarea
                value={agencyForm.invoiceTerms}
                onChange={e => setAgencyForm(s => ({ ...s, invoiceTerms: e.target.value }))}
                style={styles.textarea}
                onFocus={(e) => e.target.style = {...styles.textarea, ...styles.inputFocus}}
                onBlur={(e) => e.target.style = styles.textarea}
                rows={2}
                placeholder="Enter default invoice terms and conditions..."
              />
            </div>

            <button
              type="submit"
              style={{...styles.button, ...styles.primaryButton}}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'none')}
            >
              {loading ? (
                <>
                  <div style={styles.loadingSpinner}></div>
                  Saving Changes...
                </>
              ) : (
                '💾 Save Agency Settings'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div style={styles.contentCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {getInitials(profileForm.name)}
            </div>
            <div style={styles.profileInfo}>
              <div style={styles.profileName}>{profileForm.name}</div>
              <div style={styles.profileRole}>{profileForm.role} • {profileForm.department}</div>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={e => setProfileForm(s => ({ ...s, name: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={e => setProfileForm(s => ({ ...s, email: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={e => setProfileForm(s => ({ ...s, phone: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <select
                  value={profileForm.role}
                  onChange={e => setProfileForm(s => ({ ...s, role: e.target.value }))}
                  style={styles.select}
                >
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={e => setProfileForm(s => ({ ...s, department: e.target.value }))}
                  style={styles.input}
                  onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.input}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{...styles.button, ...styles.primaryButton}}
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => !loading && (e.target.style.transform = 'none')}
            >
              {loading ? (
                <>
                  <div style={styles.loadingSpinner}></div>
                  Updating Profile...
                </>
              ) : (
                '👤 Update Profile'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px'}}>Notification Preferences</h3>
          <p style={{color: '#64748b', marginBottom: '24px'}}>
            Choose how you want to be notified about important events and updates.
          </p>

          <div>
            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>Email Notifications</div>
                <div style={styles.switchDescription}>Receive notifications via email</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.email}
                  onChange={() => handleNotificationToggle('email')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.email ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.email ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>

            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>Push Notifications</div>
                <div style={styles.switchDescription}>Show browser notifications</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.push}
                  onChange={() => handleNotificationToggle('push')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.push ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.push ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>

            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>SMS Notifications</div>
                <div style={styles.switchDescription}>Receive text message alerts</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.sms}
                  onChange={() => handleNotificationToggle('sms')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.sms ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.sms ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>

            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>Weekly Reports</div>
                <div style={styles.switchDescription}>Get weekly performance summaries</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.weeklyReports}
                  onChange={() => handleNotificationToggle('weeklyReports')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.weeklyReports ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.weeklyReports ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>

            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>Payment Alerts</div>
                <div style={styles.switchDescription}>Notify when payments are received</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.paymentAlerts}
                  onChange={() => handleNotificationToggle('paymentAlerts')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.paymentAlerts ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.paymentAlerts ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>

            <div style={styles.switchContainer}>
              <div style={{flex: 1}}>
                <div style={styles.switchLabel}>Client Updates</div>
                <div style={styles.switchDescription}>Get notified about client activities</div>
              </div>
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={profileForm.notifications.clientUpdates}
                  onChange={() => handleNotificationToggle('clientUpdates')}
                  style={styles.switchInput}
                />
                <span style={{
                  ...styles.switchSlider,
                  ...(profileForm.notifications.clientUpdates ? styles.switchChecked : {})
                }}>
                  <span style={{
                    ...styles.switchSliderBefore,
                    ...(profileForm.notifications.clientUpdates ? styles.switchCheckedBefore : {})
                  }} />
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={handleProfileUpdate}
            style={{...styles.button, ...styles.primaryButton, marginTop: '24px'}}
            disabled={loading}
          >
            {loading ? 'Saving...' : '💾 Save Notification Settings'}
          </button>
        </div>
      )}

      {/* Backup & Restore */}
      {activeTab === 'backup' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px'}}>Data Management</h3>
          <p style={{color: '#64748b', marginBottom: '24px'}}>
            Backup your agency data or restore from a previous backup.
          </p>

          <div style={styles.backupSection}>
            <div style={styles.backupCard}>
              <div style={styles.backupIcon}>📤</div>
              <div style={styles.backupTitle}>Export Data</div>
              <div style={styles.backupDescription}>
                Download a complete backup of all your agency data including clients, teams, and invoices.
              </div>
              <button
                onClick={exportData}
                style={{...styles.button, ...styles.primaryButton}}
              >
                📥 Export Backup
              </button>
            </div>

            <div style={styles.backupCard}>
              <div style={styles.backupIcon}>📥</div>
              <div style={styles.backupTitle}>Import Data</div>
              <div style={styles.backupDescription}>
                Restore your agency data from a previously exported backup file.
              </div>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{display: 'none'}}
                id="import-file"
              />
              <button
                onClick={() => document.getElementById('import-file').click()}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                📤 Import Backup
              </button>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Clients</div>
              <div style={styles.statValue}>{storage.get('clients', []).length}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Active Teams</div>
              <div style={styles.statValue}>{storage.get('teams', []).length}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Total Invoices</div>
              <div style={styles.statValue}>{storage.get('invoices', []).length}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>Data Size</div>
              <div style={styles.statValue}>
                {Math.round(JSON.stringify(storage.getAll()).length / 1024)} KB
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      {activeTab === 'danger' && (
        <div style={styles.contentCard}>
          <div style={styles.dangerZone}>
            <div style={styles.dangerZoneTitle}>⚠️ Danger Zone</div>
            <div style={styles.dangerZoneDescription}>
              These actions are irreversible. Please proceed with caution.
            </div>

            <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
              <button
                onClick={clearStorage}
                style={{...styles.button, ...styles.dangerButton}}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                🗑️ Reset All Data
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('Clear all notifications?')) {
                    setNotifications([]);
                    storage.remove('notifications');
                    addNotification({
                      title: 'Notifications Cleared',
                      message: 'All notifications have been cleared',
                      category: 'success'
                    });
                  }
                }}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                🔔 Clear Notifications
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Clear browser cache and reload?')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                style={{...styles.button, ...styles.secondaryButton}}
              >
                🧹 Clear Cache
              </button>
            </div>
          </div>

          <div style={{marginTop: '32px', padding: '20px', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd'}}>
            <h4 style={{margin: '0 0 12px 0', color: '#0369a1'}}>System Information</h4>
            <div style={styles.formGrid}>
              <div>
                <div style={styles.summaryLabel}>Browser</div>
                <div style={styles.summaryValue}>{navigator.userAgent.split(' ')[0]}</div>
              </div>
              <div>
                <div style={styles.summaryLabel}>Screen Resolution</div>
                <div style={styles.summaryValue}>{window.screen.width} x {window.screen.height}</div>
              </div>
              <div>
                <div style={styles.summaryLabel}>Local Storage</div>
                <div style={styles.summaryValue}>
                  {Math.round(JSON.stringify(localStorage).length / 1024)} KB used
                </div>
              </div>
              <div>
                <div style={styles.summaryLabel}>Platform</div>
                <div style={styles.summaryValue}>{navigator.platform}</div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Settings;