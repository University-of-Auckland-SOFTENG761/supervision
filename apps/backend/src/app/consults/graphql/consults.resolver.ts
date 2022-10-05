import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IReplicationResolver, ReplicationArgs } from '@supervision/shared';
import { ConsultsService } from '../consults.service';
import { CreateConsultInput } from '../dto/create-consult.input';
import { UpdateConsultInput } from '../dto/update-consult.input';
import { SetConsultInput } from '../dto/set-consult.input';
import { ConsultModel } from './consult.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@supervision/auth/guards';
import { SpectacleModel } from '@supervision/spectacle/graphql';
import {
  CreateSpectacleInput,
  UpdateSpectacleInput,
} from '@supervision/spectacle/dto';
import { SpectacleService } from '@supervision/spectacle/spectacle.service';

@Resolver(() => ConsultModel)
export class ConsultsResolver implements IReplicationResolver<ConsultModel> {
  constructor(
    private consultService: ConsultsService,
    private spectacleService: SpectacleService
  ) {}

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

  @Mutation(() => SpectacleModel)
  @UseGuards(AuthGuard)
  async createSpectacle(
    @Args('createSpectacleInput') createSpectacleInput: CreateSpectacleInput
  ): Promise<SpectacleModel> {
    return await this.spectacleService.createSpectacle(createSpectacleInput);
  }

  @Mutation(() => SpectacleModel)
  @UseGuards(AuthGuard)
  async updateSpectacle(
    @Args('updateSpectacleInput') updateSpectacleInput: UpdateSpectacleInput
  ): Promise<SpectacleModel> {
    return await this.spectacleService.updateSpectacle(
      updateSpectacleInput,
      updateSpectacleInput.id
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

  @Query(() => SpectacleModel)
  @UseGuards(AuthGuard)
  async spectacle(
    @Args('consultId') consultId: string
  ): Promise<SpectacleModel> {
    return await this.spectacleService.findSpectacleForConsult(consultId);
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
