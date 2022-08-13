import { Injectable } from '@nestjs/common';
import { UserEntity, UserModel } from '@supervision/app/users';
import { BaseModel } from '@supervision/entities/base.model';
import { DataSource } from 'typeorm';

@Injectable()
export class ReplicationService {
  constructor(private dataSource: DataSource) {}

  async getUpdatedFeed(
    lastId: string | null,
    minUpdatedAt: Date | null,
    limit: number
  ): Promise<BaseModel[]> {
    return this.getUpdatedUserFeed(lastId, minUpdatedAt, limit);
  }

  private async getUpdatedUserFeed(
    lastId: string,
    minUpdatedAt: Date,
    limit: number
  ): Promise<UserModel[]> {
    const userEntities = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.updatedAt > :minUpdatedAt', {
        minUpdatedAt,
      })
      .orWhere('user.updatedAt = :minUpdatedAt AND user.id > :lastId', {
        minUpdatedAt,
        lastId,
      })
      .orderBy('user.updatedAt')
      .addOrderBy('user.id')
      .take(limit)
      .getMany();
    console.debug(userEntities);
    return userEntities;
  }
}
