import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@supervision/auth/dto/createUser.dto';
import { ManagementClient, User } from 'auth0';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private managementClient: ManagementClient;

  constructor(private configService: ConfigService) {
    this.managementClient = new ManagementClient({
      domain: this.configService.get('auth0.domain'),
      clientId: this.configService.get('auth0.management.id'),
      clientSecret: this.configService.get('auth0.management.secret'),
    });
  }

  public generatePassword(): string {
    return randomBytes(32).toString('hex');
  }

  public createUser(data: CreateUserDto): Promise<User> {
    return this.managementClient.createUser({
      family_name: data.name.surname,
      given_name: data.name.first,
      email: data.email,
      password: data.password,
      connection: this.configService.get('auth0.management.connection'),
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const users = await this.managementClient.getUsersByEmail(email);
    if (users.length !== 1) return null;
    return users[0];
  }
}
