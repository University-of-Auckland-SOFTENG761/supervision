import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ConsultEntity } from './database';
import { CreateConsultInput, UpdateConsultInput, SetConsultInput } from './dto';
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

  async findOneByID(id: string): Promise<ConsultEntity> {
    return await this.consultsRepository.findOneBy({ id: id });
  }

  async findAll(): Promise<ConsultEntity[]> {
    return await this.consultsRepository.find();
  }

  async set(consults: SetConsultInput[]): Promise<ConsultEntity> {
    const newConsults = await this.consultsRepository.save(consults);
    return newConsults[newConsults.length - 1];
  }

  async getUpdatedConsults(
    minUpdatedAt: Date | null,
    lastId: string | null,
    limit: number
  ): Promise<ConsultEntity[]> {
    let query: SelectQueryBuilder<ConsultEntity>;
    if (minUpdatedAt === undefined || lastId === undefined) {
      query = this.consultsRepository
        .createQueryBuilder('consult')
        // Load in the patient and user entities (SelectQueryBuilder does not do this by default)
        .leftJoinAndSelect('consult.patient', 'patient')
        .leftJoinAndSelect('consult.user', 'user')
        .leftJoinAndSelect('consult.spectacles', 'spectacles');
    } else {
      query = this.consultsRepository
        .createQueryBuilder('consult')
        .where(
          `date_trunc('second',"consult"."updatedAt") > date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE))`,
          {
            minUpdatedAt,
          }
        )
        .orWhere(
          `date_trunc('second', "consult"."updatedAt") = date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE)) AND consult.id > :lastId`,
          {
            minUpdatedAt,
            lastId,
          }
        );
    }

    return await query
      .orderBy('consult.updatedAt', 'ASC')
      .addOrderBy('consult.id')
      .take(limit)
      .withDeleted()
      .getMany();
  }
}
