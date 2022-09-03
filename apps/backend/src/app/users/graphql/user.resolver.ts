import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@supervision/auth/GqlAuth.guard';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { CurrentUser } from '@supervision/shared';
import { UserEntity } from '@supervision/users';
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

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: UserEntity) {
    return this.userService.findOneById(user.id);
  }
}
