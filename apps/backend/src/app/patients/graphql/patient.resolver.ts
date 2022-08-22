import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { PatientModel } from './patient.model';
import { PatientService } from '@supervision/patients/patient.service';

@Resolver(() => PatientModel)
export class PatientResolver implements IReplicationResolver<PatientModel> {
  constructor(private userService: PatientService) {}

  @Query(() => [PatientModel], { name: 'patientReplicationFeed' })
  async replicationFeed(@Args() args: ReplicationArgs): Promise<PatientModel[]> {
    return this.userService.getUpdatedPatients(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
  }

  @Mutation(returns => PatientModel)
  async createPatient(
    @Args('') field_name : string,
    // TODO: add all fields once finalised

  ): Promise<PatientModel> {
    return await this.patientService.create({}) // TODO
  }

  @Query(returns => PatientModel)
  async patient(@Args('id') id:string): Promise<PatientModel> {
    return await this.patientService.findOne(id);
  }

  
}
