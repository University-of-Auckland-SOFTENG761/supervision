import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { useNetwork } from '@shared';

type ProtectedRouteProps = {
  component: JSX.Element;
};

const ProtectedRoute = ({ component }: ProtectedRouteProps): JSX.Element => {
  const { isLoading, isAuthenticated } = useAuth0();
  const { online, isLoading: onlineStatusLoading } = useNetwork();
  const userEmail = sessionStorage.getItem('userEmail');

  if (isLoading || onlineStatusLoading) {
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  } else if (isAuthenticated || userEmail) {
    return component;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
