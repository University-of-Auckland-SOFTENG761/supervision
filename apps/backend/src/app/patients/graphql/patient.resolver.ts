import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { AuthGuard } from '@supervision/auth/guards';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { PatientModel } from './patient.model';
import { PatientService } from '@supervision/patients/patients.service';
import { CreatePatientInput } from '../dto/create-patient.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { SetPatientInput } from '../dto/set-patient-input';

@Resolver(() => PatientModel)
export class PatientResolver implements IReplicationResolver<PatientModel> {
  constructor(private patientService: PatientService) {}

  @Query(() => [PatientModel], { name: 'patientReplicationFeed' })
  @UseGuards(AuthGuard)
  async replicationFeed(
    @Args() args: ReplicationArgs
  ): Promise<PatientModel[]> {
    const patients = await this.patientService.getUpdatedPatients(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
    return patients.map(({ consults = [], ...patient }) => ({
      consultIds: consults.map(({ id }) => id),
      ...patient,
    }));
  }

  @Mutation(() => PatientModel)
  @UseGuards(AuthGuard)
  async createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput
  ): Promise<PatientModel> {
    const { consults = [], ...patient } = await this.patientService.create(
      createPatientInput
    );
    return { consultIds: consults.map(({ id }) => id), ...patient };
  }

  @Mutation(() => PatientModel)
  @UseGuards(AuthGuard)
  async updatePatient(
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput
  ): Promise<PatientModel> {
    const { consults = [], ...patient } = await this.patientService.update(
      updatePatientInput.id,
      updatePatientInput
    );
    return { consultIds: consults.map(({ id }) => id), ...patient };
  }

  @Mutation(() => PatientModel, { nullable: true })
  @UseGuards(AuthGuard)
  async setPatients(
    @Args({
      name: 'setPatientsInput',
      type: () => [SetPatientInput],
      nullable: true,
    })
    setPatientsInput: SetPatientInput[]
  ): Promise<PatientModel | null> {
    if (!setPatientsInput?.length) {
      return null;
    }
    const temp = await this.patientService.set(setPatientsInput);
    const { consults = [], ...patient } = temp;
    return { consultIds: consults.map(({ id }) => id), ...patient };
  }

  @Query(() => PatientModel)
  @UseGuards(AuthGuard)
  async patient(@Args('id') id: string): Promise<PatientModel> {
    const { consults = [], ...patient } = await this.patientService.findOne(id);
    return { consultIds: consults?.map(({ id }) => id), ...patient };
  }

  @Query(() => [PatientModel])
  @UseGuards(AuthGuard)
  async findPatientByName(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string | null = null
  ): Promise<PatientModel[]> {
    const patients = await this.patientService.findOneByName(
      firstName,
      lastName
    );
    return patients.map(({ consults = [], ...patient }) => ({
      consultIds: consults.map(({ id }) => id),
      ...patient,
    }));
  }

  @Query(() => [PatientModel])
  @UseGuards(AuthGuard)
  async patients(): Promise<PatientModel[]> {
    const patients = await this.patientService.findAll();
    return patients.map(({ consults = [], ...patient }) => ({
      consultIds: consults.map(({ id }) => id),
      ...patient,
    }));
  }
}
