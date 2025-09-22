import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // While the session is being checked, show a loading message
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Spinner />
        </div>
    );
  }

  // After checking, if there is no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, show the requested page
  return <Outlet />;
};

export default ProtectedRoute;