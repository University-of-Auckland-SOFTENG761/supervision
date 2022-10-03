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
  Text,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { VisualAcuityInputs } from './visual-acuity-inputs';
import { TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { NearAcuityInputs } from './near-acuity-inputs';
import { CoverTestInputs } from './cover-test-inputs';
import { EyePressureInputs } from './eye-pressure-inputs';
import { FormInputType } from '../consult-inputs';
import { applyDateFormat } from 'utils/date.utils';

type ConsultDetailsUpperProps = {
  form: UseFormReturnType<FormInputType>;
};

export const ConsultDetailsUpper = ({ form }: ConsultDetailsUpperProps) => {
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
            visualAcuityRightProps={form.getInputProps('visualAcuityRight')}
            visualAcuityLeftProps={form.getInputProps('visualAcuityLeft')}
            visualAcuityBothProps={form.getInputProps('visualAcuityBoth')}
          />
          <NearAcuityInputs
            nearAcuityRightProps={form.getInputProps('nearAcuityRight')}
            nearAcuityLeftProps={form.getInputProps('nearAcuityLeft')}
            nearAcuityBothProps={form.getInputProps('nearAcuityBoth')}
          />
          <CoverTestInputs
            coverTestDistanceProps={form.getInputProps('coverTestDistance')}
            coverTestNearProps={form.getInputProps('coverTestNear')}
          />
        </Stack>
      </Grid.Col>
      {/*Column 2*/}
      <Grid.Col lg={1} md={2}>
        <Stack>
          <TextInput
            label="NPC:"
            {...form.getInputProps('nearPointOfConvergence')}
          />
          <TextInput label="Motility:" {...form.getInputProps('motility')} />
          <TextInput label="Pupils:" {...form.getInputProps('pupils')} />
          <TextInput
            label="Pupillary Distance:"
            {...form.getInputProps('pupillaryDistance')}
          />
          <TextInput
            label="Fields/Colour Vision/Other:"
            {...form.getInputProps('otherField')}
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
              ...form.getInputProps('eyePressureTimestamp'),
            }}
            setEyePressureTimestamp={(timestamp: Date | null) => {
              form.setFieldValue('eyePressureTimestamp', timestamp);
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
                    const timestamp = checked ? new Date() : null;
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
                    const timestamp = checked ? new Date() : null;
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
                label="Spectacle Code:"
                classNames={{ label: 'whitespace-nowrap' }}
                {...form.getInputProps('spectacleCode')}
              />
              <TextInput
                label="Heights:"
                {...form.getInputProps('spectacleHeights')}
                placeholder="Datum"
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Colour:"
                  {...form.getInputProps('spectacleColour')}
                />
                <TextInput
                  label="Lens Type:"
                  {...form.getInputProps('spectacleLensType')}
                />
              </SimpleGrid>
              <TextInput
                label="Spectacle Note:"
                {...form.getInputProps('spectacleNotes')}
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
                if (!value) {
                  form.setFieldValue('recallDate', undefined);
                  return;
                }
                const nextDate = value
                  ? dayjs().add(parseInt(value), 'month')
                  : undefined;
                form.setFieldValue('recallDate', nextDate?.toISOString() ?? '');
              }}
            />
            <Text>
              {form.values.recallDate
                ? applyDateFormat(new Date(form.values.recallDate))
                : ''}
            </Text>
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
