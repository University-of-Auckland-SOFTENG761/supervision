import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@supervision/auth';
import { UserEntity } from '@supervision/users/database';
import { UserResolver } from '@supervision/users/graphql';
import { UserService } from '@supervision/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  exports: [TypeOrmModule],
  providers: [UserService, UserResolver],
})
export class UsersModule {}
