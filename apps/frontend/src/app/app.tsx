import { Navbar, Stack } from '@mantine/core';
import { IconPill, IconSearch, IconStethoscope, IconUser } from '@tabler/icons';
import { AppShell } from '@shared';
import NavbarLink from './shared/navbar/link/navbar-link';
import { Outlet, useNavigate } from 'react-router-dom';

export function App() {
  const navigate = useNavigate();

  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 60 }} py={8}>
          <Navbar.Section grow>
            <Stack justify="center" align="center">
              <NavbarLink label="Search" icon={IconSearch}></NavbarLink>
              <NavbarLink
                label="Patients"
                icon={IconUser}
                onClick={() => navigate('/patient-details')}
              ></NavbarLink>
              <NavbarLink
                label="Consultations"
                icon={IconStethoscope}
              ></NavbarLink>
              <NavbarLink label="Dispense" icon={IconPill}></NavbarLink>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
}

export default App;
