import {
  ColorInputProps,
  MantineColor,
  Table as MantineTable,
  TableProps as MantineTableProps,
} from '@mantine/core';
import React from 'react';
import styles from './table.module.scss';

export interface TableProps extends MantineTableProps {
  colors?: {
    header?: MantineColor;
    striped?: MantineColor;
  };
}

export function Table(props: TableProps) {
  return (
    <MantineTable className={styles['table']}>{props.children}</MantineTable>
  );
}

export default Table;
