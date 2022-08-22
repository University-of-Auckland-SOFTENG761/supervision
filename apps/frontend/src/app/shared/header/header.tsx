import { Group } from '@mantine/core';
import React from 'react';
import Logo from '../logo/logo';
import { Header as MantineHeader } from '@mantine/core';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <MantineHeader height={80} px={30} py={22}>
      <Group sx={{ height: '100%' }} position="apart">
        <Logo />
      </Group>
    </MantineHeader>
  );
}

export default Header;
