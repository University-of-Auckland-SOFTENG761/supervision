import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from '@supervision/auth';
import configuration, {
  configSchema,
  TypeOrmConfigService,
} from '@supervision/config';
import { ConsultsModule } from '@supervision/consults/consults.module';
import { HealthModule } from '@supervision/health';
import { UsersModule } from '@supervision/users';
import { PatientsModule } from '@supervision/patients';
import { DateOfBirthScalar } from './patients/graphql/date-of-birth.scalar';

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
    AuthModule,
    ConsultsModule,
  ],
})
export class AppModule {}
