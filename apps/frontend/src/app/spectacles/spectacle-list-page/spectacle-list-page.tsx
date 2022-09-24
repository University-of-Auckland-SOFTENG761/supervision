import { ISpectacles } from '../spectacle-details-page';
import { Table, TableTheme } from '@shared';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, Stack } from '@mantine/core';

export const SpectacleListPage = () => {
  //TODO: double-check with Veeran which columns he wants
  const spectacleRecords: ISpectacles[] = [
    {
      uid: 'fake_id_1234',
      firstName: 'Henry',
      lastName: 'Mitchell-Hibbert',
      school: 'University of Auckland',
      date: new Date(2022, 8, 25),
      spectaclesCode: '',
      colour: 'Black',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1235',
      firstName: 'Joan',
      lastName: 'Doe',
      school: 'Massey High School',
      date: new Date(2021, 3, 5),
      spectaclesCode: '',
      colour: 'Blue',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1236',
      firstName: 'Jezza',
      lastName: 'Doe',
      school: 'Massey High School',
      date: new Date(2022, 3, 20),
      spectaclesCode: '',
      colour: 'Green',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>School</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {spectacleRecords.map((record) => (
              <tr
                key={record.date.toString()}
                onClick={() => navigate(`/spectacle-details/${record.uid}`)}
              >
                {/*TODO: improve date format*/}
                <td>{record.date.toDateString()}</td>
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
