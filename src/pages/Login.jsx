import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextValue';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, addNotification } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      addNotification({
        title: 'Validation Error',
        message: 'Please enter both email and password',
        category: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the global login function from context
      login(email);

      addNotification({
        title: 'Login Successful',
        message: `Welcome back! You've been successfully logged in.`,
        category: 'success'
      });

      // Redirect to dashboard after login
      navigate('/');

    } catch {
      addNotification({
        title: 'Login Failed',
        message: 'Invalid email or password. Please try again.',
        category: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoUsers = {
      admin: { email: 'admin@agency.com', name: 'Admin User' },
      manager: { email: 'manager@agency.com', name: 'Project Manager' },
      designer: { email: 'designer@agency.com', name: 'UI/UX Designer' }
    };

    const user = demoUsers[role];
    setEmail(user.email);
    setPassword('demo123');
    
    addNotification({
      title: 'Demo Login',
      message: `Logging in as ${user.name}. Click Login to continue.`,
      category: 'info'
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    loginCard: {
      background: '#ffffff',
      borderRadius: '20px',
      padding: '48px 40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      width: '100%',
      maxWidth: '440px',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHeader: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 700,
      color: '#1e293b',
      margin: '0 0 8px 0',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      fontSize: '16px',
      color: '#64748b',
      margin: 0,
      fontWeight: 500
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      position: 'relative'
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
      padding: '16px 48px 16px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '16px',
      background: '#ffffff',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    inputIcon: {
      position: 'absolute',
      right: '16px',
      top: '42px',
      transform: 'translateY(-50%)',
      color: '#64748b',
      cursor: 'pointer'
    },
    passwordToggle: {
      background: 'none',
      border: 'none',
      color: '#64748b',
      cursor: 'pointer',
      padding: '4px'
    },
    primaryButton: {
      width: '100%',
      padding: '16px 24px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    primaryButtonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
    },
    primaryButtonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none'
    },
    demoSection: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0'
    },
    demoTitle: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#64748b',
      textAlign: 'center',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    demoButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px'
    },
    demoButton: {
      padding: '12px 8px',
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: 600,
      color: '#475569',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textAlign: 'center'
    },
    demoButtonHover: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6',
      transform: 'translateY(-1px)'
    },
    adminDemo: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white'
    },
    managerDemo: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white'
    },
    designerDemo: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0'
    },
    footerText: {
      fontSize: '14px',
      color: '#64748b'
    },
    footerLink: {
      color: '#3b82f6',
      textDecoration: 'none',
      fontWeight: 600
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    decorativeElement: {
      position: 'absolute',
      top: '-50px',
      right: '-50px',
      width: '200px',
      height: '200px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      borderRadius: '50%',
      opacity: 0.1
    },
    decorativeElement2: {
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      width: '120px',
      height: '120px',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      borderRadius: '50%',
      opacity: 0.1
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Decorative Elements */}
        <div style={styles.decorativeElement}></div>
        <div style={styles.decorativeElement2}></div>
        
        <div style={styles.cardHeader}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your agency account</p>
        </div>

        <form style={styles.form} onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
              onBlur={(e) => e.target.style = styles.input}
              disabled={loading}
            />
            <div style={styles.inputIcon}>
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...styles.primaryButton,
              ...(loading ? styles.primaryButtonDisabled : {})
            }}
            onMouseEnter={(e) => !loading && (e.target.style = {...styles.primaryButton, ...styles.primaryButtonHover})}
            onMouseLeave={(e) => !loading && (e.target.style = styles.primaryButton)}
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Login Section */}
        <div style={styles.demoSection}>
          <div style={styles.demoTitle}>Quick Demo Access</div>
          <div style={styles.demoButtons}>
            <button
              type="button"
              style={styles.demoButton}
              onClick={() => handleDemoLogin('admin')}
              onMouseEnter={(e) => e.target.style = {...styles.demoButton, ...styles.demoButtonHover, ...styles.adminDemo}}
              onMouseLeave={(e) => e.target.style = {...styles.demoButton, ...styles.adminDemo}}
            >
              Admin
            </button>
            <button
              type="button"
              style={styles.demoButton}
              onClick={() => handleDemoLogin('manager')}
              onMouseEnter={(e) => e.target.style = {...styles.demoButton, ...styles.demoButtonHover, ...styles.managerDemo}}
              onMouseLeave={(e) => e.target.style = {...styles.demoButton, ...styles.managerDemo}}
            >
              Manager
            </button>
            <button
              type="button"
              style={styles.demoButton}
              onClick={() => handleDemoLogin('designer')}
              onMouseEnter={(e) => e.target.style = {...styles.demoButton, ...styles.demoButtonHover, ...styles.designerDemo}}
              onMouseLeave={(e) => e.target.style = {...styles.demoButton, ...styles.designerDemo}}
            >
              Designer
            </button>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Need help? <a href="#" style={styles.footerLink}>Contact support</a>
          </p>
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
}