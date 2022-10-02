import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpectaclesEntity } from './database';
import { CreateSpectaclesInput, UpdateSpectaclesInput } from './dto';

@Injectable()
export class SpectaclesService {
  constructor(
    @InjectRepository(SpectaclesEntity)
    private spectaclesRepository: Repository<SpectaclesEntity>
  ) {}

  // Create a spectacle for an associated consult, patient and user
  async createSpectacles(
    spectacles: CreateSpectaclesInput
  ): Promise<SpectaclesEntity> {
    const newSpectacles = await this.spectaclesRepository.create({
      consult: { id: spectacles.consultId },
      ...spectacles,
    });
    return await this.spectaclesRepository.save(newSpectacles);
  }

  // Update spectacle for an associated consult, patient and user
  async updateSpectacles(
    updatedSpectacles: UpdateSpectaclesInput,
    spectacleId: string
  ): Promise<SpectaclesEntity> {
    const spectacle = await this.spectaclesRepository.preload({
      id: spectacleId,
      ...updatedSpectacles,
    });
    if (!spectacle) {
      throw new Error(`Spectacle #${updatedSpectacles.id} not found`);
    }

    return await this.spectaclesRepository.save(spectacle);
  }

  // Fetch spectacles for a consult
  async findSpectaclesForConsult(consultId: string): Promise<SpectaclesEntity> {
    return await this.spectaclesRepository.findOne({
      where: { consult: { id: consultId } },
    });
  }
}
