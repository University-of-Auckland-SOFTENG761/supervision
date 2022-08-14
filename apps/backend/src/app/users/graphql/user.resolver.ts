import { Args, Query, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { UserModel } from './user.model';
import { UserService } from '@supervision/users/users.service';

@Resolver(() => UserModel)
export class UserResolver implements IReplicationResolver<UserModel> {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel], { name: 'userReplicationFeed' })
  async replicationFeed(@Args() args: ReplicationArgs): Promise<UserModel[]> {
    return this.userService.getUpdatedUsers(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
  }
}
