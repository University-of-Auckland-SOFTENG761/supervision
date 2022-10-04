import { Container, Group } from '@mantine/core';
import React from 'react';
import Logo from '../logo/logo';
import { Header as MantineHeader } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { ConsultInfo } from '@consults';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const location = useLocation();

  return (
    <MantineHeader height={80} pr={10}>
      <Group sx={{ height: '100%' }} position="apart">
        <Container px={30} py={22} className="h-full justify-start m-0">
          <Logo />
        </Container>
        {location.pathname.startsWith('/consult-details') && <ConsultInfo />}
      </Group>
    </MantineHeader>
  );
}

export default Header;
