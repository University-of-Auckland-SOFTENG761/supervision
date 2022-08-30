import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patients/database';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.input';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientsRepository: Repository<PatientEntity>
  ) {}

  async create(patient: CreatePatientInput): Promise<PatientEntity> {
    const newPatient = this.patientsRepository.create(patient);
    return await this.patientsRepository.save(newPatient);
  }

  async findOne(id: string): Promise<PatientEntity> {
    return await this.patientsRepository.findOneBy({ id: id });
  }

  // Find patient by first or last name
  // TODO: Check why date can't be read in query
  // https://stackoverflow.com/questions/58622522/date-field-returned-as-null-on-graphql-query-despite-data-existing
  async findOneBy(
    firstName: string,
    lastName: string | null
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
      .where('upper(patient.firstName) LIKE :firstNameTextPattern', {
        firstNameTextPattern,
      });
    if (lastName !== undefined) {
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
      .orderBy('patient.updatedAt', 'DESC')
      .addOrderBy('patient.id')
      .take(limit)
      .withDeleted()
      .getMany();
  }
}
