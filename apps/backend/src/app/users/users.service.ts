import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@supervision/users/database';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async getUpdatedUsers(
    minUpdatedAt: Date | null,
    lastId: string | null,
    limit: number
  ): Promise<UserEntity[]> {
    let query: SelectQueryBuilder<UserEntity>;
    if (minUpdatedAt === undefined || lastId === undefined) {
      query = this.usersRepository.createQueryBuilder('user');
    } else {
      query = this.usersRepository
        .createQueryBuilder('user')
        .where(
          `date_trunc('second',"user"."updatedAt") > date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE))`,
          {
            minUpdatedAt,
          }
        )
        .orWhere(
          `date_trunc('second', "user"."updatedAt") = date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE)) AND user.id > :lastId`,
          {
            minUpdatedAt,
            lastId,
          }
        );
    }

    return await query
      .orderBy('user.updatedAt', 'DESC')
      .addOrderBy('user.id')
      .take(limit)
      .withDeleted()
      .getMany();
  }

  async findOneById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }
}
