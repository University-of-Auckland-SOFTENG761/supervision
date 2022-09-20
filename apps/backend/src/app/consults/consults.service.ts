import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultEntity } from './database';
import { CreateConsultInput } from './dto';
import { UpdateConsultInput } from './dto';
import { SetConsultInput } from './dto';

@Injectable()
export class ConsultsService {
  constructor(
    @InjectRepository(ConsultEntity)
    private consultsRepository: Repository<ConsultEntity>
  ) {}

  async create(consult: CreateConsultInput): Promise<ConsultEntity> {
    const newConsult = await this.consultsRepository.create({
      patient: { id: consult.patientId },
      user: { id: consult.userId },
      ...consult,
    });
    return await this.consultsRepository.save(newConsult);
  }

  async update(
    id: string,
    updatedConsult: UpdateConsultInput
  ): Promise<ConsultEntity> {
    const consult = await this.consultsRepository.preload({
      id: id,
      ...updatedConsult,
    });
    if (!consult) {
      throw new Error(`Consult #${id} not found`);
    }

    return await this.consultsRepository.save(consult);
  }

  async findOne(id: string): Promise<ConsultEntity> {
    return await this.consultsRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<ConsultEntity[]> {
    return await this.consultsRepository.find();
  }

  async findConsultsForPatient(patientId: string): Promise<ConsultEntity[]> {
    return await this.consultsRepository.find({
      where: { patient: { id: patientId } },
    });
  }

  async set(consults: SetConsultInput[]): Promise<ConsultEntity> {
    const newConsults = await this.consultsRepository.save(consults);
    return newConsults[newConsults.length - 1];
  }

  async getUpdatedConsults(
    minUpdatedAt: Date | null,
    lastId: string | null, // This is copied from patientsReplication, not sure what lastId means tbh
    limit: number
  ): Promise<ConsultEntity[]> {
    let query = this.consultsRepository
      .createQueryBuilder('consult')
      .where('consult.updatedAt > :minUpdated', { minUpdatedAt })
      .orderBy('consult.updatedAt', 'ASC')
      .addOrderBy('consult.id', 'ASC')
      .limit(limit);

    if (lastId) {
      query = query.andWhere('consult.id > :lastId', { lastId });
    }

    return await query.withDeleted().getMany();
  }
}
