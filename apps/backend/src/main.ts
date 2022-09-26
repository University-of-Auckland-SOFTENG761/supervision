/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@supervision/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  app.enableCors({
    origin: configService.get('app.isProduction')
      ? 'https://uoa-supervision.org'
      : process.env.FRONTEND_URL, // BREAKING CHANGE: ADD THIS TO YOUR ENV FILE!!!
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
