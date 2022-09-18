import {
  Text,
  Checkbox,
  Grid,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
  Group,
} from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import { IConsult } from '../consult-details-page';
import { DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';

type ConsultDetailsUpperProps = {
  consult: IConsult;
  onUpdateConsult: (updatedConsult: IConsult) => void;
};

export const ConsultDetailsUpper = ({
  consult,
  onUpdateConsult,
}: ConsultDetailsUpperProps) => {
  const form = useForm({
    initialValues: {
      ...consult,
    },
  });

  return (
    <Grid columns={5} justify="flex-end">
      {/*Column 1*/}
      <Grid.Col lg={1} md={3}>
        <Stack>
          <Textarea
            label="History:"
            required
            placeholder="Type here..."
            autosize
            minRows={4}
            {...form.getInputProps('history')}
          />
          <TextInput
            label="Medication:"
            {...form.getInputProps('medication')}
            required
          />
          {/*TODO: improve spacing below title*/}
          <Title order={6} className="-mb-3">
            Visual Acuity
          </Title>
          <SimpleGrid cols={3}>
            <TextInput
              label="Right:"
              {...form.getInputProps('rightVisualAcuity')}
              required
            />
            <TextInput
              label="Left:"
              {...form.getInputProps('leftVisualAcuity')}
              required
            />
            <TextInput
              label="Both:"
              {...form.getInputProps('bothVisualAcuity')}
            />
          </SimpleGrid>
          <Title order={6} className="-mb-3">
            Near Acuity
          </Title>
          <SimpleGrid cols={3}>
            <TextInput
              label="Right:"
              {...form.getInputProps('rightNearAcuity')}
            />
            <TextInput
              label="Left:"
              {...form.getInputProps('leftNearAcuity')}
            />
            <TextInput
              label="Both:"
              {...form.getInputProps('bothNearAcuity')}
            />
          </SimpleGrid>
          <Title order={6} className="-mb-3">
            Cover Test
          </Title>
          <SimpleGrid cols={3}>
            <TextInput
              label="Distance:"
              classNames={{ label: 'whitespace-nowrap' }}
              {...form.getInputProps('distanceCoverTest')}
            />
            <TextInput label="Near:" {...form.getInputProps('nearCoverTest')} />
          </SimpleGrid>
        </Stack>
      </Grid.Col>
      {/*Column 2*/}
      <Grid.Col lg={1} md={2}>
        <Stack>
          <TextInput label="NPC:" {...form.getInputProps('npc')} />
          <TextInput label="Motility:" {...form.getInputProps('motility')} />
          <TextInput label="Pupils:" {...form.getInputProps('pupils')} />
          <TextInput
            label="Pupil Distance:"
            {...form.getInputProps('pupilDistance')}
          />
          <TextInput
            label="Fields/Colour Vision/Other:"
            {...form.getInputProps('fieldsColourVisionOther')}
          />
          <Title order={6} className="-mb-3">
            Eye Pressures (mmHg)
          </Title>
          <SimpleGrid cols={3}>
            <TextInput
              label="Right:"
              {...form.getInputProps('rightEyePressure')}
            />
            <TextInput
              label="Left:"
              {...form.getInputProps('leftEyePressure')}
            />
          </SimpleGrid>
          {/*TODO: add time administered*/}
          <Checkbox
            {...form.getInputProps('cyclopentolate')}
            label="Cyclopentolate 1.0%"
          />
          <Checkbox
            {...form.getInputProps('Tropicamide')}
            label="Tropicamide 1.0%"
          />
        </Stack>
      </Grid.Col>
      {/*Column 3 and 4*/}
      <Grid.Col lg={2} md={5}>
        <Grid columns={2}>
          <Grid.Col span={1}>
            <Stack>
              <Textarea
                label="Binocular Vision:"
                placeholder="Type here..."
                autosize
                minRows={4}
                {...form.getInputProps('binocularVision')}
              />
              <Textarea
                label="Diagnosis:"
                placeholder="Type here..."
                autosize
                minRows={4}
                required
                {...form.getInputProps('diagnosis')}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack>
              <Textarea
                label="Anterior Health:"
                placeholder="Type here..."
                autosize
                minRows={4}
                required
                {...form.getInputProps('anteriorHealth')}
              />
              <Textarea
                label="Posterior Health:"
                placeholder="Type here..."
                autosize
                minRows={4}
                required
                {...form.getInputProps('posteriorHealth')}
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid columns={3}>
          <Grid.Col span={1}>
            <Stack>
              <TextInput
                label="Spectacle Code:"
                classNames={{ label: 'whitespace-nowrap' }}
                {...form.getInputProps('spectacleCode')}
              />
              <TextInput
                label="Heights:"
                {...form.getInputProps('heights')}
                placeholder="Datum"
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput label="Colour:" {...form.getInputProps('colour')} />
                <TextInput
                  label="Lens Type:"
                  {...form.getInputProps('lensType')}
                />
              </SimpleGrid>
              <TextInput
                label="Spectacle Note:"
                {...form.getInputProps('spectacleNote')}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      {/*Column 5*/}
      <Grid.Col lg={1} md={5}>
        <Stack>
          <Textarea
            label="Management:"
            placeholder="Type here..."
            autosize
            minRows={4}
            required
            {...form.getInputProps('management')}
          />
          <Textarea
            label="Layperson Notes:"
            placeholder="Include the diagnosis, management plan and prognosis/recall in lay terms"
            autosize
            minRows={11}
            {...form.getInputProps('laypersonNotes')}
          />
          {/*TODO: figure out what's going on with the recall box (it should probably be two boxes)*/}
          <Title order={6} className="-mb-3">
            Recall
          </Title>
          <Group>
            <DatePicker
              label="Date:"
              className="w-32"
              allowFreeInput
              inputFormat="DD/MM/YYYY"
              dateParser={(date: string) =>
                dayjs(date, ['DD/MM/YYYY', 'DD/MM/YY']).toDate()
              }
              placeholder="DD/MM/YYYY"
              initialMonth={new Date()}
              {...form.getInputProps('recallDate')}
            />
            <TextInput
              label="Reason:"
              {...form.getInputProps('recallDescription')}
            />
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
