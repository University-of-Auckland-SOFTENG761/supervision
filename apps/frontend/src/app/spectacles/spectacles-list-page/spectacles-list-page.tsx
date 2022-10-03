import { ISpectacles } from '../spectacles-details-page';
import { Table, TableTheme } from '@shared';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, Stack } from '@mantine/core';

export const SpectaclesListPage = () => {
  //TODO: double-check with Veeran which columns he wants
  const spectaclesRecords: ISpectacles[] = [
    {
      uid: 'fake_id_1234',
      firstName: 'Henry',
      lastName: 'Mitchell-Hibbert',
      school: 'University of Auckland',
      orderDate: new Date(2022, 8, 25),
      spectaclesCode: '',
      colour: 'Black',
      lensType: '',
      pupillaryDistance: 120,
      heights: undefined,
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1235',
      firstName: 'Joan',
      lastName: 'Doe',
      school: 'Massey High School',
      orderDate: new Date(2021, 3, 5),
      spectaclesCode: '',
      colour: 'Blue',
      lensType: '',
      pupillaryDistance: 120,
      heights: undefined,
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1236',
      firstName: 'Jezza',
      lastName: 'Doe',
      school: 'Massey High School',
      orderDate: new Date(2022, 3, 20),
      spectaclesCode: '',
      colour: 'Green',
      lensType: '',
      pupillaryDistance: 120,
      heights: undefined,
      spectaclesNotes: '',
    },
  ];

  const navigate = useNavigate();

  return (
    <ScrollArea className="h-full p-8">
      <Stack className={'w-4/5 mx-auto'}>
        <Table theme={TableTheme.Primary}>
          <thead>
            <tr>
              <th>Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>School</th>
            </tr>
          </thead>
          <tbody>
            {spectaclesRecords.map((record) => (
              <tr
                key={record.orderDate ? record.orderDate.toString() : undefined}
                onClick={() => navigate(`/spectacles-details/${record.uid}`)}
              >
                {/*TODO: improve date format*/}
                <td>
                  {record.orderDate
                    ? record.orderDate.toISOString().split('T')[0]
                    : undefined}
                </td>
                <td>{record.firstName}</td>
                <td>{record.lastName}</td>
                <td>{record.school}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
    </ScrollArea>
  );
};
