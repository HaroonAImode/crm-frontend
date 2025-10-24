import React from 'react';

const ClientCard = ({ client, actions }) => {
  return (
    <div style={{background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 16, marginBottom: 16, minWidth: 260}}>
      <div style={{fontWeight: 600, fontSize: 18}}>{client.name}</div>
      <div style={{fontSize: 14, color: '#6b7280'}}>{client.email}</div>
      <div style={{fontSize: 14, color: '#6b7280'}}>{client.phone}</div>
      <div style={{marginTop: 8}}>
        {actions?.view && <button onClick={() => actions.view(client)} style={{marginRight: 8}}>View More</button>}
        {actions?.edit && <button onClick={() => actions.edit(client)} style={{marginRight: 8}}>Edit Details</button>}
        {actions?.download && <button onClick={() => actions.download(client)}>Download Report</button>}
      </div>
    </div>
  );
};

export default ClientCard;
