import {
  ButtonProps as MantineButtonProps,
  Button as MantineButton,
} from '@mantine/core';
import React from 'react';
import styles from './button.module.scss';

interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <MantineButton
      {...props}
      className={styles['button']}
      onClick={props.onClick}
    />
  );
}

export default Button;
