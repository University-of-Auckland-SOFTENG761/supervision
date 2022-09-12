import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  component: JSX.Element;
};

const ProtectedRoute = ({ component }: ProtectedRouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? component : <Navigate to="/" />;
};

export default ProtectedRoute;
