import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../Home';
import Login from '../login/Login';

function AppRouter() {
  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
    </Routes>
  )
}

export default AppRouter;