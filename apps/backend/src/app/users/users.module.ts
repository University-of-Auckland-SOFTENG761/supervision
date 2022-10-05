import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@supervision/auth';
import { UserEntity } from '@supervision/users/database';
import { UserResolver } from '@supervision/users/graphql/user.resolver';
import { UserService } from '@supervision/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule, UserService],
  providers: [UserService, UserResolver],
})
export class UsersModule {}
