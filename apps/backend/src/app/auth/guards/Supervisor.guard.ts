import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './Auth.guard';
import { UserRole } from '@supervision/users/database/user.entity';

@Injectable()
export class SupervisorGuard extends AuthGuard {
  handleRequest(err, user, info, context, status) {
    super.handleRequest(err, user, info, context, status);

    if (user.role != UserRole.SUPERVISOR) {
      throw new UnauthorizedException('user is not a supervisor');
    }

    return user;
  }
}
