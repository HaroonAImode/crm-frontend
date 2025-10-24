import React from 'react';

const FormInput = ({label, value, onChange, type = 'text', ...props}) => {
  return (
    <label style={{display: 'block', marginBottom: 12}}>
      {label && <div style={{marginBottom: 6}}>{label}</div>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        style={{padding: 8, width: '100%', boxSizing: 'border-box'}}
      />
    </label>
  );
};

export default FormInput;
