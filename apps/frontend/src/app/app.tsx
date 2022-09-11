import { Navbar, Stack } from '@mantine/core';
import { IconPill, IconSearch, IconStethoscope, IconUser } from '@tabler/icons';
import { AppShell } from './shared';
import { useRef } from 'react';
import {
  SearchModal,
  SearchModalRef,
} from './shared/modals/search/SearchModal';
import NavbarLink from './shared/navbar/link/navbar-link';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchModal = useRef<SearchModalRef>(null);

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
          </Navbar>
        )
      }
    >
      <Outlet />
      <SearchModal ref={searchModal} />
    </AppShell>
  );
}

export default App;
