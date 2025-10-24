import React from 'react';

// columns: [{key, label}], data: array of client objects, actions: {view, edit, download}
const ClientTable = ({ columns, data, actions }) => {
  return (
    <div style={{overflowX: 'auto'}}>
      <table style={{width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
        <thead>
          <tr>
            {columns.map(col => <th key={col.key} style={{padding: 10, borderBottom: '1px solid #eee', textAlign: 'left'}}>{col.label}</th>)}
            <th style={{padding: 10, borderBottom: '1px solid #eee'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} style={{borderBottom: '1px solid #f3f4f6'}}>
              {columns.map(col => <td key={col.key} style={{padding: 10}}>{row[col.key]}</td>)}
              <td style={{padding: 10}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  {actions?.view && <button onClick={() => actions.view(row)} style={{marginRight: 8}}>View More</button>}
                  {actions?.edit && <button onClick={() => actions.edit(row)} style={{marginRight: 8}}>Edit Details</button>}
                  {actions?.download && <button onClick={() => actions.download(row)} style={{marginRight: 8}}>Download Report</button>}
                  {actions?.assign && actions.assign(row)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
