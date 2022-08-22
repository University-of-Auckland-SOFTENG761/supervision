import { ActionIcon, Tooltip, UnstyledButton } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

export interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

export function NavbarLink(props: NavbarLinkProps) {
  return (
    <Tooltip label={props.label} position="right" transitionDuration={0}>
      <ActionIcon
        size={40}
        variant={props.active ? 'filled' : 'subtle'}
        color="blue"
        onClick={props.onClick}
      >
        <props.icon stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
}

export default NavbarLink;
