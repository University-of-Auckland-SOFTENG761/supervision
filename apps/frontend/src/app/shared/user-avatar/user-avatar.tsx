import { useAuth0 } from '@auth0/auth0-react';
import environment from '@environment';
import { Avatar, Center, Popover, Text } from '@mantine/core';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIdToken } from '../../../database/authorisation';
import { Button } from '../button';
import { useNetwork } from '@shared';

export const UserAvatar = () => {
  const { user, isLoading, logout } = useAuth0();
  const { online, isLoading: onlineStatusLoading } = useNetwork();
  const userEmail = sessionStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    if (!online) {
      sessionStorage.removeItem('userEmail');
      navigate('/', { replace: true });
    } else {
      logout({ returnTo: window.location.origin });
    }
  };

  async function handleCopyAuthToken() {
    const token = await getIdToken();
    navigator.clipboard.writeText(
      JSON.stringify({
        Authorization: `Bearer ${token}`,
      })
    );
  }

  const userInitials = useMemo(() => {
    if (user && (user.given_name || user.family_name)) {
      return `${user?.given_name?.charAt(0).toUpperCase()}${user?.family_name
        ?.charAt(0)
        .toUpperCase()}`;
    }
    if (user && user.name) {
      return `${user?.name?.substring(0, 2).toUpperCase()}`;
    }
    if (userEmail) {
      return `${userEmail.substring(0, 2).toUpperCase()}`;
    }
    return '?';
  }, [user, userEmail]);

  const userName = useMemo(() => {
    if (user && (user.given_name || user.family_name)) {
      return `${user?.given_name + ' ' ?? ''}${user?.family_name ?? ''}`;
    }
    if (user && user.name) {
      return `${user?.name}`;
    }
    if (userEmail) {
      return `${userEmail}`;
    }
    return 'Unknown User';
  }, [user, userEmail]);

  if (isLoading || onlineStatusLoading) {
    return null;
  } else {
    return (
      <Popover
        position="top-end"
        classNames={{ dropdown: 'w-fit ml-2 bg-[#073B4C]' }}
      >
        <Popover.Target>
          <Avatar
            color="yellow"
            variant="filled"
            radius="md"
            className="m-auto"
            src={null}
          >
            {userInitials}
          </Avatar>
        </Popover.Target>
        <Popover.Dropdown>
          <Text
            color="white"
            className="font-bold w-fit text-center mb-4 whitespace-nowrap"
          >
            Logged in as {` ${userName}`}
          </Text>
          <Center>
            <Button
              size="sm"
              color="red"
              uppercase
              className="m-auto"
              onClick={handleClickLogOut}
            >
              Log out
            </Button>
            {!environment.production && (
              <Button
                size="sm"
                color="yellow"
                uppercase
                onClick={handleCopyAuthToken}
              >
                Copy Token
              </Button>
            )}
          </Center>
        </Popover.Dropdown>
      </Popover>
    );
  }
};

export default UserAvatar;
