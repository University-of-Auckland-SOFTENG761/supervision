import { Table, TableTheme, Button } from '@shared';
import { TextInput, Grid, Stack, NumberInput } from '@mantine/core';
import { IconArrowAutofitDown } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import { ConsultDocType } from 'database';
import {
  UseFormRegister,
  FieldValues,
  UseFormGetValues,
} from 'react-hook-form';

type ConsultDetailsLowerProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: (name: string, value: unknown, urgent?: boolean) => void;
};

export const ConsultDetailsLower = ({
  consult,
  register,
  getValues,
  setValue,
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
                    {...register(`consult.${row.code}RightEyeSphere`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}RightEyeSphere`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>/</td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'RightCylinder')}
                    {...register(`consult.${row.code}RightCylinder`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}RightCylinder`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>x</td>
                <td>
                  <NumberInput
                    defaultValue={consult.get(row.code + 'RightAxis')}
                    {...register(`consult.${row.code}RightAxis`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}RightAxis`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>
                  <TextInput
                    maxLength={10}
                    defaultValue={consult.get(row.code + 'RightVA')}
                    {...register(`consult.${row.code}RightVA`)}
                  />
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'RightAdd')}
                    {...register(`consult.${row.code}RightAdd`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}RightAdd`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>
                  {index !== consultRows.length - 1 && (
                    <Button compact variant="subtle">
                      <IconArrowAutofitDown
                        onClick={() => {
                          const nextRow = consultRows[index + 1];
                          const newConsult = {
                            ...getValues('consult'),
                            [`${nextRow.code}RightEyeSphere`]: getValues(
                              `consult.${row.code}RightEyeSphere`
                            ),
                            [`${nextRow.code}RightCylinder`]: getValues(
                              `consult.${row.code}RightCylinder`
                            ),
                            [`${nextRow.code}RightAxis`]: getValues(
                              `consult.${row.code}RightAxis`
                            ),
                            [`${nextRow.code}RightVA`]: getValues(
                              `consult.${row.code}RightVA`
                            ),
                            [`${nextRow.code}RightAdd`]: getValues(
                              `consult.${row.code}RightAdd`
                            ),
                            [`${nextRow.code}LeftEyeSphere`]: getValues(
                              `consult.${row.code}LeftEyeSphere`
                            ),
                            [`${nextRow.code}LeftCylinder`]: getValues(
                              `consult.${row.code}LeftCylinder`
                            ),
                            [`${nextRow.code}LeftAxis`]: getValues(
                              `consult.${row.code}LeftAxis`
                            ),
                            [`${nextRow.code}LeftVA`]: getValues(
                              `consult.${row.code}LeftVA`
                            ),
                            [`${nextRow.code}LeftAdd`]: getValues(
                              `consult.${row.code}LeftAdd`
                            ),
                          };
                          setValue(
                            'consult',
                            nextRow.name === 'Previous Spectacles Rx' ||
                              nextRow.name === 'Given refraction'
                              ? {
                                  ...newConsult,
                                  [`${nextRow.code}BVA`]: getValues(
                                    `consult.${row.code}BVA`
                                  ),
                                }
                              : newConsult,
                            true
                          );
                        }}
                      />
                    </Button>
                  )}
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftEyeSphere')}
                    {...register(`consult.${row.code}LeftEyeSphere`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}LeftEyeSphere`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>/</td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftCylinder')}
                    {...register(`consult.${row.code}LeftCylinder`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}LeftCylinder`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>x</td>
                <td>
                  <NumberInput
                    defaultValue={consult.get(row.code + 'LeftAxis')}
                    {...register(`consult.${row.code}LeftAxis`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}LeftAxis`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                <td>
                  <TextInput
                    defaultValue={consult.get(row.code + 'LeftVA')}
                    {...register(`consult.${row.code}LeftVA`)}
                  />
                </td>
                <td>
                  <NumberInput
                    {...preciseInputProps}
                    defaultValue={consult.get(row.code + 'LeftAdd')}
                    {...register(`consult.${row.code}LeftAdd`, {
                      valueAsNumber: true,
                    })}
                    min={undefined}
                    max={undefined}
                    onChange={(value) => {
                      setValue(
                        `consult.${row.code}LeftAdd`,
                        value ?? undefined
                      );
                    }}
                  />
                </td>
                {row.name === 'Previous Spectacles Rx' ||
                row.name === 'Given refraction' ? (
                  <td>
                    <TextInput
                      maxLength={10}
                      defaultValue={consult.get(row.code + 'BVA')}
                      {...register(`consult.${row.code}BVA`)}
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
