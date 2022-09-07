import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@supervision/auth/Auth.guard';
import { SupervisorGuard } from '@supervision/auth/Supervisor.guard';
import { CurrentUser } from '@supervision/shared';
import { UserEntity } from '@supervision/users';
import { UserModel } from './user.model';
import { UserService } from '@supervision/users/users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserModel])
  @UseGuards(SupervisorGuard)
  async users() {
    return this.userService.findAll();
  }

  @Query(() => UserModel)
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: UserEntity) {
    return this.userService.findOneById(user.id);
  }
}
