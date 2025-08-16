// api/src/modules/auth/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import type { JwtPayload } from '../../common/auth/jwt.util'; 

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: AuthenticatedRequest }>().req;
    if (!req?.user) {
      // Em teoria o guard já bloqueia antes, mas por segurança:
      throw new Error('User not found in GraphQL context');
    }
    return req.user;
  },
);
