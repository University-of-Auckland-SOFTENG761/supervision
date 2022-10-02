import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patients';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.input';
import { SetPatientInput } from './dto/set-patient-input';
import { UpdatePatientInput } from './dto/update-patient.input';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>
  ) {}

  async create(patient: CreatePatientInput): Promise<PatientEntity> {
    const newPatient = await this.patientsRepository.create(patient);
    return await this.patientsRepository.save(newPatient);
  }

  async update(
    id: string,
    updatedPatient: UpdatePatientInput
  ): Promise<PatientEntity> {
    const patient = await this.patientsRepository.preload({
      id: id,
      ...updatedPatient,
    });
    if (!patient) {
      throw new Error(`Patient #${id} not found`);
    }
    return await this.patientsRepository.save(patient);
  }

  async set(patients: SetPatientInput[]): Promise<PatientEntity> {
    const newPatients = await this.patientsRepository.save(patients);
    return newPatients[newPatients.length - 1];
  }

  async findOne(id: string): Promise<PatientEntity> {
    return await this.patientsRepository.findOne({
      where: { id: id },
      relations: ['consults', 'spectacles'],
    });
  }

  // Find patient by first or last name
  // TODO: Check why date can't be read in query
  // https://stackoverflow.com/questions/58622522/date-field-returned-as-null-on-graphql-query-despite-data-existing
  async findOneByName(
    firstName: string,
    lastName: string | null = null
  ): Promise<PatientEntity[]> {
    let query: SelectQueryBuilder<PatientEntity>;

    firstName = firstName.toUpperCase();
    if (lastName !== undefined) {
      lastName = lastName.toUpperCase();
    }

    // TypeORM query for finding patient by text pattern using Like operator
    const firstNameTextPattern = `%${firstName}%`; // Pattern for names that contain this text
    const lastNameTextPattern = `%${lastName}%`;
    query = this.patientsRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect('patient.consults', 'consult')
      .leftJoinAndSelect('patient.spectacles', 'spectacles')
      .where('upper(patient.firstName) LIKE :firstNameTextPattern', {
        firstNameTextPattern,
      });
    if (lastName.length > 0) {
      query = query.orWhere(
        'upper(patient.lastName) LIKE :lastNameTextPattern',
        {
          lastNameTextPattern,
        }
      );
    }

    return await query.getMany();
  }

  async findAll(): Promise<PatientEntity[]> {
    return await this.patientsRepository.find();
  }

  async getUpdatedPatients(
    minUpdatedAt: Date | null,
    lastId: string | null,
    limit: number
  ): Promise<PatientEntity[]> {
    let query: SelectQueryBuilder<PatientEntity>;
    if (minUpdatedAt === undefined || lastId === undefined) {
      query = this.patientsRepository.createQueryBuilder('patient');
    } else {
      query = this.patientsRepository
        .createQueryBuilder('patient')
        .where(
          `date_trunc('second',"patient"."updatedAt") > date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE))`,
          {
            minUpdatedAt,
          }
        )
        .orWhere(
          `date_trunc('second', "patient"."updatedAt") = date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE)) AND patient.id > :lastId`,
          {
            minUpdatedAt,
            lastId,
          }
        );
    }

    return await query
      .orderBy('patient.updatedAt', 'ASC')
      .addOrderBy('patient.id')
      .take(limit)
      .withDeleted()
      .getMany();
  }
}
