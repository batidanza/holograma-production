import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { user } = UserAuth(); // user contiene el estado actual del usuario
  return user ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
