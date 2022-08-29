import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patients/database';
import { PatientResolver } from '@supervision/patients/graphql';
import { PatientService } from '@supervision/patients/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  exports: [TypeOrmModule],
  providers: [PatientService, PatientResolver],
})
export class PatientsModule {}
