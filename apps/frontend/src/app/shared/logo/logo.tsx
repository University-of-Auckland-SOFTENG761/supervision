import { ColorScheme } from '@mantine/core';
import React from 'react';
import LargeLogo from './logo-lg.svg';
import SmallLogo from './logo-sm.svg';
import './logo.scss';

export interface LogoProps {
  colorScheme?: ColorScheme;
  size?: 'sm' | 'lg';
  className?: string;
}

export const Logo = (props: LogoProps) => {
  return (
    <img
      className={props.className}
      src={props.size === 'sm' ? SmallLogo : LargeLogo}
      alt=""
    />
  );
};

Logo.defaultProps = {
  size: 'lg',
};

export default Logo;
