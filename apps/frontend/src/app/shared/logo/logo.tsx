import { ColorScheme } from '@mantine/core';
import React from 'react';
import LargeLogo from './logo-lg.svg';
import './logo.scss';

enum LogoSize {
  large = 'lg',
}

export interface LogoProps {
  colorScheme?: ColorScheme;
  size?: LogoSize;
}

export function Logo(props: LogoProps) {
  return <img src={LargeLogo} alt="" />;
}

export default Logo;
