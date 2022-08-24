import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { PatientModel } from './patient.model';
import { PatientService } from '@supervision/patients/patients.service';
import { CreatePatientInput } from '../dto/create-patient.input';

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

  // WIP
  @Mutation(() => PatientModel)
  async createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput
    // TODO: add all fields once finalised
  ): Promise<PatientModel> {
    return await this.patientService.create(createPatientInput); // TODO
  }

  // WIP
  @Query(() => PatientModel)
  async patient(@Args('id') id: string): Promise<PatientModel> {
    return await this.patientService.findOne(id);
  }
}
