import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { UserRole } from '@supervision/users/database/user.entity';

@Injectable()
export class SupervisorGuard extends NestAuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context, status) {
    super.handleRequest(err, user, info, context, status);

    if (user.role != UserRole.SUPERVISOR) {
      throw new UnauthorizedException('must be a supervisor');
    }

    return user;
  }
}
