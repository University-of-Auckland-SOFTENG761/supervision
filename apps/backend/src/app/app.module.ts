import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '@supervision/auth';
import configuration, {
  configSchema,
  TypeOrmConfigService,
import { ConsultsModule } from '@supervision/consults/consults.module';
import { HealthModule } from '@supervision/health';
import { UsersModule } from '@supervision/users';
import { PatientsModule } from '@supervision/patients';
import { DateOfBirthScalar } from './patients/graphql/date-of-birth.scalar';
import { ConsultsService } from './consults';
import { UserService } from './users';
import { PatientService } from './patients';

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
      resolvers: { DateOfBirth: DateOfBirthScalar },
      cache: 'bounded',
    }),
    HealthModule,
    UsersModule,
    PatientsModule,
    ConsultsModule,
    AuthModule,
    ConsultsModule,
  ],
  providers: [UserService, PatientService, ConsultsService],
})
export class AppModule {}
