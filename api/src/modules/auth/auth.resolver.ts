// api/src/modules/auth/auth.resolver.ts
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload, User } from './models/user.model';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from '../../common/auth/gql-auth.guard';
import type { JwtPayload } from '../../common/auth/jwt.util';
import { CurrentUser } from './current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    const token = await this.service.login(input.email, input.password);
    return { token };
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: JwtPayload): Promise<User> {
    const me = await this.service.me(user.sub);
    return me as unknown as User; 
  }
}
