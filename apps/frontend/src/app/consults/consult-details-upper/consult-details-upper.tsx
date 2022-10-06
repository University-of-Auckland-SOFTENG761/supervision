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
import { applyDateFormat } from 'utils/date.utils';
import { ConsultDocType } from 'database';

type ConsultDetailsUpperProps = {
  consultRef: React.MutableRefObject<ConsultDocType | null>;
};

export const ConsultDetailsUpper = ({
  consultRef,
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
            minRows={4}
            defaultValue={consultRef?.current?.history}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.history = e.currentTarget.value);
            }}
          />
          <TextInput
            label="Medication:"
            defaultValue={consultRef?.current?.medication}
            onChange={(e) =>
              consultRef?.current &&
              (consultRef.current.medication = e.currentTarget.value)
            }
            required
          />
          <VisualAcuityInputs
            visualAcuityRightProps={{
              defaultValue: consultRef?.current?.visualAcuityRight,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.visualAcuityRight =
                    e.currentTarget.value);
              },
            }}
            visualAcuityLeftProps={{
              defaultValue: consultRef?.current?.visualAcuityLeft,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.visualAcuityLeft = e.currentTarget.value);
              },
            }}
            visualAcuityBothProps={{
              defaultValue: consultRef?.current?.visualAcuityBoth,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.visualAcuityBoth = e.currentTarget.value);
              },
            }}
          />
          <NearAcuityInputs
            nearAcuityRightProps={{
              defaultValue: consultRef?.current?.nearAcuityRight,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.nearAcuityRight = e.currentTarget.value);
              },
            }}
            nearAcuityLeftProps={{
              defaultValue: consultRef?.current?.nearAcuityLeft,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.nearAcuityLeft = e.currentTarget.value);
              },
            }}
            nearAcuityBothProps={{
              defaultValue: consultRef?.current?.nearAcuityBoth,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.nearAcuityBoth = e.currentTarget.value);
              },
            }}
          />
          <CoverTestInputs
            coverTestDistanceProps={{
              defaultValue: consultRef?.current?.coverTestDistance,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.coverTestDistance =
                    e.currentTarget.value);
              },
            }}
            coverTestNearProps={{
              defaultValue: consultRef?.current?.coverTestNear,
              onChange: (e) => {
                consultRef?.current &&
                  (consultRef.current.coverTestNear = e.currentTarget.value);
              },
            }}
          />
        </Stack>
      </Grid.Col>
      {/*Column 2*/}
      <Grid.Col lg={1} md={2}>
        <Stack>
          <TextInput
            label="NPC:"
            maxLength={8}
            defaultValue={consultRef?.current?.nearPointOfConvergence}
            onChange={(e) =>
              consultRef?.current &&
              (consultRef.current.nearPointOfConvergence =
                e.currentTarget.value)
            }
          />
          <TextInput
            label="Motility:"
            maxLength={8}
            defaultValue={consultRef?.current?.motility}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.motility = e.currentTarget.value);
            }}
          />
          <TextInput
            label="Pupils:"
            maxLength={8}
            defaultValue={consultRef?.current?.pupils}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.pupils = e.currentTarget.value);
            }}
          />
          <NumberInput
            label="Pupillary Distance:"
            defaultValue={consultRef?.current?.spectaclePupillaryDistance}
            onChange={(n) => {
              consultRef?.current &&
                (consultRef.current.spectaclePupillaryDistance =
                  n ?? Number(null));
            }}
          />
          <TextInput
            label="Fields/Colour Vision/Other:"
            maxLength={20}
            defaultValue={consultRef?.current?.otherField}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.otherField = e.currentTarget.value);
            }}
          />
          {/*TODO: add timestamp for eye pressure*/}
          <EyePressureInputs
            eyePressureRightProps={{
              defaultValue: consultRef?.current?.eyePressureRight,
              onChange: (n) => {
                consultRef?.current &&
                  (consultRef.current.eyePressureRight = n ?? Number(null));
              },
            }}
            eyePressureLeftProps={{
              defaultValue: consultRef?.current?.eyePressureLeft,
              onChange: (n) => {
                consultRef?.current &&
                  (consultRef.current.eyePressureLeft = n ?? Number(null));
              },
            }}
            eyePressureTimestampProps={{
              defaultValue: consultRef?.current?.eyePressureTimestamp
                ? new Date(consultRef?.current?.eyePressureTimestamp)
                : undefined,
              onChange: (d) => {
                consultRef?.current &&
                  (consultRef.current.eyePressureTimestamp = d.toISOString());
              },
            }}
            setEyePressureTimestamp={(timestamp: Date | null) => {
              consultRef?.current &&
                (consultRef.current.eyePressureTimestamp =
                  timestamp?.toISOString());
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
                  defaultChecked={consultRef?.current?.isCyclopentolate}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : null;
                    consultRef?.current &&
                      (consultRef.current.isCyclopentolate = checked);
                    consultRef?.current &&
                      (consultRef.current.cyclopentolateTimestamp =
                        timestamp?.toISOString());
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  defaultValue={
                    consultRef?.current?.cyclopentolateTimestamp
                      ? new Date(consultRef?.current?.cyclopentolateTimestamp)
                      : undefined
                  }
                  onChange={(d) => {
                    consultRef?.current &&
                      (consultRef.current.cyclopentolateTimestamp =
                        d.toISOString());
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
                  defaultChecked={consultRef?.current?.isTropicamide}
                  onChange={(event) => {
                    const checked: boolean = event.currentTarget.checked;
                    const timestamp = checked ? new Date() : null;
                    consultRef?.current &&
                      (consultRef.current.isTropicamide = checked);
                    consultRef?.current &&
                      (consultRef.current.tropicamideTimestamp =
                        timestamp?.toISOString());
                  }}
                />
                <TimeInput
                  label="Administered:"
                  format="12"
                  className="w-28"
                  defaultValue={
                    consultRef?.current?.tropicamideTimestamp
                      ? new Date(consultRef?.current?.tropicamideTimestamp)
                      : undefined
                  }
                  onChange={(d) => {
                    consultRef?.current &&
                      (consultRef.current.tropicamideTimestamp =
                        d.toISOString());
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
                minRows={4}
                defaultValue={consultRef?.current?.binocularVision}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.binocularVision =
                      e.currentTarget.value);
                }}
              />
              <Textarea
                label="Diagnosis:"
                placeholder="Type here..."
                autosize
                minRows={4}
                required
                defaultValue={consultRef?.current?.diagnosis}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.diagnosis = e.currentTarget.value);
                }}
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
                defaultValue={consultRef?.current?.anteriorHealth}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.anteriorHealth = e.currentTarget.value);
                }}
              />
              <Textarea
                label="Posterior Health:"
                placeholder="Type here..."
                autosize
                minRows={4}
                required
                defaultValue={consultRef?.current?.posteriorHealth}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.posteriorHealth =
                      e.currentTarget.value);
                }}
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
                defaultValue={consultRef?.current?.spectacleCode}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.spectacleCode = e.currentTarget.value);
                }}
              />
              <TextInput
                label="Heights:"
                defaultValue={consultRef?.current?.spectacleHeights}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.spectacleHeights =
                      e.currentTarget.value);
                }}
                placeholder="Datum"
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack>
              <SimpleGrid cols={2}>
                <TextInput
                  label="Colour:"
                  defaultValue={consultRef?.current?.spectacleColour}
                  onChange={(e) => {
                    consultRef?.current &&
                      (consultRef.current.spectacleColour =
                        e.currentTarget.value);
                  }}
                />
                <TextInput
                  label="Lens Type:"
                  defaultValue={consultRef?.current?.spectacleLensType}
                  onChange={(e) => {
                    consultRef?.current &&
                      (consultRef.current.spectacleLensType =
                        e.currentTarget.value);
                  }}
                />
              </SimpleGrid>
              <TextInput
                label="Spectacles Note:"
                defaultValue={consultRef?.current?.spectacleNotes}
                onChange={(e) => {
                  consultRef?.current &&
                    (consultRef.current.spectacleNotes = e.currentTarget.value);
                }}
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
            defaultValue={consultRef?.current?.management}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.management = e.currentTarget.value);
            }}
          />
          <Textarea
            label="Layperson Notes:"
            placeholder="Include the diagnosis, management plan and prognosis/recall in lay terms"
            autosize
            minRows={11}
            defaultValue={consultRef?.current?.layPersonNotes}
            onChange={(e) => {
              consultRef?.current &&
                (consultRef.current.layPersonNotes = e.currentTarget.value);
            }}
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
                  consultRef?.current &&
                    (consultRef.current.recallDate = undefined);
                  return;
                }
                const nextDate = value
                  ? dayjs().add(parseInt(value), 'month')
                  : undefined;
                consultRef?.current &&
                  (consultRef.current.recallDate = nextDate?.toISOString());
              }}
            />
            <Text>
              {consultRef?.current?.recallDate
                ? applyDateFormat(new Date(consultRef.current.recallDate))
                : ''}
            </Text>
            <TextInput
              label="Reason:"
              defaultValue={consultRef?.current?.recallDescription}
              onChange={(e) => {
                consultRef?.current &&
                  (consultRef.current.recallDescription =
                    e.currentTarget.value);
              }}
            />
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
