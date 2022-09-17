import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@supervision/users/database/user.entity';
import { PatientEntity } from '@supervision/patients/database/patient.entity';
import { PatientResolver } from '@supervision/patients/graphql/patient.resolver';
import { PatientService } from '@supervision/patients/patients.service';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([ConsultEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [PatientService, PatientResolver],
})
export class PatientsModule {}
