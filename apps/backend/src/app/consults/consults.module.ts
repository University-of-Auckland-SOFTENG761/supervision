import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';
import { ConsultsResolver } from '@supervision/consults/graphql/consults.resolver';
import { ConsultsService } from '@supervision/consults/consults.service';
import { UsersModule } from '@supervision/users';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultEntity]), UsersModule],
  providers: [ConsultsService, ConsultsResolver],
})
export class ConsultsModule {}
