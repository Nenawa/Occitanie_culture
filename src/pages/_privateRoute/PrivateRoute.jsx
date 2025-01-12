import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/AuthProvider'

function PrivateRoute({children}) {

  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
export default PrivateRoute