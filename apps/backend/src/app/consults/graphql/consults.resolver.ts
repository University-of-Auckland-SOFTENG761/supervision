import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { ConsultsService } from '../consults.service';
import { CreateConsultInput } from '../dto/create-consult.input';
import { UpdateConsultInput } from '../dto/update-consult.input';
import { SetConsultInput } from '../dto/set-consult.input';
import { ConsultModel } from './consult.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@supervision/auth/guards';

@Resolver(() => ConsultModel)
export class ConsultsResolver implements IReplicationResolver<ConsultModel> {
  constructor(private consultService: ConsultsService) {}

  @Mutation(() => ConsultModel)
  @UseGuards(AuthGuard)
  async createConsult(
    @Args('createConsultInput') createConsultInput: CreateConsultInput
  ): Promise<ConsultModel> {
    const { user, patient, ...consult } = await this.consultService.create(
      createConsultInput
    );
    return { userEmail: user.email, patientId: patient.id, ...consult };
  }

  @Mutation(() => ConsultModel)
  @UseGuards(AuthGuard)
  async updateConsult(
    @Args('updateConsultInput') updateConsultInput: UpdateConsultInput
  ): Promise<ConsultModel> {
    const { user, patient, ...consult } = await this.consultService.update(
      updateConsultInput.id,
      updateConsultInput
    );
    return { userEmail: user.email, patientId: patient.id, ...consult };
  }

  @Query(() => ConsultModel)
  @UseGuards(AuthGuard)
  async consult(@Args('id') id: string): Promise<ConsultModel> {
    const { user, patient, ...consult } = await this.consultService.findOneByID(
      id
    );
    return { userEmail: user.email, patientId: patient.id, ...consult };
  }

  @Query(() => [ConsultModel])
  @UseGuards(AuthGuard)
  async consults(): Promise<ConsultModel[]> {
    const consults = await this.consultService.findAll();
    return consults.map(({ user, patient, ...consult }) => ({
      userEmail: user.email,
      patientId: patient.id,
      ...consult,
    }));
  }

  @Query(() => [ConsultModel], { name: 'consultReplicationFeed' })
  @UseGuards(AuthGuard)
  async replicationFeed(
    @Args() args: ReplicationArgs
  ): Promise<ConsultModel[]> {
    const consults = await this.consultService.getUpdatedConsults(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
    return consults.map(({ user, patient, ...consult }) => ({
      userEmail: user.email,
      patientId: patient.id,
      ...consult,
    }));
  }

  @Mutation(() => ConsultModel, { nullable: true })
  @UseGuards(AuthGuard)
  async setConsults(
    @Args({
      name: 'setConsultInputArray',
      type: () => [SetConsultInput],
      nullable: true,
    })
    setConsultsInput: SetConsultInput[]
  ): Promise<ConsultModel | null> {
    const lastSetConsult = await this.consultService.set(setConsultsInput);
    if (lastSetConsult) {
      const { user, patient, ...consult } = lastSetConsult;
      return { userEmail: user.email, patientId: patient.id, ...consult };
    }
    return null;
  }
}
