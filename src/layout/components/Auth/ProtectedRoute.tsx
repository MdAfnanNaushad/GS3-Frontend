import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';
import {  type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location,message:"Log In first" }} replace />;
  }


  return children;
};

export default ProtectedRoute;