import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import configuration, {
  configSchema,
  TypeOrmConfigService,
} from '@supervision/config';
import { HealthModule } from '@supervision/health';
import { UsersModule } from '@supervision/users';
import { PatientsModule } from '@supervision/patients';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    HealthModule,
    UsersModule,
    PatientsModule,
  ],
})
export class AppModule {}
