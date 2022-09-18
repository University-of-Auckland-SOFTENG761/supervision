import { IConsult } from '../consult-details-page';
import { Table, TableTheme, Button } from '@shared';
import { TextInput, Grid, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowAutofitDown } from '@tabler/icons';

type ConsultDetailsLowerProps = {
  consult: IConsult;
  onUpdateConsult: (updatedConsult: IConsult) => void;
};

export const ConsultDetailsLower = ({
  consult,
  onUpdateConsult,
}: ConsultDetailsLowerProps) => {
  const form = useForm({
    initialValues: {
      ...consult,
    },
  });

  const consultRows = [
    {
      name: 'Previous Spectacle Rx',
      code: 'prevSpecRxGiven',
    },
    {
      name: 'Habitual (if different from above',
      code: 'habitual',
    },
    {
      name: 'Dry retinoscopy',
      code: 'dryRetinoscopy',
    },
    {
      name: 'Auto refraction',
      code: 'autoRefraction',
    },
    {
      name: 'Wet refraction',
      code: 'wetRefraction',
    },
    {
      name: 'Subjective refraction',
      code: 'subjectiveRefraction',
    },
    {
      name: 'Given refraction',
      code: 'givenRefraction',
    },
  ];

  return (
    <Grid columns={10}>
      <Grid.Col lg={9} md={10}>
        <Table theme={TableTheme.Primary}>
          <thead>
            <tr>
              <th></th>

              <th>RIGHT EYE SPHERE</th>
              <th></th>
              <th>CYLINDER</th>
              <th></th>
              <th>AXIS</th>
              <th>VA</th>
              <th>ADD</th>

              <th></th>

              <th>LEFT EYE SPHERE</th>
              <th></th>
              <th>CYLINDER</th>
              <th></th>
              <th>AXIS</th>
              <th>LEFT VA</th>
              <th>ADD</th>
              <th>BVA</th>
            </tr>
          </thead>
          <tbody>
            {consultRows.map((row, index) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'RightEyeSphere')}
                  />
                </td>
                <td>/</td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'RightCylinder')}
                  />
                </td>
                <td>x</td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'RightAxis')}
                  />
                </td>
                <td>
                  <TextInput {...form.getInputProps(row.code + 'RightVA')} />
                </td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'RightAdd')}
                  />
                </td>
                <td>
                  {index !== consultRows.length - 1 && <IconArrowAutofitDown />}
                </td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'LeftEyeSphere')}
                  />
                </td>
                <td>/</td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'LeftCylinder')}
                  />
                </td>
                <td>x</td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'LeftAxis')}
                  />
                </td>
                <td>
                  <TextInput {...form.getInputProps(row.code + 'LeftVA')} />
                </td>
                <td>
                  <TextInput
                    type="number"
                    {...form.getInputProps(row.code + 'LeftAdd')}
                  />
                </td>
                {row.name === 'Previous Spectacle Rx' ||
                row.name === 'Given refraction' ? (
                  <td>
                    <TextInput {...form.getInputProps(row.code + 'BVA')} />
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Grid.Col>
      <Grid.Col lg={1} md={3}>
        <Stack>
          <Button color="green">APPROVE RECORD</Button>
          <Button color="red">DELETE RECORD</Button>
          <Button>REFER</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
