import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import Project from './pages/dashboard/project';

const AllRoutes = () => {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default AllRoutes;
