import { Test } from '@nestjs/testing';
import { PatientResolver } from '@supervision/patients';
import { CreatePatientInput } from '@supervision/patients/dto/create-patient.input';
import { PatientService } from '@supervision/patients';
import { TestingModule } from '@nestjs/testing';
import { UpdatePatientInput } from '@supervision/patients/dto/update-patient.input';

describe('patient resolver', () => {
  let patientResolver: PatientResolver;

  const fakePatient = {
    firstName: 'Davo',
    lastName: 'Smith',
    dateOfBirth: new Date(),
    sex: null,
    ethnicity: null,
    school: null,
    yearLevel: null,
    yearLevelLastUpdated: null,
    room: null,
    caregiverFirstName: 'Steveo',
    caregiverLastName: 'Smith',
    phoneNumber: null,
    email: null,
    streetAddress: null,
    suburb: null,
    city: null,
    postcode: null,
    recalls: null,
    adminNotes: null,
    screeningList: null,
  };

  const mockService = {
    create: jest.fn().mockImplementation(async (dto: CreatePatientInput) => {
      return { ...dto, id: Date() };
    }),
    findOne: jest.fn().mockImplementation(async (id: string) => {
      return { ...fakePatient, id: id };
    }),
    findOneByName: jest
      .fn()
      .mockImplementation(
        async (firstName: string, lastName: string | null) => {
          return {
            ...fakePatient,
            id: Date(),
            firstName: firstName,
            lastName: lastName,
          };
        }
      ),

    findAll: jest.fn().mockImplementation(async () => {
      return [{ ...fakePatient, id: Date() }];
    }),

    getUpdatedPatients: jest
      .fn()
      .mockImplementation(
        async (
          minUpdatedAt: Date | null,
          lastId: string | null,
          limit: number
        ) => {
          return [
            {
              ...fakePatient,
              id: lastId ? lastId : Date(), // Currently not working - returns empty array
            },
          ];
        }
      ),

    patients: jest.fn().mockImplementation(async () => {
      return [{ ...fakePatient, id: Date() }];
    }),

    update: jest
      .fn()
      .mockImplementation(
        (id: string, updatePatientInput: UpdatePatientInput) => {
          return {
            ...fakePatient,
            ...updatePatientInput,
          };
        }
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService, PatientResolver],
    })
      .overrideProvider(PatientService)
      .useValue(mockService)
      .compile();

    patientResolver = module.get<PatientResolver>(PatientResolver);
  });

  it('should be defined', () => {
    expect(patientResolver).toBeDefined();
  });

  it('should get a replication feed', async () => {
    expect(
      await patientResolver.replicationFeed({
        lastId: 'id_string',
        minUpdatedAt: null,
        limit: 5,
      })
    ).toContainEqual({
      ...fakePatient,
      id: 'id_string',
    });
    expect(mockService.getUpdatedPatients).toBeCalled();
  });

  it('should query a patient by id', async () => {
    expect(await patientResolver.patient('id_string')).toEqual({
      ...fakePatient,
      id: 'id_string',
    });
    expect(mockService.findOne).toBeCalled();
  });

  it('should query a patient by name', async () => {
    expect(await patientResolver.findPatientByName('Bean', 'Eater')).toEqual({
      ...fakePatient,
      id: expect.any(String),
      firstName: 'Bean',
      lastName: 'Eater',
    });
    expect(mockService.findOneByName).toBeCalled();
  });

  it('should get all patients', async () => {
    expect(await patientResolver.patients()).toContainEqual({
      ...fakePatient,
      id: expect.any(String),
    });
  });

  it('should update a patient', async () => {
    const updatePatientInput: UpdatePatientInput = {
      id: 'id_string',
      firstName: 'Rick',
      school: 'Auckland High',
    };

    expect(await patientResolver.updatePatient(updatePatientInput)).toEqual({
      ...fakePatient,
      ...updatePatientInput,
    });

    expect(mockService.update).toBeCalled();
  });
});
