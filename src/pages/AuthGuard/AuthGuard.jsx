import React from 'react';
import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};