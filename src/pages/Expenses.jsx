import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContextValue';

const Expenses = () => {
  const { expenses = [], addExpense, addNotification } = useAppContext();
  const [activeTab, setActiveTab] = useState('expenses');
  const [form, setForm] = useState({ 
    title: '', 
    amount: '', 
    category: 'office',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [salaryForm, setSalaryForm] = useState({
    teamId: '',
    month: new Date().toISOString().slice(0, 7),
    bonus: '',
    deductions: ''
  });
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for the component
  const monthlyRevenue = useMemo(() => [
    { month: 'Jan', revenue: 85000, expenses: 45000 },
    { month: 'Feb', revenue: 92000, expenses: 48000 },
    { month: 'Mar', revenue: 78000, expenses: 42000 },
    { month: 'Apr', revenue: 95000, expenses: 52000 },
    { month: 'May', revenue: 88000, expenses: 46000 },
    { month: 'Jun', revenue: 97000, expenses: 51000 }
  ], []);

  const teamSalaries = useMemo(() => [
    { id: 'dev', name: 'Development', baseSalary: 30000, bonus: 5000, members: 8 },
    { id: 'design', name: 'Design', baseSalary: 22000, bonus: 3000, members: 5 },
    { id: 'marketing', name: 'Marketing', baseSalary: 18000, bonus: 4000, members: 4 },
    { id: 'sales', name: 'Sales', baseSalary: 25000, bonus: 7000, members: 6 }
  ], []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);
    const totalSalaries = teamSalaries.reduce((sum, team) => sum + team.baseSalary + team.bonus, 0);
    const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
    const netProfit = totalRevenue - totalExpenses - totalSalaries;

    return {
      totalExpenses,
      totalSalaries,
      totalRevenue,
      netProfit
    };
  }, [expenses, teamSalaries, monthlyRevenue]);

  const filteredExpenses = useMemo(() => {
    if (filter === 'all') return expenses;
    if (filter === 'month') {
      const thisMonth = new Date().getMonth();
      return expenses.filter(exp => new Date(exp.date).getMonth() === thisMonth);
    }
    return expenses.filter(exp => exp.category === filter);
  }, [expenses, filter]);

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
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
      transition: 'all 0.2s ease'
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
    filterContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '8px 16px',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      background: '#ffffff',
      fontSize: '13px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    activeFilter: {
      background: '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
    },
    expenseList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    expenseItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      background: '#f8fafc',
      borderRadius: '10px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease'
    },
    expenseInfo: {
      flex: 1
    },
    expenseTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 4px 0'
    },
    expenseMeta: {
      fontSize: '13px',
      color: '#64748b',
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    },
    expenseAmount: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#ef4444'
    },
    categoryBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    },
    statCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9',
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
    positiveAmount: {
      color: '#10b981'
    },
    negativeAmount: {
      color: '#ef4444'
    },
    salaryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    },
    teamSalaryCard: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    },
    teamHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    teamName: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1e293b',
      margin: 0
    },
    salaryAmount: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#3b82f6'
    },
    salaryDetails: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      color: '#64748b',
      marginBottom: '4px'
    },
    chartContainer: {
      background: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid #f1f5f9',
      marginBottom: '20px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      marginBottom: '16px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    },
    emptyStateTitle: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
      color: '#475569'
    }
  };

  // Expense categories with colors
  const expenseCategories = [
    { value: 'office', label: 'Office Supplies', color: '#3b82f6' },
    { value: 'software', label: 'Software Tools', color: '#8b5cf6' },
    { value: 'marketing', label: 'Marketing', color: '#ec4899' },
    { value: 'travel', label: 'Travel', color: '#f59e0b' },
    { value: 'utilities', label: 'Utilities', color: '#10b981' },
    { value: 'salaries', label: 'Salaries', color: '#ef4444' },
    { value: 'equipment', label: 'Equipment', color: '#6b7280' },
    { value: 'other', label: 'Other', color: '#64748b' }
  ];

  // Get category by value with fallback
  const getCategoryByValue = (categoryValue) => {
    return expenseCategories.find(cat => cat.value === categoryValue) || 
           { label: 'Other', color: '#64748b' };
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) {
      addNotification({
        title: 'Validation Error',
        message: 'Title and amount are required',
        category: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      const expenseData = {
        id: `EXP-${Date.now()}`,
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        date: form.date,
        description: form.description,
        createdAt: new Date().toISOString()
      };

      await addExpense(expenseData);
      
      addNotification({
        title: 'Expense Added',
        message: `Expense "${form.title}" has been recorded`,
        category: 'success'
      });

      setForm({ 
        title: '', 
        amount: '', 
        category: 'office',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      addNotification({
        title: 'Error',
        message: 'Failed to add expense. Please try again.',
        category: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitSalary = (e) => {
    e.preventDefault();
    if (!salaryForm.teamId) {
      addNotification({
        title: 'Validation Error',
        message: 'Please select a team',
        category: 'error'
      });
      return;
    }

    // In a real app, this would update the team salary data
    const selectedTeam = teamSalaries.find(t => t.id === salaryForm.teamId);
    addNotification({
      title: 'Salary Updated',
      message: `Salary data for ${selectedTeam?.name || 'selected team'} has been updated`,
      category: 'success'
    });

    setSalaryForm({
      teamId: '',
      month: new Date().toISOString().slice(0, 7),
      bonus: '',
      deductions: ''
    });
  };

  // Simple bar chart component for revenue vs expenses
  const RevenueExpenseChart = () => {
    const maxValue = Math.max(...monthlyRevenue.flatMap(m => [m.revenue, m.expenses]));
    
    return (
      <div style={{ display: 'flex', alignItems: 'end', gap: '12px', height: '200px', padding: '20px 0' }}>
        {monthlyRevenue.map((month, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'end', gap: '2px', height: '120px' }}>
              <div
                style={{
                  height: `${(month.revenue / maxValue) * 100}%`,
                  background: 'linear-gradient(to top, #10b981, #34d399)',
                  width: '12px',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '2px'
                }}
                title={`Revenue: $${month.revenue.toLocaleString()}`}
              />
              <div
                style={{
                  height: `${(month.expenses / maxValue) * 100}%`,
                  background: 'linear-gradient(to top, #ef4444, #f87171)',
                  width: '12px',
                  borderRadius: '4px 4px 0 0',
                  minHeight: '2px'
                }}
                title={`Expenses: $${month.expenses.toLocaleString()}`}
              />
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>{month.month}</div>
          </div>
        ))}
      </div>
    );
  };

  // Show empty state if no expenses
  if (!isLoading && (!expenses || expenses.length === 0) && activeTab === 'expenses') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Financial Management</h1>
            <div style={styles.subtitle}>Track expenses, salaries, and revenue in one place</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabContainer}>
          {['expenses', 'salaries', 'reports'].map(tab => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={styles.contentCard}>
          <div style={styles.emptyState}>
            <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>💰</div>
            <div style={styles.emptyStateTitle}>No Expenses Recorded</div>
            <div style={{marginBottom: '20px', color: '#64748b'}}>
              Start tracking your business expenses to get better financial insights
            </div>
            <button
              onClick={() => setActiveTab('expenses')}
              style={{...styles.button, ...styles.primaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              💰 Record Your First Expense
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Financial Management</h1>
          <div style={styles.subtitle}>Track expenses, salaries, and revenue in one place</div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Revenue</div>
          <div style={{...styles.statValue, ...styles.positiveAmount}}>${stats.totalRevenue.toLocaleString()}</div>
          <div style={{fontSize: '12px', color: '#10b981'}}>+12.5% from last period</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Expenses</div>
          <div style={{...styles.statValue, ...styles.negativeAmount}}>${stats.totalExpenses.toLocaleString()}</div>
          <div style={{fontSize: '12px', color: '#ef4444'}}>+8.2% from last period</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Salary Costs</div>
          <div style={{...styles.statValue, ...styles.negativeAmount}}>${stats.totalSalaries.toLocaleString()}</div>
          <div style={{fontSize: '12px', color: '#64748b'}}>Monthly payroll</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Net Profit</div>
          <div style={{...styles.statValue, ...(stats.netProfit >= 0 ? styles.positiveAmount : styles.negativeAmount)}}>
            ${Math.abs(stats.netProfit).toLocaleString()}
          </div>
          <div style={{fontSize: '12px', color: stats.netProfit >= 0 ? '#10b981' : '#ef4444'}}>
            {stats.netProfit >= 0 ? 'Profit' : 'Loss'}
          </div>
        </div>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div style={styles.chartContainer}>
        <div style={styles.chartTitle}>Revenue vs Expenses (Last 6 Months)</div>
        <RevenueExpenseChart />
        <div style={{display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'}}>
            <div style={{width: '12px', height: '12px', background: '#10b981', borderRadius: '2px'}}></div>
            Revenue
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'}}>
            <div style={{width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px'}}></div>
            Expenses
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabContainer}>
        {['expenses', 'salaries', 'reports'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
          {/* Add Expense Form */}
          <div style={styles.contentCard}>
            <h3 style={{marginTop: 0, marginBottom: '20px'}}>Add New Expense</h3>
            <form onSubmit={submitExpense}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Expense Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    style={styles.input}
                    placeholder="e.g., Office Rent, Software Subscription"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Amount ($) *</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={e => setForm({...form, amount: e.target.value})}
                    style={styles.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({...form, category: e.target.value})}
                    style={styles.select}
                  >
                    {expenseCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                  style={styles.textarea}
                  placeholder="Additional details about this expense..."
                />
              </div>

              <button 
                type="submit" 
                style={{...styles.button, ...styles.primaryButton}}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Expense'}
              </button>
            </form>
          </div>

          {/* Expenses List */}
          <div style={styles.contentCard}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{margin: 0}}>Expense History ({filteredExpenses.length})</h3>
              <div style={styles.filterContainer}>
                <button
                  style={{
                    ...styles.filterButton,
                    ...(filter === 'all' ? styles.activeFilter : {})
                  }}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                {expenseCategories.map(cat => (
                  <button
                    key={cat.value}
                    style={{
                      ...styles.filterButton,
                      ...(filter === cat.value ? styles.activeFilter : {})
                    }}
                    onClick={() => setFilter(cat.value)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.expenseList}>
              {filteredExpenses.length === 0 ? (
                <div style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>
                  {filter === 'all' 
                    ? 'No expenses recorded yet. Add your first expense to get started.' 
                    : `No ${expenseCategories.find(cat => cat.value === filter)?.label.toLowerCase()} expenses found.`
                  }
                </div>
              ) : (
                filteredExpenses.map(exp => {
                  const category = getCategoryByValue(exp.category);
                  return (
                    <div key={exp.id} style={styles.expenseItem}>
                      <div style={styles.expenseInfo}>
                        <div style={styles.expenseTitle}>{exp.title}</div>
                        <div style={styles.expenseMeta}>
                          <span style={{
                            ...styles.categoryBadge,
                            background: `${category.color}20`,
                            color: category.color
                          }}>
                            {category.label}
                          </span>
                          <span>{new Date(exp.date).toLocaleDateString()}</span>
                          {exp.description && (
                            <span style={{fontStyle: 'italic'}}>{exp.description}</span>
                          )}
                        </div>
                      </div>
                      <div style={styles.expenseAmount}>
                        -${typeof exp.amount === 'number' ? exp.amount.toLocaleString() : parseFloat(exp.amount || 0).toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Salaries Tab */}
      {activeTab === 'salaries' && (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
          {/* Salary Management Form */}
          <div style={styles.contentCard}>
            <h3 style={{marginTop: 0, marginBottom: '20px'}}>Manage Salaries</h3>
            <form onSubmit={submitSalary}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Select Team</label>
                  <select
                    value={salaryForm.teamId}
                    onChange={e => setSalaryForm({...salaryForm, teamId: e.target.value})}
                    style={styles.select}
                  >
                    <option value="">— Select Team —</option>
                    {teamSalaries.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Month</label>
                  <input
                    type="month"
                    value={salaryForm.month}
                    onChange={e => setSalaryForm({...salaryForm, month: e.target.value})}
                    style={styles.input}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Bonus Amount ($)</label>
                  <input
                    type="number"
                    value={salaryForm.bonus}
                    onChange={e => setSalaryForm({...salaryForm, bonus: e.target.value})}
                    style={styles.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Deductions ($)</label>
                  <input
                    type="number"
                    value={salaryForm.deductions}
                    onChange={e => setSalaryForm({...salaryForm, deductions: e.target.value})}
                    style={styles.input}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{...styles.button, ...styles.primaryButton}}
              >
                Update Salary
              </button>
            </form>
          </div>

          {/* Team Salaries Overview */}
          <div style={styles.contentCard}>
            <h3 style={{marginTop: 0, marginBottom: '20px'}}>Team Salary Overview</h3>
            <div style={styles.salaryGrid}>
              {teamSalaries.map(team => (
                <div key={team.id} style={styles.teamSalaryCard}>
                  <div style={styles.teamHeader}>
                    <div style={styles.teamName}>{team.name}</div>
                    <div style={styles.salaryAmount}>${(team.baseSalary + team.bonus).toLocaleString()}</div>
                  </div>
                  <div style={styles.salaryDetails}>
                    <span>Base Salary:</span>
                    <span>${team.baseSalary.toLocaleString()}</span>
                  </div>
                  <div style={styles.salaryDetails}>
                    <span>Bonus:</span>
                    <span style={{color: '#10b981'}}>+${team.bonus.toLocaleString()}</span>
                  </div>
                  <div style={styles.salaryDetails}>
                    <span>Members:</span>
                    <span>{team.members} people</span>
                  </div>
                  <div style={{...styles.salaryDetails, fontWeight: 600, marginTop: '8px'}}>
                    <span>Per Member:</span>
                    <span>${Math.round((team.baseSalary + team.bonus) / team.members).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div style={styles.contentCard}>
          <h3 style={{marginTop: 0, marginBottom: '20px'}}>Financial Reports</h3>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Report Type</label>
              <select style={styles.select}>
                <option>Expense Report</option>
                <option>Salary Report</option>
                <option>Profit & Loss</option>
                <option>Tax Summary</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Start Date</label>
              <input type="date" style={styles.input} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>End Date</label>
              <input type="date" style={styles.input} />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Format</label>
              <select style={styles.select}>
                <option>PDF</option>
                <option>Excel</option>
                <option>HTML</option>
              </select>
            </div>
          </div>

          <button 
            style={{...styles.button, ...styles.primaryButton}}
          >
            📊 Generate Report
          </button>

          <div style={{marginTop: '32px', padding: '20px', background: '#f8fafc', borderRadius: '10px'}}>
            <h4 style={{margin: '0 0 16px 0'}}>Quick Stats</h4>
            <div style={styles.formGrid}>
              <div>
                <div style={{fontSize: '13px', color: '#64748b'}}>Most Expensive Category</div>
                <div style={{fontSize: '16px', fontWeight: 600}}>
                  {expenses.length > 0 
                    ? expenseCategories.find(cat => 
                        cat.value === expenses.reduce((max, exp) => 
                          parseFloat(exp.amount) > parseFloat(max.amount) ? exp : max
                        ).category
                      )?.label || 'Salaries'
                    : 'Salaries'
                  }
                </div>
              </div>
              <div>
                <div style={{fontSize: '13px', color: '#64748b'}}>Average Monthly Expense</div>
                <div style={{fontSize: '16px', fontWeight: 600}}>
                  ${expenses.length > 0 ? Math.round(stats.totalExpenses / 6).toLocaleString() : '0'}
                </div>
              </div>
              <div>
                <div style={{fontSize: '13px', color: '#64748b'}}>Profit Margin</div>
                <div style={{fontSize: '16px', fontWeight: 600, color: '#10b981'}}>
                  {stats.totalRevenue > 0 ? ((stats.netProfit / stats.totalRevenue) * 100).toFixed(1) : '0.0'}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;