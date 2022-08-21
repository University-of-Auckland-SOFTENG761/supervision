import React from 'react';
import { Table } from '@shared';

export const RecallsTable = () => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Recalls:</th>
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
