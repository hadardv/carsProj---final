import React from 'react';
import './Input.css'

function Input({ label, type, value, onChange, error }) {
  return (
    <div className= 'input-option' >
      <label>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        style={error ? { borderColor: 'red' } : {}}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default Input;
