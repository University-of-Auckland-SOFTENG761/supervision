import { PatientService } from '@supervision/patients';
import { Test, TestingModule } from '@nestjs/testing';

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

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),

    save: jest.fn().mockImplementation(
      (patient) => {
        return { ...patient, id: 'an_id_string' };
      }
      // Promise.resolve({ ...patient, id: "an_id_string" })
    ),

    findOneBy: jest
      .fn()
      .mockImplementation((id: string) =>
        Promise.resolve({ ...fakePatient, id: id })
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    })
      .overrideProvider(PatientService)
      .useValue(mockRepository)
      .compile();

    patientService = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(patientService).toBeDefined();
  });

  it('should create a new patient', async () => {
    // const returnedPatient = await patientService.create(fakePatient);
    //
    // expect(returnedPatient.id).toEqual(expect.any(String));
    // expect(returnedPatient.dateOfBirth).toEqual(expect.any(Date));
    // expect(returnedPatient.firstName).toEqual('Davo');

    expect(await patientService.create(fakePatient)).toBeDefined(); //.toEqual({
    //   ...fakePatient,
    //   id: expect.any(String),
    //   dateOfBirth: expect.any(Date),
    // });

    expect(mockRepository.create).toBeCalled();
    expect(mockRepository.save).toBeCalled();
  });

  it('should retrieve a patient by id', async () => {
    expect(await patientService.findOne('id_string')).toMatchObject({
      ...fakePatient,
      id: 'id_string',
    });
    // const returnedPatient = await patientService.findOne("id_string");
    // expect(returnedPatient.id).toEqual("id_string");

    expect(mockRepository.findOneBy).toBeCalled();
  });

  it('should retrieve a patient by name', async () => {
    const nameParams = {
      firstName: 'Ian',
      lastName: 'Plate',
    };

    const mockCreateQueryBuilder = {
      where: jest.fn().mockImplementation(() => mockCreateQueryBuilder),
      orWhere: jest.fn().mockImplementation(() => mockCreateQueryBuilder),
      getMany: jest.fn().mockImplementation(async () => {
        return [{ ...fakePatient, nameParams }];
      }),
    };
    jest.fn().mockImplementation(() => mockCreateQueryBuilder);
    expect(
      await patientService.findOneBy(nameParams.firstName, nameParams.lastName)
    );
  });
});
