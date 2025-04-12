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
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
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
  };

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-900 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-neutral-800 p-6 rounded-lg shadow-xl w-80 border border-neutral-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-neutral-100">
          Sign up to continue
        </h2>

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
          data-cy="register-button"
          className="w-full cursor-pointer bg-blue-500 text-white py-2 mt-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-3 text-neutral-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
