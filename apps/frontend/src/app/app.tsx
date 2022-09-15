import { Navbar, Stack } from '@mantine/core';
import { IconPill, IconSearch, IconStethoscope, IconUser } from '@tabler/icons';
import { AppShell, usePatients } from './shared';
import { useEffect, useRef } from 'react';
import {
  SearchModal,
  SearchModalRef,
} from './shared/modals/search/SearchModal';
import NavbarLink from './shared/navbar/link/navbar-link';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ReconnectedLoginModal,
  ReconnectedLoginModalRef,
} from './login/reconnected-login-modal';
import { UserAvatar } from './shared/user-avatar';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchModal = useRef<SearchModalRef>(null);
  const reconnectedLoginModal = useRef<ReconnectedLoginModalRef>(null);
  const { connectionStatus } = usePatients();

  const openReconnectedLoginModal = () => reconnectedLoginModal.current?.show();

  const hideReconnectedLoginModal = () => reconnectedLoginModal.current?.hide();

  useEffect(() => {
    if (connectionStatus === 'unauthenticated' && location.pathname !== '/')
      openReconnectedLoginModal();
    else hideReconnectedLoginModal();
  }, [connectionStatus, location.pathname]);

  return (
    <AppShell
      navbar={
        location.pathname === '/' ? undefined : (
          <Navbar width={{ base: 60 }} py={8}>
            <Navbar.Section grow>
              <Stack justify="center" align="center">
                <NavbarLink
                  label="Search"
                  icon={IconSearch}
                  onClick={() => searchModal.current?.show()}
                ></NavbarLink>
                <NavbarLink
                  label="Patients"
                  icon={IconUser}
                  onClick={() => navigate('/patient-details')}
                  active={location.pathname === '/patient-details'}
                ></NavbarLink>
                <NavbarLink
                  label="Consultations"
                  icon={IconStethoscope}
                ></NavbarLink>
                <NavbarLink label="Dispense" icon={IconPill}></NavbarLink>
              </Stack>
            </Navbar.Section>
            <Navbar.Section className="w-full justify-center">
              <UserAvatar />
            </Navbar.Section>
          </Navbar>
        )
      }
    >
      <Outlet />
      <SearchModal ref={searchModal} />
      <ReconnectedLoginModal ref={reconnectedLoginModal} />
    </AppShell>
  );
}

export default App;
