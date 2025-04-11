import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Dashboard from './pages/dashboard';
import Board from './pages/dashboard/project';
import { store } from './redux/store';

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<Board />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default AllRoutes;
