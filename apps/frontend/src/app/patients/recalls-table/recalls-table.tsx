import { Table, TableTheme } from '@shared';
import React from 'react';

export const RecallsTable = () => {
  return (
    <Table striped theme={TableTheme.Primary}>
      <thead>
        <tr>
          <th>RECALLS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>16/02/2021</td>
        </tr>
        <tr>
          <td>18/08/2019</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default RecallsTable;
