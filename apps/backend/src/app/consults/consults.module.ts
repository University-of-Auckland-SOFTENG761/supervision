import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';
import { ConsultsResolver } from '@supervision/consults/graphql/consults.resolver';
import { ConsultsService } from '@supervision/consults/consults.service';
import { UserEntity } from '@supervision/users/database/user.entity';
import { PatientEntity } from '@supervision/patients/database/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PatientEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [ConsultsService, ConsultsResolver],
})
export class ConsultsModule {}
