import React, { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

const PasswordField = ({ label, register, name, placeholder, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="text-sm block mb-1 text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          data-cy={name}
          className="w-full px-3 py-2 rounded-md bg-[#2C333A] border border-[#3E4650] text-white placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-[#579DFF]"
        />
        <span
          onClick={() => setShow(!show)}
          className="absolute right-2 top-2.5 text-gray-400 hover:text-white cursor-pointer"
        >
          {show ? <Eye size={20} /> : <EyeSlash size={20} />}
        </span>
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordField;
