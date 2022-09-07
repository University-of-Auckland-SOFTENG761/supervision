import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@supervision/auth/Auth.guard';
import { AuthService } from '@supervision/auth/auth.service';
import { SupervisorGuard } from '@supervision/auth/Supervisor.guard';
import { UsersModule } from '@supervision/users';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  providers: [JwtStrategy, AuthGuard, SupervisorGuard, AuthService],
  exports: [PassportModule, AuthGuard, SupervisorGuard, AuthService],
})
export class AuthModule {}
