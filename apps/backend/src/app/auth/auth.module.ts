import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from '@supervision/auth/graphql';
import { AuthGuard, SupervisorGuard } from '@supervision/auth/guards';
import { AuthService } from '@supervision/auth/auth.service';
import { UsersModule } from '@supervision/users';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UsersModule),
  ],
  providers: [
    JwtStrategy,
    AuthGuard,
    SupervisorGuard,
    AuthService,
    AuthResolver,
  ],
  exports: [PassportModule, AuthGuard, SupervisorGuard, AuthService],
})
export class AuthModule {}
