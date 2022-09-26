import { Controller, Get, Header, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator
  ) {}

  @Get('/health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('google', 'https://google.com'), // Reliable website to test
      () => this.db.pingCheck('database'),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.8 }),
    ]);
  }

  @Get('/ping')
  @Header('Cache-Control', 'none')
  ping(@Req() request: Request) {
    return {
      time: new Date().toISOString(),
      challenge: request.query?.challenge ?? null,
    };
  }
}
