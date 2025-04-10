import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import InputField from '../../components/InputField.jsx';
import PasswordField from '../../components/PasswordField.jsx';
import { registerAction } from '../../redux/slice/auth.slice.jsx';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(registerAction(data));
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up to continue</h2>

        <InputField
          label="Username"
          name="username"
          register={register}
          placeholder="Enter username"
          error={errors.username?.message}
        />

        <InputField
          label="Email"
          name="email"
          register={register}
          placeholder="Enter email"
          error={errors.email?.message}
        />

        <PasswordField
          label="Password"
          name="password"
          register={register}
          placeholder="Enter password"
          error={errors.password?.message}
        />

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account? <Link to="/auth/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
