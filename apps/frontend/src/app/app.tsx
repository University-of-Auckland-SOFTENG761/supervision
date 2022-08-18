// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navbar, Stack } from '@mantine/core';
import {
  IconGauge,
  IconPill,
  IconSearch,
  IconStethoscope,
  IconUser,
} from '@tabler/icons';
import styles from './app.module.scss';
import { AppShell } from '@shared';
import NavbarLink from './shared/navbar/link/navbar-link';

export function App() {
  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 60 }} py={8}>
          <Navbar.Section grow>
            <Stack justify="center" align="center">
              <NavbarLink label="Search" icon={IconSearch}></NavbarLink>
              <NavbarLink label="Patients" icon={IconUser}></NavbarLink>
              <NavbarLink
                label="Consultations"
                icon={IconStethoscope}
              ></NavbarLink>
              <NavbarLink label="Dispense" icon={IconPill}></NavbarLink>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
    ></AppShell>
  );
}

export default App;
