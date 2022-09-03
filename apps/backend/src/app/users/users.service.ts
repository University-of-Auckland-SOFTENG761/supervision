import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@supervision/auth';
import { UserEntity } from '@supervision/users/database';
import { User } from '@supervision/users/user.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  private connection: string;

  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {
    this.connection = this.configService.get('auth0.client.connection');
  }

  async createUser(name: string, email: string): Promise<User> {
    return this.authService.managementClient.createUser({
      name,
      email,
      connection: this.connection,
    });
  }

  async findOneById(id: string): Promise<User> {
    return this.authService.managementClient.getUser({ id });
  }

  async getUsers(): Promise<User[]> {
    return this.authService.managementClient.getUsers();
  }
}
