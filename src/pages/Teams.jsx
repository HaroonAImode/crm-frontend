import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContextValue';
import ModalPopup from '../components/ModalPopup';
import FilterBar from '../components/FilterBar';

const Teams = () => {
  const { teams, clients, addTeam, updateTeam, deleteTeam, assignClientToTeam, addNotification, user } = useAppContext();
  const [modal, setModal] = useState({ open: false, type: null, data: null });
  const [filter, setFilter] = useState('all');
  const [selectedClients, setSelectedClients] = useState({});
  const [form, setForm] = useState({
    name: '',
    description: '',
    department: '',
    teamLead: '',
    members: [],
    skills: [],
    color: '#3b82f6'
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
    successButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },
    dangerButton: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white'
    },
    contentCard: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: '1px solid #f1f5f9',
      marginBottom: '20px'
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
    teamsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px'
    },
    teamCard: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    teamCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      borderColor: '#3b82f6'
    },
    teamHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    teamName: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1e293b',
      margin: '0 0 4px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    teamDepartment: {
      fontSize: '14px',
      color: '#64748b',
      margin: 0
    },
    teamColorBadge: {
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      border: '2px solid #ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    teamDescription: {
      fontSize: '14px',
      color: '#64748b',
      lineHeight: '1.5',
      marginBottom: '16px'
    },
    teamStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '8px'
    },
    statItem: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '2px'
    },
    statText: {
      fontSize: '11px',
      color: '#64748b',
      textTransform: 'uppercase',
      fontWeight: 600
    },
    membersList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '16px'
    },
    memberItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      background: '#f8fafc',
      borderRadius: '6px'
    },
    memberAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px'
    },
    memberInfo: {
      flex: 1
    },
    memberName: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#1e293b',
      margin: 0
    },
    memberRole: {
      fontSize: '12px',
      color: '#64748b',
      margin: 0
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '16px'
    },
    skillTag: {
      padding: '4px 8px',
      background: '#f0f9ff',
      color: '#0369a1',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 600
    },
    actionButtons: {
      display: 'flex',
      gap: '8px',
      marginTop: '16px'
    },
    smallButton: {
      padding: '8px 12px',
      fontSize: '12px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      flex: 1
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
    colorPicker: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginTop: '8px'
    },
    colorOption: {
      width: '30px',
      height: '30px',
      borderRadius: '6px',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.2s ease'
    },
    colorOptionSelected: {
      borderColor: '#1e293b',
      transform: 'scale(1.1)'
    },
    clientsSection: {
      marginTop: '20px',
      padding: '16px',
      background: '#f8fafc',
      borderRadius: '8px'
    },
    clientsTitle: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#374151',
      marginBottom: '12px'
    },
    clientAssignment: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginBottom: '8px'
    },
    clientSelect: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '13px',
      background: '#ffffff'
    },
    assignButton: {
      padding: '8px 12px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    assignedClients: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      marginTop: '12px'
    },
    assignedClient: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      background: '#ffffff',
      borderRadius: '6px',
      border: '1px solid #e2e8f0'
    },
    clientName: {
      fontSize: '13px',
      fontWeight: 500,
      color: '#374151'
    },
    removeButton: {
      padding: '4px 8px',
      background: '#fef2f2',
      color: '#dc2626',
      border: 'none',
      borderRadius: '4px',
      fontSize: '11px',
      cursor: 'pointer'
    }
  };

  // Team statistics
  const teamStats = useMemo(() => {
    const totalTeams = teams.length;
    const totalMembers = teams.reduce((sum, team) => sum + (team.members?.length || 0), 0);
    const totalClients = clients.filter(client => client.teamId).length;
    const unassignedClients = clients.filter(client => !client.teamId).length;
    
    return {
      totalTeams,
      totalMembers,
      totalClients,
      unassignedClients,
      avgMembersPerTeam: totalTeams > 0 ? (totalMembers / totalTeams).toFixed(1) : 0
    };
  }, [teams, clients]);

  // Available team colors
  const teamColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
  ];

  // Departments
  const departments = [
    'Design', 'Development', 'Marketing', 'Sales', 'Content',
    'SEO', 'Project Management', 'Quality Assurance', 'Support', 'Operations'
  ];

  // Skills
  const availableSkills = [
    'UI/UX Design', 'Frontend Development', 'Backend Development', 'React', 'Vue',
    'Node.js', 'Python', 'SEO Optimization', 'Content Writing', 'Social Media',
    'Graphic Design', 'Project Management', 'Quality Assurance', 'DevOps', 'Mobile Development'
  ];

  // Filter teams
  const filteredTeams = useMemo(() => {
    let filtered = teams;
    
    if (filter === 'design') {
      filtered = filtered.filter(team => team.department?.toLowerCase().includes('design'));
    } else if (filter === 'development') {
      filtered = filtered.filter(team => team.department?.toLowerCase().includes('development'));
    } else if (filter === 'marketing') {
      filtered = filtered.filter(team => team.department?.toLowerCase().includes('marketing'));
    } else if (filter === 'empty') {
      filtered = filtered.filter(team => !team.members || team.members.length === 0);
    }
    
    return filtered;
  }, [teams, filter]);

  // Available clients for assignment (unassigned or assigned to this team)
  const getAvailableClients = (teamId) => {
    return clients.filter(client => !client.teamId || client.teamId === teamId);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    
    if (!form.name) {
      addNotification({
        title: 'Validation Error',
        message: 'Team name is required',
        category: 'error'
      });
      return;
    }

    const teamData = {
      ...form,
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString(),
      members: form.members || [],
      skills: form.skills || [],
      assignedClients: []
    };

    addTeam(teamData);
    
    addNotification({
      title: 'Team Created',
      message: `Team "${form.name}" has been created successfully`,
      category: 'success'
    });

    setForm({
      name: '',
      description: '',
      department: '',
      teamLead: '',
      members: [],
      skills: [],
      color: '#3b82f6'
    });
    
    setModal({ open: false, type: null, data: null });
  };

  const handleUpdateTeam = (team) => {
    setForm({
      name: team.name,
      description: team.description,
      department: team.department,
      teamLead: team.teamLead,
      members: team.members || [],
      skills: team.skills || [],
      color: team.color || '#3b82f6'
    });
    setModal({ open: true, type: 'edit', data: team });
  };

  const handleDeleteTeam = (team) => {
    if (window.confirm(`Are you sure you want to delete team "${team.name}"? This action cannot be undone.`)) {
      // Unassign all clients from this team first
      clients.forEach(client => {
        if (client.teamId === team.id) {
          assignClientToTeam(client.id, null);
        }
      });
      
      deleteTeam(team.id);
      
      addNotification({
        title: 'Team Deleted',
        message: `Team "${team.name}" has been deleted`,
        category: 'success'
      });
    }
  };

  const handleUnassignClient = (clientId) => {
    assignClientToTeam(clientId, null);
    
    const client = clients.find(c => c.id === clientId);
    
    addNotification({
      title: 'Client Unassigned',
      message: `${client.name} has been unassigned from team`,
      category: 'info'
    });
  };

  const getAssignedClients = (teamId) => {
    return clients.filter(client => client.teamId === teamId);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filtersList = [
    { label: 'All Teams', value: 'all' },
    { label: 'Design', value: 'design' },
    { label: 'Development', value: 'development' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Empty Teams', value: 'empty' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Team Management</h1>
          <div style={styles.subtitle}>Organize your agency teams and assign clients</div>
        </div>
        <button
          onClick={() => setModal({ open: true, type: 'create', data: null })}
          style={{...styles.button, ...styles.primaryButton}}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.target.style.transform = 'none'}
        >
          👥 Create New Team
        </button>
      </div>

      {/* Statistics Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Teams</div>
          <div style={styles.statValue}>{teamStats.totalTeams}</div>
          <div style={{fontSize: '12px', color: '#3b82f6'}}>Active departments</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Team Members</div>
          <div style={styles.statValue}>{teamStats.totalMembers}</div>
          <div style={{fontSize: '12px', color: '#10b981'}}>Across all teams</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Assigned Clients</div>
          <div style={styles.statValue}>{teamStats.totalClients}</div>
          <div style={{fontSize: '12px', color: '#8b5cf6'}}>{teamStats.unassignedClients} unassigned</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Avg. Team Size</div>
          <div style={styles.statValue}>{teamStats.avgMembersPerTeam}</div>
          <div style={{fontSize: '12px', color: '#f59e0b'}}>Members per team</div>
        </div>
      </div>

      <FilterBar filters={filtersList} active={filter} onChange={setFilter} />

      <div style={styles.contentCard}>
        {filteredTeams.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#64748b'}}>
            <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>👥</div>
            <div style={{fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#475569'}}>
              No teams found
            </div>
            <div style={{marginBottom: '20px'}}>
              {filter === 'all' 
                ? "Get started by creating your first team"
                : `No ${filter} teams found`}
            </div>
            <button
              onClick={() => setModal({ open: true, type: 'create', data: null })}
              style={{...styles.button, ...styles.primaryButton}}
            >
              👥 Create Your First Team
            </button>
          </div>
        ) : (
          <div style={styles.teamsGrid}>
            {filteredTeams.map(team => {
              const assignedClients = getAssignedClients(team.id);
              const availableClients = getAvailableClients(team.id);
              
              return (
                <div
                  key={team.id}
                  style={{
                    ...styles.teamCard,
                    borderLeft: `4px solid ${team.color || '#3b82f6'}`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style = {...styles.teamCard, ...styles.teamCardHover, borderLeft: `4px solid ${team.color || '#3b82f6'}`}}
                  onMouseLeave={(e) => e.currentTarget.style = {...styles.teamCard, borderLeft: `4px solid ${team.color || '#3b82f6'}`}}
                >
                  <div style={styles.teamHeader}>
                    <div style={{flex: 1}}>
                      <div style={styles.teamName}>
                        {team.name}
                        <div 
                          style={{
                            ...styles.teamColorBadge,
                            background: team.color || '#3b82f6'
                          }}
                          title="Team Color"
                        />
                      </div>
                      <div style={styles.teamDepartment}>
                        {team.department} {team.teamLead && `• Lead: ${team.teamLead}`}
                      </div>
                    </div>
                  </div>

                  {team.description && (
                    <div style={styles.teamDescription}>
                      {team.description}
                    </div>
                  )}

                  <div style={styles.teamStats}>
                    <div style={styles.statItem}>
                      <div style={styles.statNumber}>{team.members?.length || 0}</div>
                      <div style={styles.statText}>Members</div>
                    </div>
                    <div style={styles.statItem}>
                      <div style={styles.statNumber}>{assignedClients.length}</div>
                      <div style={styles.statText}>Clients</div>
                    </div>
                    <div style={styles.statItem}>
                      <div style={styles.statNumber}>{team.skills?.length || 0}</div>
                      <div style={styles.statText}>Skills</div>
                    </div>
                  </div>

                  {/* Team Members */}
                  {team.members && team.members.length > 0 && (
                    <div style={styles.membersList}>
                      <div style={styles.label}>Team Members</div>
                      {team.members.slice(0, 3).map((member, index) => (
                        <div key={index} style={styles.memberItem}>
                          <div style={styles.memberAvatar}>
                            {getInitials(member)}
                          </div>
                          <div style={styles.memberInfo}>
                            <div style={styles.memberName}>{member}</div>
                            <div style={styles.memberRole}>Team Member</div>
                          </div>
                        </div>
                      ))}
                      {team.members.length > 3 && (
                        <div style={{fontSize: '12px', color: '#64748b', textAlign: 'center', padding: '8px'}}>
                          +{team.members.length - 3} more members
                        </div>
                      )}
                    </div>
                  )}

                  {/* Skills */}
                  {team.skills && team.skills.length > 0 && (
                    <div style={styles.skillsContainer}>
                      {team.skills.slice(0, 5).map((skill, index) => (
                        <div key={index} style={styles.skillTag}>
                          {skill}
                        </div>
                      ))}
                      {team.skills.length > 5 && (
                        <div style={styles.skillTag}>
                          +{team.skills.length - 5}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Client Assignment Section */}
                  <div style={styles.clientsSection}>
                    <div style={styles.clientsTitle}>Assigned Clients</div>
                    
                    {/* Client Assignment Form */}
                    <div style={styles.clientAssignment}>
                      <select
                        value={selectedClients[team.id] || ''}
                        onChange={(e) => setSelectedClients({...selectedClients, [team.id]: e.target.value})}
                        style={styles.clientSelect}
                      >
                        <option value="">Select client to assign</option>
                        {availableClients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name} {client.company ? `(${client.company})` : ''}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          const selectedClientId = selectedClients[team.id];
                          if (selectedClientId) {
                            assignClientToTeam(team.id, selectedClientId);
                            setSelectedClients({...selectedClients, [team.id]: ''});
                          }
                        }}
                        style={styles.assignButton}
                        disabled={!selectedClients[team.id]}
                        onMouseEnter={(e) => selectedClients[team.id] && (e.target.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => selectedClients[team.id] && (e.target.style.transform = 'none')}
                      >
                        Assign
                      </button>
                    </div>

                    {/* Assigned Clients List */}
                    {assignedClients.length > 0 && (
                      <div style={styles.assignedClients}>
                        {assignedClients.map(client => (
                          <div key={client.id} style={styles.assignedClient}>
                            <div style={styles.clientName}>{client.name}</div>
                            <button
                              onClick={() => handleUnassignClient(client.id)}
                              style={styles.removeButton}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={styles.actionButtons}>
                    <button
                      style={{...styles.smallButton, ...styles.secondaryButton}}
                      onClick={() => handleUpdateTeam(team)}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'none'}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{...styles.smallButton, ...styles.primaryButton}}
                      onClick={() => setModal({ open: true, type: 'detail', data: team })}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'none'}
                    >
                      👁️ View
                    </button>
                    {user?.role === 'admin' && (
                      <button
                        style={{...styles.smallButton, ...styles.dangerButton}}
                        onClick={() => handleDeleteTeam(team)}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'none'}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Team Modal */}
      <ModalPopup 
        open={modal.open} 
        onClose={() => setModal({ open: false, type: null, data: null })}
        title={modal.type === 'create' ? 'Create New Team' : `Edit Team - ${modal.data?.name}`}
      >
        {['create', 'edit'].includes(modal.type) && (
          <div style={{padding: '20px', maxHeight: '70vh', overflowY: 'auto'}}>
            <form onSubmit={modal.type === 'create' ? handleCreateTeam : (e) => {
              e.preventDefault();
              const updatedTeam = { ...modal.data, ...form };
              updateTeam(updatedTeam);
              addNotification({
                title: 'Team Updated',
                message: `Team "${form.name}" has been updated`,
                category: 'success'
              });
              setModal({ open: false, type: null, data: null });
            }}>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Team Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                    onBlur={(e) => e.target.style = styles.input}
                    placeholder="Enter team name"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Department</label>
                  <select
                    value={form.department}
                    onChange={e => setForm(s => ({ ...s, department: e.target.value }))}
                    style={styles.select}
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Team Lead</label>
                  <input
                    type="text"
                    value={form.teamLead}
                    onChange={e => setForm(s => ({ ...s, teamLead: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
                    onBlur={(e) => e.target.style = styles.input}
                    placeholder="Team lead name"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Team Color</label>
                  <div style={styles.colorPicker}>
                    {teamColors.map(color => (
                      <div
                        key={color}
                        style={{
                          ...styles.colorOption,
                          background: color,
                          ...(form.color === color ? styles.colorOptionSelected : {})
                        }}
                        onClick={() => setForm(s => ({ ...s, color }))}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                  style={styles.textarea}
                  onFocus={(e) => e.target.style = {...styles.textarea, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.textarea}
                  placeholder="Describe the team's purpose and responsibilities..."
                  rows={3}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Team Members (one per line)</label>
                <textarea
                  value={form.members.join('\n')}
                  onChange={e => setForm(s => ({ ...s, members: e.target.value.split('\n').filter(m => m.trim()) }))}
                  style={styles.textarea}
                  onFocus={(e) => e.target.style = {...styles.textarea, ...styles.inputFocus}}
                  onBlur={(e) => e.target.style = styles.textarea}
                  placeholder="Enter team member names, one per line..."
                  rows={4}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Skills</label>
                <div style={styles.skillsContainer}>
                  {availableSkills.map(skill => (
                    <div
                      key={skill}
                      style={{
                        ...styles.skillTag,
                        background: form.skills.includes(skill) ? '#3b82f6' : '#f8fafc',
                        color: form.skills.includes(skill) ? 'white' : '#0369a1',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        const newSkills = form.skills.includes(skill)
                          ? form.skills.filter(s => s !== skill)
                          : [...form.skills, skill];
                        setForm(s => ({ ...s, skills: newSkills }));
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px'}}>
                <button
                  type="button"
                  onClick={() => setModal({ open: false, type: null, data: null })}
                  style={{...styles.button, ...styles.secondaryButton}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{...styles.button, ...styles.primaryButton}}
                >
                  {modal.type === 'create' ? 'Create Team' : 'Update Team'}
                </button>
              </div>
            </form>
          </div>
        )}
      </ModalPopup>
    </div>
  );
};

export default Teams;