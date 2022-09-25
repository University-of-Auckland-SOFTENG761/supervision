import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';
import { ConsultsResolver } from '@supervision/consults/graphql/consults.resolver';
import { ConsultsService } from '@supervision/consults/consults.service';
import { SpectaclesModule } from '@supervision/spectacles/spectacles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultEntity]),
    forwardRef(() => SpectaclesModule),
  ],
  providers: [ConsultsService, ConsultsResolver],
  exports: [ConsultsService],
})
export class ConsultsModule {}
