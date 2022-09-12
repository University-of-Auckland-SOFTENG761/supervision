import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';

type ProtectedRouteProps = {
  component: JSX.Element;
};

const ProtectedRoute = ({ component }: ProtectedRouteProps): JSX.Element => {
  const { isLoading, user, isAuthenticated } = useAuth0();

  console.log(isAuthenticated, user);

  if (isLoading) {
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  } else if (isAuthenticated) {
    return component;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
