import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@supervision/auth/Auth.guard';
import { Observable } from 'rxjs';

@Injectable()
export class SupervisorGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    if (!(await super.canActivate(context))) return false;
    return req.role === 'supervisor';
  }
}
