import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
enum ProductType { SERVICE='SERVICE', PRODUCT='PRODUCT' }
registerEnumType(ProductType, { name: 'ProductType' });
@ObjectType()
export class Product {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => ProductType) type!: ProductType;
  @Field({ nullable: true }) priceDefault?: number | null;
}
