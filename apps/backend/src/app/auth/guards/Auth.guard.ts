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
    if (err || !user) {
      throw err ?? new UnauthorizedException(info?.message);
    }

    if (!(user as UserEntity).isActive)
      throw new UnauthorizedException('user is not active');

    return user;
  }
}
