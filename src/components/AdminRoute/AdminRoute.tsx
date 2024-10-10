import React from 'react';
import {Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

function AdminRoute({ isAdmin, children }: AdminRouteProps) {
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
