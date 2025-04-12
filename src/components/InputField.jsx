import React from 'react';

const InputField = ({ label, register, name, type = 'text', placeholder, error }) => (
  <div className="mb-3">
    {label && (
      <label htmlFor={name} className="text-sm block mb-1 text-gray-300">
        {label}
      </label>
    )}

    <input
      id={name}
      type={type}
      placeholder={placeholder}
      {...register(name)}
      data-cy={name}
      className="w-full px-3 py-2 rounded-md bg-[#2C333A] border border-[#3E4650] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
    />

    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
