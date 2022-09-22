import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity, UserRole, UserService } from '@supervision/users';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {
    const audience = configService.get('auth0.client.id');
    const issuer = configService.get('auth0.issuer_url');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuer}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience,
      issuer,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: unknown): Promise<UserEntity> {
    const user = await this.userService.findUserFromAuth0(payload['sub']);
    if (user) {
      return user;
    } else {
      const user = await this.userService.createUser({
        firstName:
          payload['given_name'] ?? payload['name'] ?? payload['nickname'],
        lastName: payload['family_name'] ?? '',
        email: payload['email'],
        auth0id: payload['sub'],
        role: UserRole.STUDENT,
      });
      this.logger.log(
        'user not found locally; creating a new user from token info',
        {
          payload,
          user: user.id,
        }
      );
      return user;
    }
  }
}
