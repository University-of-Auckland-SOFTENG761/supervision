import { Module } from '@nestjs/common';
import { UsersModule } from '@supervision/users/users.module';
import { ReplicationResolver } from './replication.resolver';
import { ReplicationService } from './replication.service';
import { UserModel } from '@supervision/app/users';

@Module({
  imports: [UsersModule],
  providers: [ReplicationService, ReplicationResolver],
})
export class ReplicationModule {}
