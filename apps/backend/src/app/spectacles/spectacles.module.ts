import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpectaclesEntity } from './database/spectacles.entity';
import { SpectaclesService } from '@supervision/spectacles/spectacles.service';
import { ConsultsModule } from '@supervision/consults/consults.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpectaclesEntity]),
    forwardRef(() => ConsultsModule),
  ],
  providers: [SpectaclesService],
  exports: [SpectaclesService],
})
export class SpectaclesModule {}
