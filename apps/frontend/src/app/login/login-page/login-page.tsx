import React from 'react';
import { Stack, Text, Title } from '@mantine/core';
import { Button, Logo } from '@shared';
import { useAuth0 } from '@auth0/auth0-react';
import { useNetwork } from '@shared';
import { OfflineLoginPage } from '../offline-login-page';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { online } = useNetwork();

  const handleClickLogin = () => {
    loginWithRedirect();
  };

  if (!online) {
    return <OfflineLoginPage />;
  } else {
    return (
      <Stack className="items-center justify-center h-full m-auto w-1/4">
        <Logo size="sm" />
        <Title color="blue.9" order={4} className="w-full font-extrabold">
          Welcome to SuperVision!
        </Title>
        <Text className="w-full -mt-4">Please log in</Text>
        <Button uppercase fullWidth size="lg" onClick={handleClickLogin}>
          Login with Auth0
        </Button>
      </Stack>
    );
  }
};

export default LoginPage;
