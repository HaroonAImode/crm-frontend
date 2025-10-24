import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  const { user } = useContext(AppContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/clients" element={<ProtectedRoute><Layout><Clients /></Layout></ProtectedRoute>} />
      <Route path="/clients/add" element={<ProtectedRoute><Layout><AddClient /></Layout></ProtectedRoute>} />
      <Route path="/clients/:id" element={<ProtectedRoute><Layout><ClientDetail /></Layout></ProtectedRoute>} />
      <Route path="/teams" element={<ProtectedRoute><Layout><Teams /></Layout></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />
  <Route path="/invoices" element={<ProtectedRoute><Layout><Invoices /></Layout></ProtectedRoute>} />
  <Route path="/expenses" element={<ProtectedRoute><Layout><Expenses /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
