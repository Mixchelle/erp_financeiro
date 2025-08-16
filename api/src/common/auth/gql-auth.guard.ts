import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verifyJwt } from './jwt.util';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: any }>().req;
    const auth = req.headers['authorization'] as string | undefined;
    if (!auth) throw new UnauthorizedException('Missing Authorization');
    const token = auth.replace(/^Bearer\\s+/i, '').trim();
    const payload = verifyJwt(token);
    if (!payload) throw new UnauthorizedException('Invalid token');
    (req as any).user = payload;
    return true;
  }
}
