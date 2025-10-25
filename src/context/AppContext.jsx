import React, { useState, useEffect } from 'react';
import AppContext from './AppContextValue';
import storage from '../utils/storage';

// Premium loading component for context initialization
const ContextLoader = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    text: {
      color: 'white',
      fontSize: '16px',
      fontWeight: 500,
      margin: 0
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Initializing Application...</p>
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

export const AppProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [teams, setTeams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Initialize application state
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const savedUser = storage.get('user', null);
        const savedClients = storage.get('clients', []);
        const savedTeams = storage.get('teams', []);
        const savedNotifications = storage.get('notifications', []);
        const savedInvoices = storage.get('invoices', []);
        const savedExpenses = storage.get('expenses', []);

        console.log('🔄 Initializing application state...');
        console.log('📊 Loaded data:', {
          user: savedUser ? 'Yes' : 'No',
          clients: savedClients.length,
          teams: savedTeams.length,
          notifications: savedNotifications.length,
          invoices: savedInvoices.length,
          expenses: savedExpenses.length
        });

        setUser(savedUser);
        setClients(savedClients);
        setTeams(savedTeams);
        setNotifications(savedNotifications);
        setInvoices(savedInvoices);
        setExpenses(savedExpenses);

      } catch (error) {
        console.error('❌ Error initializing app:', error);
        // Initialize with empty state if there's an error
        setClients([]);
        setTeams([]);
        setNotifications([]);
        setInvoices([]);
        setExpenses([]);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  // Enhanced login with user profile creation
  const login = (email, userData = {}) => {
    const role = email.includes('admin') ? 'admin' : 
                 email.includes('manager') ? 'manager' : 'user';
    
    const userProfile = {
      id: `user-${Date.now()}`,
      email,
      role,
      name: userData.name || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: userData.phone || '',
      department: userData.department || 'General',
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=3b82f6&color=fff`,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...userData
    };

    setUser(userProfile);
    storage.set('user', userProfile);

    // Add login notification
    addNotification({
      title: 'Login Successful',
      message: `Welcome back, ${userProfile.name}! You've successfully logged in.`,
      category: 'success'
    });

    console.log('🔐 User logged in:', userProfile);
  };

  // Enhanced logout with cleanup
  const logout = () => {
    if (user) {
      addNotification({
        title: 'Logged Out',
        message: `You have been successfully logged out. See you soon, ${user.name}!`,
        category: 'info'
      });
    }
    
    setUser(null);
    storage.remove('user');
    console.log('🔒 User logged out');
  };

  // Enhanced client creation with validation
  const addClient = (client) => {
    console.log('➕ Adding new client:', client);
    
    const {
      name, email, phone, company,
      projectStart, projectDeadline, budget, currency, installments,
      attachments = [], paymentNote = '', teamId = '', serviceType = '', status = 'active',
      notes = ''
    } = client;

    // Calculate duration
    const duration = projectStart && projectDeadline ? 
      Math.ceil((new Date(projectDeadline) - new Date(projectStart)) / (1000 * 60 * 60 * 24)) : null;

    const clientWithId = {
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name, 
      email, 
      phone,
      company,
      projectStart, 
      projectDeadline, 
      duration,
      budget: budget ? parseFloat(budget) : null, 
      currency: currency || 'USD', 
      installments: installments ? parseInt(installments) : 1,
      attachments, 
      paymentNote, 
      teamId, 
      serviceType, 
      status,
      notes,
      // Additional metadata
      totalInvoiced: 0,
      totalPaid: 0,
      lastActivity: new Date().toISOString()
    };

    setClients((prev) => {
      const newClients = [clientWithId, ...prev];
      console.log('📁 Updated clients list:', newClients.length, 'clients');
      return newClients;
    });

    // Add creation notification
    addNotification({
      title: 'Client Created',
      message: `New client "${name}" has been added to the system.`,
      category: 'success',
      clientId: clientWithId.id
    });

    return clientWithId;
  };

  // Enhanced team creation
  const addTeam = (team) => {
    const teamWithId = { 
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...team,
      // Ensure arrays exist
      members: team.members || [],
      skills: team.skills || [],
      assignedClients: team.assignedClients || []
    };
    
    setTeams((prev) => [teamWithId, ...prev]);

    addNotification({
      title: 'Team Created',
      message: `New team "${team.name}" has been created.`,
      category: 'success'
    });

    return teamWithId;
  };

  // Enhanced invoice creation
  const addInvoice = (invoice) => {
    const {
      clientId, amount, currency, installments = 1, dueDate, 
      description = '', instructions = '', bankDetails = {}, projectType = '',
      taxRate = 0, discount = 0
    } = invoice;

    const subtotal = parseFloat(amount);
    const taxAmount = subtotal * (parseFloat(taxRate) || 0) / 100;
    const discountAmount = parseFloat(discount) || 0;
    const total = subtotal + taxAmount - discountAmount;

    const invoiceWithId = {
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      clientId, 
      amount: total,
      subtotal,
      taxAmount,
      discountAmount,
      taxRate: parseFloat(taxRate) || 0,
      discount: discountAmount,
      currency: currency || 'USD', 
      installments: parseInt(installments), 
      dueDate, 
      description, 
      instructions, 
      bankDetails,
      projectType,
      status: 'unpaid',
      payments: Array(parseInt(installments)).fill(null).map((_, index) => ({
        number: index + 1,
        amount: (total / parseInt(installments)).toFixed(2),
        dueDate: new Date(new Date(dueDate).getTime() + (index * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        status: 'pending',
        proofImage: null,
        paidDate: null
      }))
    };

    setInvoices((prev) => [invoiceWithId, ...prev]);

    addNotification({
      title: 'Invoice Created',
      message: `New invoice for ${total} ${currency} has been created.`,
      category: 'success'
    });

    return invoiceWithId;
  };

  // Enhanced expense creation
  const addExpense = (expense) => {
    const expenseWithId = { 
      id: `exp-${Date.now()}`, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...expense,
      category: expense.category || 'other',
      description: expense.description || ''
    };
    
    setExpenses((prev) => [expenseWithId, ...prev]);

    addNotification({
      title: 'Expense Recorded',
      message: `Expense "${expense.title}" of ${expense.amount} has been recorded.`,
      category: 'info'
    });

    return expenseWithId;
  };

  // Enhanced notification system
  const addNotification = (note) => {
    const notification = { 
      id: `notif-${Date.now()}`, 
      createdAt: new Date().toISOString(),
      read: false,
      ...note 
    };
    
    setNotifications((prev) => [notification, ...prev.slice(0, 49)]); // Keep last 50 notifications

    // Show browser notification if supported and enabled
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(note.title, {
        body: note.message,
        icon: '/favicon.ico'
      });
    }

    return notification;
  };

  // Enhanced client assignment
  const assignClientToTeam = (clientId, teamId) => {
    setClients((prev) => 
      prev.map((c) => 
        c.id === clientId ? { ...c, teamId, updatedAt: new Date().toISOString() } : c
      )
    );

    const client = clients.find(c => c.id === clientId);
    const team = teams.find(t => t.id === teamId);

    if (client && team) {
      addNotification({
        title: 'Client Assigned',
        message: `${client.name} has been assigned to ${team.name}`,
        category: 'info',
        clientId,
        teamId
      });
    }
  };

  // Update client details
  const updateClient = (clientId, updates) => {
    setClients((prev) => 
      prev.map(c => 
        c.id === clientId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      )
    );

    const client = clients.find(c => c.id === clientId);
    if (client) {
      addNotification({
        title: 'Client Updated',
        message: `Client "${client.name}" has been updated.`,
        category: 'success',
        clientId
      });
    }
  };

  // Update invoice details
  const updateInvoice = (invoiceId, updates) => {
    setInvoices((prev) => 
      prev.map(inv => 
        inv.id === invoiceId ? { ...inv, ...updates, updatedAt: new Date().toISOString() } : inv
      )
    );
  };

  // Delete team with cleanup
  const deleteTeam = (teamId) => {
    setTeams((prev) => prev.filter(t => t.id !== teamId));
    
    // Unassign clients from deleted team
    setClients((prev) => 
      prev.map(c => 
        c.teamId === teamId ? { ...c, teamId: null, updatedAt: new Date().toISOString() } : c
      )
    );
  };

  // Delete client with cleanup
  const deleteClient = (clientId) => {
    setClients((prev) => prev.filter(c => c.id !== clientId));
    
    // Remove client's invoices
    setInvoices((prev) => prev.filter(inv => inv.clientId !== clientId));
  };

  // Persist data to storage whenever state changes
  useEffect(() => {
    if (isInitialized) {
      storage.set('clients', clients);
    }
  }, [clients, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      storage.set('teams', teams);
    }
  }, [teams, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      storage.set('notifications', notifications);
    }
  }, [notifications, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      storage.set('invoices', invoices);
    }
  }, [invoices, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      storage.set('expenses', expenses);
    }
  }, [expenses, isInitialized]);

  // Request notification permission on app start
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Show initialization loader
  if (!isInitialized) {
    return <ContextLoader />;
  }

  const value = {
    // User management
    user,
    login,
    logout,
    setUser,

    // Clients
    clients,
    addClient,
    updateClient,
    deleteClient,
    assignClientToTeam,

    // Teams
    teams,
    addTeam,
    deleteTeam,

    // Notifications
    notifications,
    setNotifications,
    addNotification,

    // Invoices
    invoices,
    addInvoice,
    updateInvoice,

    // Expenses
    expenses,
    addExpense,

    // Additional utility functions
    getClientById: (id) => clients.find(c => c.id === id),
    getTeamById: (id) => teams.find(t => t.id === id),
    getClientInvoices: (clientId) => invoices.filter(inv => inv.clientId === clientId),
    getTeamClients: (teamId) => clients.filter(c => c.teamId === teamId),
    
    // Statistics
    stats: {
      totalClients: clients.length,
      totalTeams: teams.length,
      totalInvoices: invoices.length,
      totalExpenses: expenses.length,
      unreadNotifications: notifications.filter(n => !n.read).length,
      totalRevenue: invoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0),
      totalExpensesAmount: expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0)
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;