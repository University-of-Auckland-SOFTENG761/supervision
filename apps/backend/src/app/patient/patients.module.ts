import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patient/database';
import { PatientResolver } from '@supervision/patient/graphql';
import { PatientService } from '@supervision/patient/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  exports: [TypeOrmModule],
  providers: [PatientService, PatientResolver],
})
export class PatientsModule {}
