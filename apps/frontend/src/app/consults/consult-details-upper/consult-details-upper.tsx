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
  NumberInput,
} from '@mantine/core';
import { VisualAcuityInputs } from './visual-acuity-inputs';
import { TimeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { NearAcuityInputs } from './near-acuity-inputs';
import { CoverTestInputs } from './cover-test-inputs';
import { EyePressureInputs } from './eye-pressure-inputs';
import { ConsultDocType } from 'database';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { RxDocument } from 'rxdb';
import { parseDateForInput, parseNumberForInput } from 'database/rxdb-utils';

type ConsultDetailsUpperProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown, urgent?: boolean) => void;
};

export const ConsultDetailsUpper = ({
  consult,
  register,
  setValue,
}: ConsultDetailsUpperProps) => {
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
            defaultValue={consult.get('history')}
            {...register('consult.history')}
            minRows={4}
          />
          <TextInput
            label="Medication:"
            defaultValue={consult.get('medication')}
            {...register('consult.medication')}
            required
          />
          <VisualAcuityInputs consult={consult} register={register} />
          <NearAcuityInputs consult={consult} register={register} />
          <CoverTestInputs consult={consult} register={register} />
        </Stack>
      </Grid.Col>
      {/*Column 2*/}
      <Grid.Col lg={1} md={2}>
        <Stack>
          <TextInput
            label="NPC:"
            defaultValue={consult.get('nearPointOfConvergence')}
            {...register('consult.nearPointOfConvergence')}
            maxLength={8}
          />
          <TextInput
            label="Motility:"
            defaultValue={consult.get('motility')}
            {...register('consult.motility')}
            maxLength={8}
          />
          <TextInput
            label="Pupils:"
            defaultValue={consult.get('pupils')}
            {...register('consult.pupils')}
            maxLength={8}
          />
          <NumberInput
            label="Pupillary Distance:"
            defaultValue={parseNumberForInput(
              consult.get('spectaclePupillaryDistance')
            )}
            {...register('consult.spectaclePupillaryDistance', {
              valueAsNumber: true,
            })}
            min={0}
            max={undefined}
            onChange={(value) => {
              setValue('consult.spectaclePupillaryDistance', value);
            }}
          />
          <TextInput
            label="Fields/Colour Vision/Other:"
            defaultValue={consult.get('otherField')}
            {...register('consult.otherField')}
            maxLength={20}
          />
          <EyePressureInputs
            consult={consult}
            register={register}
            setValue={setValue}
          />
          <Group>
            <Stack>
              <Title order={6} className="-mb-3">
                Cyclopentolate
              </Title>
              <Group>
                <Checkbox
                  defaultChecked={consult.get('isCyclopentolate')}
                  {...register('consult.isCyclopentolate')}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : undefined;
                    setValue('consult.isCyclopentolate', checked);
                    setValue(
                      'consult.cyclopentolateTimestamp',
                      timestamp,
                      true
                    );
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  value={parseDateForInput(
                    consult.get('cyclopentolateTimestamp')
                  )}
                  // {...register('consult.cyclopentolateTimestamp')}
                  onChange={(value) => {
                    setValue(
                      'consult.cyclopentolateTimestamp',
                      value ?? undefined,
                      true
                    );
                  }}
                />
              </Group>
            </Stack>
            <Stack>
              <Title order={6} className="-mb-3">
                Tropicamide
              </Title>
              <Group>
                <Checkbox
                  defaultChecked={consult.get('isTropicamide')}
                  {...register('consult.isTropicamide')}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : null;
                    setValue('consult.isTropicamide', checked);
                    setValue('consult.tropicamideTimestamp', timestamp, true);
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  value={parseDateForInput(consult.get('tropicamideTimestamp'))}
                  onChange={(value) => {
                    setValue(
                      'consult.tropicamideTimestamp',
                      value ?? undefined,
                      true
                    );
                  }}
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
                defaultValue={consult.get('binocularVision')}
                {...register('consult.binocularVision')}
                minRows={4}
              />
              <Textarea
                label="Diagnosis:"
                placeholder="Type here..."
                autosize
                required
                defaultValue={consult.get('diagnosis')}
                {...register('consult.diagnosis')}
                minRows={4}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Stack>
              <Textarea
                label="Anterior Health:"
                placeholder="Type here..."
                autosize
                required
                defaultValue={consult.get('anteriorHealth')}
                {...register('consult.anteriorHealth')}
                minRows={4}
              />
              <Textarea
                label="Posterior Health:"
                placeholder="Type here..."
                autosize
                required
                defaultValue={consult.get('posteriorHealth')}
                {...register('consult.posteriorHealth')}
                minRows={4}
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
                defaultValue={consult.get('spectacle.code')}
                {...register('consult.spectacle.code')}
              />
              <TextInput
                label="Heights:"
                defaultValue={consult.get('spectacle.heights')}
                {...register('consult.spectacle.heights')}
                placeholder="Datum"
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Colour:"
                  defaultValue={consult.get('spectacle.colour')}
                  {...register('consult.spectacle.colour')}
                />
                <TextInput
                  label="Lens Type:"
                  defaultValue={consult.get('spectacle.lensType')}
                  {...register('consult.spectacle.lensType')}
                />
              </SimpleGrid>
              <TextInput
                label="Spectacles Note:"
                defaultValue={consult.get('spectacle.notes')}
                {...register('consult.spectacle.notes')}
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
            defaultValue={consult.get('management')}
            {...register('consult.management')}
          />
          <Textarea
            label="Layperson Notes:"
            placeholder="Include the diagnosis, management plan and prognosis/recall in lay terms"
            autosize
            minRows={11}
            defaultValue={consult.get('layPersonNotes')}
            {...register('consult.layPersonNotes')}
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
                  setValue('consult.recallDate', undefined);
                  return;
                }
                const nextDate = value
                  ? dayjs().add(parseInt(value), 'month')
                  : undefined;
                setValue('consult.recallDate', nextDate?.toDate() ?? undefined);
              }}
            />
            <Text>{dayjs(consult.get('recallDate')).format('DD/MM/YYYY')}</Text>
            <TextInput
              label="Reason:"
              defaultValue={consult.get('recallDescription')}
              {...register('consult.recallDescription')}
            />
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
