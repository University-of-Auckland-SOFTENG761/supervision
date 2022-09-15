import { useAuth0 } from '@auth0/auth0-react';
import { Modal, Text } from '@mantine/core';
import { Button } from '@shared';
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

export interface ReconnectedLoginModalRef {
  show(): void;
  hide(): void;
}

export const ReconnectedLoginModal = forwardRef(
  (props, ref: ForwardedRef<ReconnectedLoginModalRef>) => {
    const { loginWithPopup, isAuthenticated, isLoading } = useAuth0();
    const [opened, setOpened] = useState(false);

    useImperativeHandle(ref, () => ({
      show() {
        setOpened(true);
      },
      hide() {
        setOpened(false);
      },
    }));

    const login = async () => {
      await loginWithPopup();
    };

    useEffect(() => {
      if (opened && isAuthenticated) setOpened(false);
    }, [opened, isAuthenticated, isLoading]);

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
        <Button uppercase fullWidth size="lg" onClick={login}>
          Login with Auth0
        </Button>
      </Modal>
    );
  }
);

export default ReconnectedLoginModal;
