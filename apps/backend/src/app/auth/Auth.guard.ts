import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { UserEntity } from '@supervision/users';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context, status) {
    super.handleRequest(err, user, info, context, status);

    if (!(user as UserEntity).isActive) throw new UnauthorizedException();

    return user;
  }
}
