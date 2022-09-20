import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { ConsultsService } from '../consults.service';
import { CreateConsultInput } from '../dto/create-consult.input';
import { UpdateConsultInput } from '../dto/update-consult.input';
import { SetConsultInput } from '../dto/set-consult.input';
import { ConsultModel } from './consult.model';

@Resolver(() => ConsultModel)
export class ConsultsResolver implements IReplicationResolver<ConsultModel> {
  constructor(private consultService: ConsultsService) {}

  @Mutation(() => ConsultModel)
  async createConsult(
    @Args('createConsultInput') createConsultInput: CreateConsultInput
  ): Promise<ConsultModel> {
    return await this.consultService.create(createConsultInput);
  }

  @Mutation(() => ConsultModel)
  async updateConsult(
    @Args('updateConsultInput') updateConsultInput: UpdateConsultInput
  ): Promise<ConsultModel> {
    return await this.consultService.update(
      updateConsultInput.id,
      updateConsultInput
    );
  }

  @Query(() => ConsultModel)
  async consult(@Args('id') id: string): Promise<ConsultModel> {
    return await this.consultService.findOne(id);
  }

  @Query(() => [ConsultModel])
  async consults(): Promise<ConsultModel[]> {
    return await this.consultService.findAll();
  }

  @Query(() => [ConsultModel])
  async findConsultsForPatient(
    @Args('patientId') patientId: string
  ): Promise<ConsultModel[]> {
    return await this.consultService.findConsultsForPatient(patientId);
  }

  @Query(() => [ConsultModel], { name: 'consultReplicationFeed' })
  async replicationFeed(
    @Args() args: ReplicationArgs
  ): Promise<ConsultModel[]> {
    return this.consultService.getUpdatedConsults(
      args.minUpdatedAt,
      args.lastId,
      args.limit
    );
  }

  @Mutation(() => ConsultModel, { nullable: true })
  async setConsults(
    @Args({
      name: 'setConsultInputArray',
      type: () => [SetConsultInput],
      nullable: true,
    })
    setConsultsInput: SetConsultInput[]
  ): Promise<ConsultModel | null> {
    return await this.consultService.set(setConsultsInput);
  }
}
