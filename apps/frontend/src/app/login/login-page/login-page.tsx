import React from 'react';
import { Group, Stack, Text, Title } from '@mantine/core';
import { Button, Logo } from '@shared';
import { useAuth0 } from '@auth0/auth0-react';
import { useNetwork } from '@shared';
import { OfflineLoginPage } from '../offline-login-page';
import { IconWifi } from '@tabler/icons';

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
      <Stack className="items-center justify-center h-full m-auto w-1/4 2xl:w-1/6">
        <Logo size="sm" />
        <Title
          color="blue.9"
          order={4}
          className="w-full font-extrabold text-center"
        >
          Welcome to SuperVision!
        </Title>
        <Group className="w-full flex-nowrap" spacing={0}>
          <IconWifi size={36} className="mx-4" />
          <Text>
            Your device is online <br /> Please log in to continue to
            SuperVision.
          </Text>
        </Group>
        <Button uppercase fullWidth size="lg" onClick={handleClickLogin}>
          Login with Auth0
        </Button>
      </Stack>
    );
  }
};

export default LoginPage;
