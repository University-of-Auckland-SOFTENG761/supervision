import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patients/database';
import { PatientResolver } from '@supervision/patients/graphql';
import { PatientService } from '@supervision/patients/patients.service';
import { ConsultEntity } from '@supervision/consults';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    TypeOrmModule.forFeature([ConsultEntity]),
  ],
  exports: [TypeOrmModule],
  providers: [PatientService, PatientResolver],
})
export class PatientsModule {}
