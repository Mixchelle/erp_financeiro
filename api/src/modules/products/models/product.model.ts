// api/src/modules/products/models/product.model.ts
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Float, { nullable: true })
  priceDefault?: number | null;

  @Field(() => String)
  companyId!: string;

  // se tiver datas, use:
  // @Field(() => GraphQLISODateTime) createdAt!: Date;
  // @Field(() => GraphQLISODateTime) updatedAt!: Date;
}
