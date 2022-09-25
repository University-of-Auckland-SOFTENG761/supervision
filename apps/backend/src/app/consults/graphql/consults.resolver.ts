import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { ConsultsService } from '../consults.service';
import { CreateConsultInput } from '../dto/create-consult.input';
import { UpdateConsultInput } from '../dto/update-consult.input';
import { SetConsultInput } from '../dto/set-consult.input';
import { ConsultModel } from './consult.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@supervision/auth/guards';
import { SpectaclesModel } from '@supervision/spectacles/graphql';
import {
  CreateSpectaclesInput,
  UpdateSpectaclesInput,
} from '@supervision/spectacles/dto';

@Resolver(() => ConsultModel)
export class ConsultsResolver implements IReplicationResolver<ConsultModel> {
  constructor(private consultService: ConsultsService) {}

  @Mutation(() => ConsultModel)
  @UseGuards(AuthGuard)
  async createConsult(
    @Args('createConsultInput') createConsultInput: CreateConsultInput
  ): Promise<ConsultModel> {
    return await this.consultService.create(createConsultInput);
  }

  @Mutation(() => ConsultModel)
  @UseGuards(AuthGuard)
  async updateConsult(
    @Args('updateConsultInput') updateConsultInput: UpdateConsultInput
  ): Promise<ConsultModel> {
    return await this.consultService.update(
      updateConsultInput.id,
      updateConsultInput
    );
  }

  @Mutation(() => SpectaclesModel)
  @UseGuards(AuthGuard)
  async createSpectacles(
    @Args('createSpectaclesInput') createSpectaclesInput: CreateSpectaclesInput
  ): Promise<SpectaclesModel> {
    return await this.consultService.createSpectacles(createSpectaclesInput);
  }

  @Mutation(() => SpectaclesModel)
  @UseGuards(AuthGuard)
  async updateSpectacles(
    @Args('updateSpectaclesInput') updateSpectaclesInput: UpdateSpectaclesInput
  ): Promise<SpectaclesModel> {
    return await this.consultService.updateSpectacles(
      updateSpectaclesInput,
      updateSpectaclesInput.id
    );
  }

  @Query(() => ConsultModel)
  @UseGuards(AuthGuard)
  async consult(@Args('id') id: string): Promise<ConsultModel> {
    return await this.consultService.findOneByID(id);
  }

  @Query(() => [ConsultModel])
  @UseGuards(AuthGuard)
  async consults(): Promise<ConsultModel[]> {
    return await this.consultService.findAll();
  }

  @Query(() => SpectaclesModel)
  @UseGuards(AuthGuard)
  async spectacles(
    @Args('consultId') consultId: string
  ): Promise<SpectaclesModel> {
    return await this.consultService.findSpectaclesForConsult(consultId);
  }

  @Query(() => [ConsultModel], { name: 'consultReplicationFeed' })
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
