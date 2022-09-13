import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultEntity } from '@supervision/consults/database';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultEntity])],
  exports: [TypeOrmModule],
})
export class ConsultsModule {}
