import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, User } from 'auth0';
import { randomBytes } from 'crypto';
import { AuthenticationClient } from 'auth0';

export interface CreateUserOptions {
  name: {
    first: string;
    surname: string;
  };
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private managementClient: ManagementClient;
  private authenticationClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    this.managementClient = new ManagementClient({
      domain: this.configService.get('auth0.domain'),
      clientId: this.configService.get('auth0.management.id'),
      clientSecret: this.configService.get('auth0.management.secret'),
    });
    this.authenticationClient = new AuthenticationClient({
      domain: this.configService.get('auth0.domain'),
      clientId: this.configService.get('auth0.client.id'),
      clientSecret: this.configService.get('auth0.client.secret'),
    });
  }

  public generatePassword(): string {
    return randomBytes(32).toString('hex');
  }

  public createUser(data: CreateUserOptions): Promise<User> {
    return this.managementClient.createUser({
      family_name: data.name.surname,
      given_name: data.name.first,
      email: data.email,
      password: data.password,
      connection: this.configService.get('auth0.management.connection'),
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    const users = await this.managementClient.getUsersByEmail(email);
    if (users.length !== 1) return null;
    return users[0];
  }

  public async authorizationCodeGrant(authorisation_code: string) {
    return this.authenticationClient.oauth.authorizationCodeGrant({
      code: authorisation_code,
      redirect_uri: this.configService.get('auth0.redirect_uri'),
    });
  }
}
