import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { Request } from 'express';
import { verifyJwt } from './jwt.util';

export type JwtPayload = {
  sub: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
};

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

function isJwtPayload(val: unknown): val is JwtPayload {
  return typeof val === 'object' && val !== null && 'sub' in val;
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: AuthenticatedRequest }>().req;

    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedException('Missing Authorization');

    if (!auth.toLowerCase().startsWith('bearer ')) {
      throw new UnauthorizedException('Invalid Authorization format');
    }
    const token = auth.slice(7).trim();

    const payload = verifyJwt(token);
    if (!isJwtPayload(payload)) {
      throw new UnauthorizedException('Invalid token');
    }

    req.user = payload;

    return true;
  }
}
