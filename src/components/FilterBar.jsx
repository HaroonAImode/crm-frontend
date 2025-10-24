import React from 'react';

const FilterBar = ({ filters, active, onChange }) => {
  return (
    <div style={{display: 'flex', gap: 12, marginBottom: 16}}>
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          style={{
            padding: '8px 14px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            background: active === f.value ? '#2563eb' : '#fff',
            color: active === f.value ? '#fff' : '#111827',
            fontWeight: active === f.value ? 600 : 400,
            cursor: 'pointer'
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
