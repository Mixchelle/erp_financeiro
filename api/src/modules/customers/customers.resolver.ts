import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer.model';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private service: CustomersService) {}
  @Query(() => [Customer])
  customers(@Context() ctx: any) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.list(companyId);
  }
  @Mutation(() => Customer)
  createCustomer(@Context() ctx: any, @Args('input') input: CreateCustomerInput) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.create(companyId, input);
  }
  @Mutation(() => Customer)
  updateCustomer(@Context() ctx: any, @Args('input') input: UpdateCustomerInput) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.update(companyId, input.id, input);
  }
  @Mutation(() => ID)
  async removeCustomer(@Context() ctx: any, @Args('id', { type: () => ID }) id: string) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    await this.service.remove(companyId, id);
    return id;
  }
}
