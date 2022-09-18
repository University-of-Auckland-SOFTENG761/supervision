import React from 'react';
import { Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { Button, Logo } from '@shared';
import { useNavigate } from 'react-router-dom';
import { IconWifiOff } from '@tabler/icons';

export const OfflineLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const navigateToPatientDetails = () => {
    if (email === '') {
      setErrorMessage('Please enter an email address');
    } else if (
      !email.endsWith('@auckland.ac.nz') &&
      !email.endsWith('@aucklanduni.ac.nz')
    ) {
      setErrorMessage('Invalid email - please ensure you enter a UoA email');
    } else {
      setErrorMessage(undefined);
      sessionStorage.setItem('userEmail', email);
      navigate('/patient-details');
    }
  };

  return (
    <Stack className="items-center justify-center h-full m-auto w-1/4 2xl:w-1/6">
      <Logo size="sm" />
      <Title
        color="blue.9"
        order={3}
        className="w-full font-extrabold text-center"
      >
        Welcome to SuperVision!
      </Title>
      <Group className="w-full flex-nowrap" spacing={0}>
        <IconWifiOff size={36} className="mx-4" />
        <Text>
          Your device is offline <br /> Please enter your university email
          address to identify yourself.
        </Text>
      </Group>
      <TextInput
        label="Your email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        error={errorMessage}
        className="w-full"
      />
      <Button uppercase fullWidth size="lg" onClick={navigateToPatientDetails}>
        Continue
      </Button>
    </Stack>
  );
};

export default OfflineLoginPage;
