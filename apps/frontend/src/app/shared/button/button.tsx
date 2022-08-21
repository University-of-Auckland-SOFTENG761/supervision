import { ButtonProps, Button as MantineButton } from '@mantine/core';
import React from 'react';
import styles from './button.module.scss';

export function Button(props: ButtonProps) {
  return <MantineButton {...props} className={styles['button']} />;
}

export default Button;
