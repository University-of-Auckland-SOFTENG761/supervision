import {
  Table as MantineTable,
  TableProps as MantineTableProps,
} from '@mantine/core';
import React from 'react';
import styles from './table.module.scss';

export enum TableTheme {
  Primary = 'primary',
  Secondary = 'secondary',
}

const themeClasses = {
  [TableTheme.Primary]: styles['primary'],
  [TableTheme.Secondary]: styles['secondary'],
};

export interface TableProps extends MantineTableProps {
  theme?: TableTheme;
}

function getThemeClass(theme?: TableTheme): string {
  return theme ? themeClasses[theme] : '';
}

export function Table(props: TableProps) {
  return (
    <div className={[styles['table'], getThemeClass(props.theme)].join(' ')}>
      <MantineTable {...props} striped highlightOnHover />
    </div>
  );
}

export default Table;
