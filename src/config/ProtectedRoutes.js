import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isLoginRequired }) => {
  return isLoginRequired ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
