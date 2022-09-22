import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@supervision/auth';
import { UserEntity, UserRole } from '@supervision/users/database';
import { CreateUserInput } from '@supervision/users/graphql/dto/create-user.input';
import { User } from 'auth0';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async getUpdatedUsers(
    minUpdatedAt: Date | null,
    lastId: string | null,
    limit: number
  ): Promise<UserEntity[]> {
    let query: SelectQueryBuilder<UserEntity>;
    if (
      minUpdatedAt === undefined ||
      lastId === undefined ||
      minUpdatedAt?.getTime() === 0 ||
      lastId === ''
    ) {
      query = this.usersRepository.createQueryBuilder('user');
    } else {
      query = this.usersRepository
        .createQueryBuilder('user')
        .where(
          `date_trunc('second',"user"."updatedAt") > date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE))`,
          {
            minUpdatedAt,
          }
        )
        .orWhere(
          `date_trunc('second', "user"."updatedAt") = date_trunc('second',CAST (:minUpdatedAt AS TIMESTAMP WITH TIME ZONE)) AND user.id > :lastId`,
          {
            minUpdatedAt,
            lastId,
          }
        );
    }

    return await query
      .orderBy('user.updatedAt', 'DESC')
      .addOrderBy('user.id')
      .take(limit)
      .withDeleted()
      .getMany();
  }

  async createUser(data: CreateUserInput): Promise<UserEntity> {
    let auth0UserId: string;
    if (!('auth0id' in data)) {
      if (!('password' in data)) {
        throw new BadRequestException('password must be provided');
      }

      try {
        auth0UserId = await this.authService
          .createUser({
            name: {
              surname: data.lastName,
              first: data.firstName,
            },
            password: data.password,
            ...data,
          })
          .then((user) => user.user_id);
      } catch (error) {
        if (error.name === 'Conflict' && error.statusCode === 409) {
          this.logger.warn(
            'Auth0 conflict on user creation, will use existing user',
            error
          );
          auth0UserId = await this.authService
            .getUserByEmail(data.email)
            .then((user) => user.user_id);
        } else throw error;
      }
    } else {
      auth0UserId = data.auth0id;
    }

    const databaseUser = new UserEntity();
    databaseUser.role = data.role;
    databaseUser.auth0Id = auth0UserId;
    databaseUser.firstName = data.firstName;
    databaseUser.lastName = data.lastName;
    return this.usersRepository.save(databaseUser);
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findUserFromAuth0(auth0Id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ auth0Id });
  }
}
