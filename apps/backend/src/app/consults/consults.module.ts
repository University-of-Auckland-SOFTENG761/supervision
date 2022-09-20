import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultEntity } from '@supervision/consults/database/consult.entity';
import { ConsultsResolver } from '@supervision/consults/graphql/consults.resolver';
import { ConsultsService } from '@supervision/consults/consults.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultEntity])],
  providers: [ConsultsService, ConsultsResolver],
})
export class ConsultsModule {}
