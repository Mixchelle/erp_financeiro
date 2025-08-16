import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Customer {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) email?: string | null;
  @Field({ nullable: true }) doc?: string | null;
}
