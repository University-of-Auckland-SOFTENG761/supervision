import { Navbar, Stack } from '@mantine/core';
import { IconEyeglass, IconSearch, IconEye, IconUser } from '@tabler/icons';
import { AppShell, useNetwork } from './shared';
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
import { useAuth0 } from '@auth0/auth0-react';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchModal = useRef<SearchModalRef>(null);
  const reconnectedLoginModal = useRef<ReconnectedLoginModalRef>(null);
  const { online } = useNetwork();
  const { isAuthenticated } = useAuth0();

  const openReconnectedLoginModal = () => reconnectedLoginModal.current?.show();

  const hideReconnectedLoginModal = () => reconnectedLoginModal.current?.hide();

  useEffect(() => {
    if (online && !isAuthenticated && location.pathname !== '/')
      openReconnectedLoginModal();
    else hideReconnectedLoginModal();
  }, [online, location.pathname, isAuthenticated]);

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
                  icon={IconEye}
                  onClick={() => navigate('/consult-details')}
                  active={location.pathname === '/consult-details'}
                ></NavbarLink>
                <NavbarLink label="Dispense" icon={IconEyeglass}></NavbarLink>
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
