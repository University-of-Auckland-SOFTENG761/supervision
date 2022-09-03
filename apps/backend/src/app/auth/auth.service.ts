import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient } from 'auth0';

@Injectable()
export class AuthService {
  public managementClient: ManagementClient;

  constructor(private configService: ConfigService) {
    this.managementClient = new ManagementClient({
      domain: this.configService.get('auth0.domain'),
      clientId: this.configService.get('auth0.client.id'),
      clientSecret: this.configService.get('auth0.client.secret'),
    });
  }
}
