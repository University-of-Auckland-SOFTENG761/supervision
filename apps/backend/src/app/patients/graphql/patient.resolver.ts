import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { PatientModel } from './patient.model';
import { PatientService } from '@supervision/patients/patients.service';
import { CreatePatientInput } from '../dto/create-patient.input';
import { PatientEntity } from '../database';
import { UpdatePatientInput } from '../dto/update-patient.input';

@Resolver(() => PatientModel)
export class PatientResolver implements IReplicationResolver<PatientModel> {
  constructor(private patientService: PatientService) {}

  @Query(() => [PatientModel], { name: 'patientReplicationFeed' })
  async replicationFeed(
    @Args() args: ReplicationArgs
  ): Promise<PatientModel[]> {
    return this.patientService.getUpdatedPatients(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
  }

  @Mutation(() => PatientModel)
  async createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput
  ): Promise<PatientModel> {
    return await this.patientService.create(createPatientInput);
  }

  @Mutation(() => PatientModel)
  async updatePatient(
    @Args('id') id: string,
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput
  ): Promise<PatientModel> {
    return await this.patientService.update(id, updatePatientInput);
  }

  @Query(() => PatientModel)
  async patient(@Args('id') id: string): Promise<PatientModel> {
    return await this.patientService.findOne(id);
  }

  @Query(() => [PatientModel])
  async findPatientByName(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string | null = null
  ): Promise<PatientEntity[]> {
    return await this.patientService.findOneBy(firstName, lastName);
  }

  @Query(() => [PatientModel])
  async patients(): Promise<PatientModel[]> {
    return await this.patientService.findAll();
  }
}
