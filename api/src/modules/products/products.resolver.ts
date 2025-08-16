import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private service: ProductsService) {}
  @Query(() => [Product])
  products(@Context() ctx: any) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.list(companyId);
  }
  @Mutation(() => Product)
  createProduct(@Context() ctx: any, @Args('input') input: CreateProductInput) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.create(companyId, input);
  }
  @Mutation(() => Product)
  updateProduct(@Context() ctx: any, @Args('input') input: UpdateProductInput) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    return this.service.update(companyId, input.id, input);
  }
  @Mutation(() => ID)
  async removeProduct(@Context() ctx: any, @Args('id', { type: () => ID }) id: string) {
    const companyId = ctx.req.user?.companyId || 'DEMO';
    await this.service.remove(companyId, id);
    return id;
  }
}
