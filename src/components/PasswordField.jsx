import React, { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const PasswordField = ({ label, register, name, placeholder, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      {label && <label className="text-sm block mb-1">{label}</label>}
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          className="input pr-10"
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-2 top-2.5 text-gray-600 cursor-pointer"
        >
          {show ? <Eye size={20} /> : <EyeSlash size={20} />}
        </span>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordField;
