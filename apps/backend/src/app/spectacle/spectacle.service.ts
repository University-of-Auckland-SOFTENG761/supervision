import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpectacleEntity } from './database';
import { CreateSpectacleInput, UpdateSpectacleInput } from './dto';

@Injectable()
export class SpectacleService {
  constructor(
    @InjectRepository(SpectacleEntity)
    private spectacleRepository: Repository<SpectacleEntity>
  ) {}

  // Create a spectacle for an associated consult, patient and user
  async createSpectacle(
    spectacle: CreateSpectacleInput
  ): Promise<SpectacleEntity> {
    const newSpectacle = await this.spectacleRepository.create({
      consult: { id: spectacle.consultId },
      ...spectacle,
    });
    return await this.spectacleRepository.save(newSpectacle);
  }

  // Update spectacle for an associated consult, patient and user
  async updateSpectacle(
    updatedSpectacle: UpdateSpectacleInput,
    spectacleId: string
  ): Promise<SpectacleEntity> {
    const spectacle = await this.spectacleRepository.preload({
      id: spectacleId,
      ...updatedSpectacle,
    });
    if (!spectacle) {
      throw new Error(`Spectacle #${updatedSpectacle.id} not found`);
    }

    return await this.spectacleRepository.save(spectacle);
  }

  // Fetch spectacle for a consult
  async findSpectacleForConsult(consultId: string): Promise<SpectacleEntity> {
    return await this.spectacleRepository.findOne({
      where: { consult: { id: consultId } },
    });
  }
}
