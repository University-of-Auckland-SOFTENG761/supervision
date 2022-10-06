import { Table, TableTheme, Button } from '@shared';
import { TextInput, Grid, Stack, NumberInput } from '@mantine/core';
import { IconArrowAutofitDown } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import { ConsultDocType } from 'database';

type ConsultDetailsLowerProps = {
  consult: RxDocument<ConsultDocType>;
  setFieldByKey: (key: string, value: string | number | null) => void;
  setFieldsByKeys: (
    keyValuePairs: [key: string, value: string | number | null][]
  ) => void;
};

export const ConsultDetailsLower = ({
  consult,
  setFieldByKey,
  setFieldsByKeys,
}: ConsultDetailsLowerProps) => {
  type RowCode =
    | 'prevSpecRxGiven'
    | 'habitual'
    | 'dryRetinoscopy'
    | 'autoRefraction'
    | 'wetRefraction'
    | 'subjectiveRefraction'
    | 'givenRefraction';
  const consultRows: { name: string; code: RowCode }[] = [
    {
      name: 'Previous Spectacles Rx',
      code: 'prevSpecRxGiven',
    },
    {
      name: 'Habitual (if different from above)',
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

  const preciseInputProps = {
    precision: 2,
    step: 0.25,
  };

  const navigate = useNavigate();

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
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'RightEyeSphere')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'RightEyeSphere', value ?? null);
                    }}
                  />
                </td>
                <td>/</td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'RightCylinder')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'RightCylinder', value ?? null);
                    }}
                  />
                </td>
                <td>x</td>
                <td>
                  <NumberInput
                    defaultValue={consult.get(row.code + 'RightAxis')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'RightAxis', value ?? null);
                    }}
                  />
                </td>
                <td>
                  <TextInput
                    maxLength={10}
                    defaultValue={consult.get(row.code + 'RightVA')}
                    onChange={(event) => {
                      setFieldByKey(
                        row.code + 'RightVA',
                        event.currentTarget.value
                      );
                    }}
                  />
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'RightAdd')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'RightAdd', value ?? null);
                    }}
                  />
                </td>
                <td>
                  {index !== consultRows.length - 1 && (
                    <Button compact variant="subtle">
                      <IconArrowAutofitDown
                        onClick={() => {
                          const nextRow = consultRows[index + 1];
                          const fieldsToSet: [
                            key: string,
                            value: string | number | null
                          ][] = [];

                          fieldsToSet.push(
                            [
                              nextRow.code + 'RightEyeSphere',
                              consult.get(row.code + 'RightEyeSphere'),
                            ],
                            [
                              nextRow.code + 'RightCylinder',
                              consult.get(row.code + 'RightCylinder'),
                            ],
                            [
                              nextRow.code + 'RightAxis',
                              consult.get(row.code + 'RightAxis'),
                            ],
                            [
                              nextRow.code + 'RightVA',
                              consult.get(row.code + 'RightVA'),
                            ],
                            [
                              nextRow.code + 'RightAdd',
                              consult.get(row.code + 'RightAdd'),
                            ]
                          );

                          fieldsToSet.push(
                            [
                              nextRow.code + 'LeftEyeSphere',
                              consult.get(row.code + 'LeftEyeSphere'),
                            ],
                            [
                              nextRow.code + 'LeftCylinder',
                              consult.get(row.code + 'LeftCylinder'),
                            ],
                            [
                              nextRow.code + 'LeftAxis',
                              consult.get(row.code + 'LeftAxis'),
                            ],
                            [
                              nextRow.code + 'LeftVA',
                              consult.get(row.code + 'LeftVA'),
                            ],
                            [
                              nextRow.code + 'LeftAdd',
                              consult.get(row.code + 'LeftAdd'),
                            ]
                          );

                          (nextRow.name === 'Previous Spectacles Rx' ||
                            nextRow.name === 'Given refraction') &&
                            fieldsToSet.push([
                              nextRow.code + 'BVA',
                              consult.get(row.code + 'BVA'),
                            ]);

                          setFieldsByKeys(fieldsToSet);
                        }}
                      />
                    </Button>
                  )}
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftEyeSphere')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'LeftEyeSphere', value ?? null);
                    }}
                  />
                </td>
                <td>/</td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftCylinder')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'LeftCylinder', value ?? null);
                    }}
                  />
                </td>
                <td>x</td>
                <td>
                  <NumberInput
                    defaultValue={consult.get(row.code + 'LeftAxis')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'LeftAxis', value ?? null);
                    }}
                  />
                </td>
                <td>
                  <TextInput
                    defaultValue={consult.get(row.code + 'LeftVA')}
                    onChange={(event) => {
                      setFieldByKey(
                        row.code + 'LeftVA',
                        event.currentTarget.value
                      );
                    }}
                  />
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftAdd')}
                    onChange={(value) => {
                      setFieldByKey(row.code + 'LeftAdd', value ?? null);
                    }}
                  />
                </td>
                {row.name === 'Previous Spectacles Rx' ||
                row.name === 'Given refraction' ? (
                  <td>
                    <TextInput
                      maxLength={10}
                      defaultValue={consult.get(row.code + 'BVA')}
                      onChange={(event) => {
                        setFieldByKey(
                          row.code + 'BVA',
                          event.currentTarget.value
                        );
                      }}
                    />
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
          <Button
            color="yellow"
            onClick={() => {
              const placeholder_id = 'fake_id_1234';
              navigate(`/spectacles-details/${placeholder_id}`);
            }}
          >
            SCRIPT
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
