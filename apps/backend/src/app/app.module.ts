import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { configSchema } from '../configuration';
import TypeOrmConfigService from './TypeOrmConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
