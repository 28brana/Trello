import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import { loginAction } from '../../redux/slice/auth.slice';

// Validation schema
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-800 p-6 rounded-lg shadow-lg w-80 border border-neutral-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-neutral-100">Welcome back 👋</h2>

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
          data-cy="login-button"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3 text-neutral-400">
          Don’t have an account?{' '}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
