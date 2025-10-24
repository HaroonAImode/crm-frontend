// src/context/AppContext.jsx

import React, { useState, useEffect } from 'react';
import AppContext from './AppContextValue';
import storage from '../utils/storage';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get('user', null));
  const [clients, setClients] = useState(() => {
    const savedClients = storage.get('clients', []);
    console.log('Loading clients from storage:', savedClients);
    return savedClients;
  });
  const [teams, setTeams] = useState(() => storage.get('teams', []));
  const [notifications, setNotifications] = useState(() => storage.get('notifications', []));
  const [invoices, setInvoices] = useState(() => storage.get('invoices', []));
  const [expenses, setExpenses] = useState(() => storage.get('expenses', []));

  const login = (email) => {
    const role = email.includes('admin') ? 'admin' : 'team';
    const u = { email, role };
    setUser(u);
    storage.set('user', u);
  };

  const logout = () => {
    setUser(null);
    storage.remove('user');
  };

  // Extended client creation: supports project, budget, currency, installments, attachments, team assignment
  const addClient = (client) => {
    console.log('Adding new client:', client);
    const {
      name, email, phone,
      projectStart, projectDeadline, budget, currency, installments,
      attachments = [], paymentNote = '', teamId = '', serviceType = '', status = 'active'
    } = client;
    // Calculate duration
    const duration = projectStart && projectDeadline ? Math.ceil((new Date(projectDeadline) - new Date(projectStart)) / (1000*60*60*24)) : null;
    const withId = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      name, email, phone,
      projectStart, projectDeadline, duration,
      budget, currency, installments,
      attachments, paymentNote, teamId, serviceType, status
    };
    setClients((prev) => {
      const newClients = [withId, ...prev];
      console.log('Updated clients list:', newClients);
      storage.set('clients', newClients);
      return newClients;
    });
    return withId;
  };

  const addTeam = (team) => {
    const withId = { id: Date.now().toString(), ...team };
    setTeams((prev) => [withId, ...prev]);
    return withId;
  };

  // Extended invoice creation: supports installments, proofs, payment status
  const addInvoice = (invoice) => {
    const {
      clientId, amount, currency, installments = 1, dueDate, instructions = '', proofs = [], payments = []
    } = invoice;
    const withId = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      clientId, amount, currency, installments, dueDate, instructions, proofs, payments
    };
    setInvoices((prev) => [withId, ...prev]);
    return withId;
  };

  const addExpense = (expense) => {
    const withId = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...expense };
    setExpenses((prev) => [withId, ...prev]);
    return withId;
  };

  const addNotification = (note) => {
    const n = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...note };
    setNotifications((prev) => [n, ...prev]);
    return n;
  };

  const assignClientToTeam = (clientId, teamId) => {
    setClients((prev) => prev.map((c) => (c.id === clientId ? { ...c, teamId } : c)));
  };

  // Update client details - used in edit form
  const UPDATE_CLIENT = (clientId, updates) => {
    setClients((prev) => prev.map(c => c.id === clientId ? { ...c, ...updates } : c));
  };

  // Update invoice details - used in edit form
  const UPDATE_INVOICE = (invoiceId, updates) => {
    setInvoices((prev) => prev.map(inv => inv.id === invoiceId ? { ...inv, ...updates } : inv));
  };

  // persist to storage whenever these collections change
  useEffect(() => storage.set('clients', clients), [clients]);
  useEffect(() => storage.set('teams', teams), [teams]);
  useEffect(() => storage.set('notifications', notifications), [notifications]);
  useEffect(() => storage.set('invoices', invoices), [invoices]);
  useEffect(() => storage.set('expenses', expenses), [expenses]);

  const value = {
    user,
    login,
    logout,
    clients,
    addClient,
    teams,
    addTeam,
    notifications,
    setNotifications,
    addNotification,
    invoices,
    addInvoice,
    UPDATE_INVOICE,
    expenses,
    addExpense,
    assignClientToTeam,
    UPDATE_CLIENT,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
