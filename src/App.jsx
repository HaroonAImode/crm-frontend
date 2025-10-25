import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContextValue';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import ClientDetail from './pages/ClientDetail';
import Teams from './pages/Teams';
import Notifications from './pages/Notifications';
import Invoices from './pages/Invoices';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Loading component with premium styling
const LoadingScreen = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    loader: {
      width: '60px',
      height: '60px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    text: {
      color: 'white',
      fontSize: '18px',
      fontWeight: 600,
      margin: 0
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      margin: 0
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loader}></div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.text}>Creative Agency Pro</h2>
        <p style={styles.subtitle}>Loading your workspace...</p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Enhanced Protected Route with redirect tracking
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Unauthorized page component
const Unauthorized = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '24px',
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    card: {
      background: '#ffffff',
      borderRadius: '20px',
      padding: '48px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      textAlign: 'center',
      maxWidth: '480px',
      width: '100%'
    },
    icon: {
      fontSize: '64px',
      marginBottom: '24px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1e293b',
      margin: '0 0 12px 0'
    },
    message: {
      fontSize: '16px',
      color: '#64748b',
      lineHeight: '1.6',
      margin: '0 0 32px 0'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🚫</div>
        <h1 style={styles.title}>Access Denied</h1>
        <p style={styles.message}>
          You don't have permission to access this page. Please contact your administrator 
          if you believe this is a mistake.
        </p>
        <button 
          style={styles.button}
          onClick={() => window.history.back()}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.target.style.transform = 'none'}
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Track page views (analytics simulation)
  useEffect(() => {
    if (!loading && user) {
      console.log(`Page view: ${location.pathname}`);
      // In a real app, you would send this to your analytics service
    }
  }, [location.pathname, loading, user]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Dashboard */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Client Management */}
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <Layout>
              <Clients />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/add" 
        element={
          <ProtectedRoute>
            <Layout>
              <AddClient />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/:id" 
        element={
          <ProtectedRoute>
            <Layout>
              <ClientDetail />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Team Management */}
      <Route 
        path="/teams" 
        element={
          <ProtectedRoute>
            <Layout>
              <Teams />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Notifications */}
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <Layout>
              <Notifications />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Financial Management */}
      <Route 
        path="/invoices" 
        element={
          <ProtectedRoute>
            <Layout>
              <Invoices />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/expenses" 
        element={
          <ProtectedRoute>
            <Layout>
              <Expenses />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Reports & Analytics */}
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Settings */}
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Only Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <div style={{ padding: '24px', textAlign: 'center' }}>
                <h2>Admin Panel</h2>
                <p>Administrative features will be available here.</p>
              </div>
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* 404 Not Found */}
      <Route 
        path="*" 
        element={
          <Layout>
            <div style={{
              padding: '60px 24px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              minHeight: 'calc(100vh - 80px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <div style={{ fontSize: '120px', marginBottom: '24px' }}>🔍</div>
              <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#1e293b', margin: '0 0 16px 0' }}>
                Page Not Found
              </h1>
              <p style={{ fontSize: '18px', color: '#64748b', margin: '0 0 32px 0', maxWidth: '500px' }}>
                The page you're looking for doesn't exist or has been moved.
              </p>
              <button 
                onClick={() => window.history.back()}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                ← Go Back
              </button>
            </div>
          </Layout>
        } 
      />
    </Routes>
  );
}