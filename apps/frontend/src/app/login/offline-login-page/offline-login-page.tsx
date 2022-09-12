import React from 'react';
import { Stack, TextInput, Title } from '@mantine/core';
import { Button, Logo } from '@shared';
import { useNavigate } from 'react-router-dom';

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
      navigate('/patient-details');
    }
  };

  return (
    <Stack className="items-center justify-center h-full m-auto w-1/4">
      <Logo size="sm" />
      <Title color="blue.9" order={4} className="w-full font-extrabold">
        Welcome to SuperVision!
      </Title>
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
