import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload, User } from './models/user.model';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}
  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    const token = await this.service.login(input.email, input.password);
    return { token };
  }
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@Context() ctx: any): Promise<User> {
    const userId = ctx.req.user.sub;
    return (await this.service.me(userId)) as any;
  }
}
