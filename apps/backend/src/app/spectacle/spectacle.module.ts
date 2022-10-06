import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpectacleEntity } from './database/spectacle.entity';
import { SpectacleService } from '@supervision/spectacle/spectacle.service';
import { ConsultsModule } from '@supervision/consults/consults.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpectacleEntity]),
    forwardRef(() => ConsultsModule),
  ],
  providers: [SpectacleService],
  exports: [SpectacleService],
})
export class SpectacleModule {}
