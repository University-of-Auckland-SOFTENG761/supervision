import { Container, Group } from '@mantine/core';
import Logo from '../logo/logo';
import { Header as MantineHeader } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { ConsultInfo } from '@consults';
import { IconWifiOff, IconWifi } from '@tabler/icons';
import { useNetwork } from '@shared';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const location = useLocation();
  const { online } = useNetwork();

  return (
    <MantineHeader height={80} pr={10}>
      <Group sx={{ height: '100%' }} position="apart">
        <Container px={30} py={22} className="h-full justify-start m-0">
          <Logo />
        </Container>
        {online ? <IconWifi /> : <IconWifiOff />}
        {location.pathname.startsWith('/consult-details') && <ConsultInfo />}
      </Group>
    </MantineHeader>
  );
}

export default Header;
