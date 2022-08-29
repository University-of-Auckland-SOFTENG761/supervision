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

  // WIP
  async create(patient: CreatePatientInput): Promise<PatientEntity> {
    const newPatient = this.patientsRepository.create(patient);
    return await this.patientsRepository.save(newPatient);
  }

  // WIP
  async findOne(id: string): Promise<PatientEntity> {
    return await this.patientsRepository.findOneBy({ id: id });
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
