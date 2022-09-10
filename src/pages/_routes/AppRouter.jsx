import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../Home';
import Login from '../login/Login';
import Register from '../register/Register';
import PrivateRoute from '../_privateRoute/PrivateRoute';

function AppRouter() {
  return (
    <Routes>
        <Route exact path='/toto' element={<PrivateRoute/>}>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default AppRouter;