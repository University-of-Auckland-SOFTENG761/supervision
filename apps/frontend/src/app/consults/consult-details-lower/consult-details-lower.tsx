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
    <Grid columns={10} align="flex-end">
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
              <th>VA</th>
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
                  {index !== consultRows.length - 1 && (
                    <Button compact variant="subtle">
                      <IconArrowAutofitDown
                        onClick={() => {
                          const valRightEyeSphere = {
                            ...form.getInputProps(row.code + 'RightEyeSphere'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'RightEyeSphere',
                            valRightEyeSphere
                          );

                          const valRightCylinder = {
                            ...form.getInputProps(row.code + 'RightCylinder'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'RightCylinder',
                            valRightCylinder
                          );

                          const valRightAxis = {
                            ...form.getInputProps(row.code + 'RightAxis'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'RightAxis',
                            valRightAxis
                          );

                          const valRightVA = {
                            ...form.getInputProps(row.code + 'RightVA'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'RightVA',
                            valRightVA
                          );

                          const valRightAdd = {
                            ...form.getInputProps(row.code + 'RightAdd'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'RightAdd',
                            valRightAdd
                          );

                          const valLeftEyeSphere = {
                            ...form.getInputProps(row.code + 'LeftEyeSphere'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'LeftEyeSphere',
                            valLeftEyeSphere
                          );

                          const valLeftCylinder = {
                            ...form.getInputProps(row.code + 'LeftCylinder'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'LeftCylinder',
                            valLeftCylinder
                          );

                          const valLeftAxis = {
                            ...form.getInputProps(row.code + 'LeftAxis'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'LeftAxis',
                            valLeftAxis
                          );

                          const valLeftVA = {
                            ...form.getInputProps(row.code + 'LeftVA'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'LeftVA',
                            valLeftVA
                          );

                          const valLeftAdd = {
                            ...form.getInputProps(row.code + 'LeftAdd'),
                          }.value;
                          form.setFieldValue(
                            consultRows[index + 1].code + 'LeftAdd',
                            valLeftAdd
                          );
                        }}
                      />
                    </Button>
                  )}
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
          <Button color="green">APPROVE</Button>
          <Button color="red">DELETE</Button>
          <Button>REFER</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
