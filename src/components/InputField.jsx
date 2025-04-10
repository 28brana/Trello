import React from 'react';

const InputField = ({ label, register, name, type = 'text', placeholder, error }) => (
  <div className="mb-3">
    {label && <label className="text-sm block mb-1">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className="input"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
