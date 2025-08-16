import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateCustomerInput {
  @Field() name!: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) doc?: string;
}
