import {
  Checkbox,
  Grid,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
  Title,
  Group,
  Select,
} from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import { IConsult } from '../consult-details-page';
import { VisualAcuityInputs } from './visual-acuity-inputs';
import { TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { NearAcuityInputs } from './near-acuity-inputs';
import { CoverTestInputs } from './cover-test-inputs';
import { EyePressureInputs } from './eye-pressure-inputs';

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
          <VisualAcuityInputs
            {...{
              ...form.getInputProps('rightVisualAcuity'),
              ...form.getInputProps('leftVisualAcuity'),
              ...form.getInputProps('bothVisualAcuity'),
            }}
          />
          <NearAcuityInputs
            {...{
              ...form.getInputProps('rightNearAcuity'),
              ...form.getInputProps('leftNearAcuity'),
              ...form.getInputProps('bothNearAcuity'),
            }}
          />
          <CoverTestInputs
            {...{
              ...form.getInputProps('distanceCoverTest'),
              ...form.getInputProps('nearCoverTest'),
            }}
          />
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
          {/*TODO: add timestamp for eye pressure*/}
          <EyePressureInputs
            {...{
              ...form.getInputProps('eyePressureRight'),
              ...form.getInputProps('eyePressureLeft'),
            }}
            eyePressureRightProps={{
              ...form.getInputProps('eyePressureRight'),
            }}
            eyePressureLeftProps={{ ...form.getInputProps('eyePressureLeft') }}
            eyePressureTimestampProps={{
              ...form.getInputProps('eyePressureTimeStamp'),
            }}
            setEyePressureTimestamp={(timestamp: Date) => {
              form.setFieldValue('eyePressureTimeStamp', timestamp);
            }}
          />
          {/*TODO: Refactor cyclopentolate/tropicamide into a separate file*/}
          <Group>
            <Stack>
              <Title order={6} className="-mb-3">
                Cyclopentolate
              </Title>
              <Group>
                <Checkbox
                  {...form.getInputProps('isCyclopentolate', {
                    type: 'checkbox',
                  })}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : undefined;
                    form.setFieldValue('isCyclopentolate', checked);
                    form.setFieldValue('cyclopentolateTimestamp', timestamp);
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  {...form.getInputProps('cyclopentolateTimestamp')}
                />
              </Group>
            </Stack>
            <Stack>
              <Title order={6} className="-mb-3">
                Tropicamide
              </Title>
              <Group>
                <Checkbox
                  {...form.getInputProps('isTropicamide', { type: 'checkbox' })}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : undefined;
                    form.setFieldValue('isTropicamide', checked);
                    form.setFieldValue('tropicamideTimestamp', timestamp);
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  {...form.getInputProps('tropicamideTimestamp')}
                />
              </Group>
            </Stack>
          </Group>
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
                label="Spectacles Code:"
                classNames={{ label: 'whitespace-nowrap' }}
                {...form.getInputProps('spectaclesCode')}
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
                label="Spectacles Note:"
                {...form.getInputProps('spectaclesNote')}
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
          <Title order={6} className="-mb-3">
            Recall
          </Title>
          <Group>
            <Select
              label="Date:"
              className="w-32"
              clearable
              data={[
                { value: '1', label: '1M' },
                { value: '3', label: '3M' },
                { value: '6', label: '6M' },
                { value: '12', label: '1Y' },
                { value: '24', label: '2Y' },
              ]}
              placeholder="Select one"
              onChange={(value) => {
                const nextDate = value
                  ? dayjs().add(parseInt(value), 'month')
                  : undefined;
                form.setFieldValue('recallDate', nextDate?.toDate());
              }}
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
