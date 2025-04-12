import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import Board from './pages/dashboard/project';
import { store } from './redux/store';
import AuthGuard from './guard/AuthGuard';
import { ToastContainer } from 'react-toastify';

// Flow will look like this 
// Project(Board) -> Columns -> Tasks
const AllRoutes = () => {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/project/:id" element={<AuthGuard><Board /></AuthGuard>} />
          </Routes>
        </Router>
      </Provider>
      <ToastContainer theme='dark' />
    </div>
  );
};

export default AllRoutes;
