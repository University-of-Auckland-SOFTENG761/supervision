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
import { IconWifiOff, IconWifi } from '@tabler/icons';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchModal = useRef<SearchModalRef>(null);
  const reconnectedLoginModal = useRef<ReconnectedLoginModalRef>(null);
  const { online, isLoading: networkStatusIsLoading } = useNetwork();
  const { isAuthenticated, isLoading: authIsLoading } = useAuth0();

  const openReconnectedLoginModal = () => reconnectedLoginModal.current?.show();

  const hideReconnectedLoginModal = () => reconnectedLoginModal.current?.hide();

  useEffect(() => {
    if (
      !networkStatusIsLoading &&
      !authIsLoading &&
      online &&
      !isAuthenticated &&
      location.pathname !== '/'
    )
      openReconnectedLoginModal();
    else hideReconnectedLoginModal();
  }, [
    online,
    location.pathname,
    isAuthenticated,
    networkStatusIsLoading,
    authIsLoading,
  ]);

  return (
    <AppShell
      navbar={
        location.pathname === '/' ? undefined : (
          <Navbar width={{ base: 60 }} py={8} className="print:hidden">
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
                <NavbarLink
                  label="Dispensing"
                  icon={IconEyeglass}
                  onClick={() => navigate('/spectacles-list')}
                  active={location.pathname === '/spectacles-list'}
                ></NavbarLink>
                <NavbarLink
                  label="Recalls"
                  icon={IconEye}
                  onClick={() => navigate('/recalls-list')}
                  active={location.pathname === '/recalls-list'}
                ></NavbarLink>
              </Stack>
            </Navbar.Section>
            <Navbar.Section className="w-full justify-center">
              <Stack justify="center" align="center">
                {online ? <IconWifi /> : <IconWifiOff />}
                <UserAvatar />
              </Stack>
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
