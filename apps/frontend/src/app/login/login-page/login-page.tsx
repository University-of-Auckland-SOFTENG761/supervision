import React from 'react';
import { Button, Select, Stack, Text, Title } from '@mantine/core';
import { Logo } from '@shared';

// TODO: Replace with actual data from database
const locations = ['University of Auckland', 'Harvard University', 'MIT'];

export const LoginPage = () => {
  return (
    <Stack className="items-center justify-center h-full m-auto w-1/4">
      <Logo size="sm" />
      <Title color="blue.9" order={4} className="w-full font-extrabold">
        Welcome to SuperVision!
      </Title>
      <Text className="w-full -mt-4">Please log in</Text>
      <Select
        label="Select a location:"
        placeholder="Pick one"
        data={locations}
        className="w-full"
        searchable
      />
      <Button
        component="a"
        href="https://dev-6mx9ad29.us.auth0.com/authorize?response_type=code&client_id=SiqwTzesySraxm8Ml8t7wModRdckoh0c&redirect_uri=https://localhost:3333&scope=openid"
        uppercase
        fullWidth
        size="lg"
      >
        Login with Auth0
      </Button>
    </Stack>
  );
};

export default LoginPage;
