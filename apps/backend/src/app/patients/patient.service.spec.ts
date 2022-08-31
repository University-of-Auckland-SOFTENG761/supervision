import { CreatePatientInput } from '@supervision/patients/dto/create-patient.input';
import { PatientService } from '@supervision/patients';
import { PatientEntity } from '@supervision/patients';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Module } from '@nestjs/common';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const mockRespository = {};

describe('patient service', () => {
  let patientService: PatientService;

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

  const mockRespository = {
    create: jest.fn().mockImplementation((dto) => dto),

    save: jest
      .fn()
      .mockImplementation((patient) =>
        Promise.resolve({ id: Date(), ...patient })
      ),

    findOne: jest
      .fn()
      .mockImplementation((id) => Promise.resolve({ id: id, ...fakePatient })),

    findOneBy: jest.fn().mockImplementation((firstName, lastName) =>
      Promise.resolve({
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        ...fakePatient,
      })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    })
      .overrideProvider(PatientService)
      .useValue(mockRespository)
      .compile();

    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(patientService).toBeDefined();
  });

  it('should create a new patient', async () => {
    expect(await patientService.create(fakePatient)).toEqual({
      id: expect.any(String),
      dateOfBirth: expect.any(Date),
      ...fakePatient,
    });
    expect(mockRespository.create()).toBeCalled();
    expect(mockRespository.save()).toBeCalled();
  });
});
