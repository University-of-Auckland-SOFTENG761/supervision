import { Args, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { UserModel, UserService } from '@supervision/users';

@Resolver(() => UserModel)
export class UserResolver implements IReplicationResolver<UserModel> {
  constructor(private userService: UserService) {}

  async replicationFeed(@Args() args: ReplicationArgs): Promise<UserModel[]> {
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
