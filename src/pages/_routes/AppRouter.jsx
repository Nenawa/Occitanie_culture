import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import { AuthProvider } from '../../hooks/AuthProvider';
import Home from '../Home';
import Login from '../login/Login';
import Register from '../register/Register';
import PrivateRoute from '../_privateRoute/PrivateRoute';

function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            exact path='/' 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
      </Routes>
    </AuthProvider>

  )
}

export default AppRouter;