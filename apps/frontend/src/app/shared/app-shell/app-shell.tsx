import {
  ActionIcon,
  AppShell as MantineAppShell,
  ColorScheme,
  Group,
} from '@mantine/core';
import React from 'react';
import { Header, Logo } from '@shared';

export interface AppShellProps {
  children?: React.ReactNode;
  navbar?: React.ReactElement;
  header?: React.ReactElement;
}

export function AppShell(props: AppShellProps) {
  return (
    <MantineAppShell
      padding="md"
      navbar={props.navbar}
      header={props.header ?? <Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      classNames={{
        root: 'h-screen overflow-none',
        body: 'h-[calc(100%-60px)]',
      }}
    >
      {props.children}
    </MantineAppShell>
  );
}

export default AppShell;
