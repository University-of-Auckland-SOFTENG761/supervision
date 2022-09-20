import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientEntity } from '@supervision/patients/database/patient.entity';
import { PatientResolver } from '@supervision/patients/graphql/patient.resolver';
import { PatientService } from '@supervision/patients/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientEntity])],
  providers: [PatientService, PatientResolver],
})
export class PatientsModule {}
