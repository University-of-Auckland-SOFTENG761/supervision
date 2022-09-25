import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SupervisorGuard, AuthGuard } from '@supervision/auth/guards';
import { CurrentUser, ReplicationArgs } from '@supervision/shared';
import { UserEntity } from '@supervision/users';
import { CreateUserInput } from '@supervision/users/graphql/dto/create-user.input';
import { UserModel } from './user.model';
import { UserService } from '@supervision/users/users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel], { name: 'userReplicationFeed' })
  @UseGuards(SupervisorGuard)
  async replicationFeed(@Args() args: ReplicationArgs): Promise<UserModel[]> {
    const users = await this.userService.getUpdatedUsers(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
    return users.map(({ consults, ...user }) => ({
      consultIds: consults.map(({ id }) => id),
      ...user,
    }));
  }

  @Query(() => [UserModel])
  @UseGuards(SupervisorGuard)
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => UserModel)
  @UseGuards(SupervisorGuard)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => UserModel)
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: UserEntity) {
    return this.userService.findOneById(user.id);
  }
}
