import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateProductInput {
  @Field() name!: string;
  @Field({ nullable: true }) priceDefault?: number;
  @Field(() => String, { defaultValue: 'SERVICE' }) type!: 'SERVICE' | 'PRODUCT';
}
