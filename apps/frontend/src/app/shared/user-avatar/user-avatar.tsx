import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Center, Popover, Text } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { useNetwork } from '../hooks';

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
            {user?.given_name?.charAt(0)}
            {user?.family_name?.charAt(0)}
          </Avatar>
        </Popover.Target>
        <Popover.Dropdown>
          <Text
            color="white"
            className="font-bold w-fit text-center mb-4 whitespace-nowrap"
          >
            Logged in as
            {!online
              ? ' ' + userEmail
              : ' ' + user?.given_name + ' ' + user?.family_name}
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
          </Center>
        </Popover.Dropdown>
      </Popover>
    );
  }
};

export default UserAvatar;
