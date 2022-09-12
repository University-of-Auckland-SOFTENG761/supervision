import { useAuth0 } from '@auth0/auth0-react';
import { Modal, Text } from '@mantine/core';
import { Button } from '@shared';
import React from 'react';

type ReconnectedLoginModalProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReconnectedLoginModal = ({
  opened,
  setOpened,
}: ReconnectedLoginModalProps) => {
  const { loginWithPopup } = useAuth0();

  return (
    <Modal
      title="Your internet connection was restored"
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      centered
      classNames={{
        title: 'font-extrabold',
      }}
    >
      <Text className="-mt-2 pb-10">Please log in</Text>
      <Button uppercase fullWidth size="lg" onClick={() => loginWithPopup()}>
        Login with Auth0
      </Button>
    </Modal>
  );
};

export default ReconnectedLoginModal;
