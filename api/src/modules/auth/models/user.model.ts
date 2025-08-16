// api/src/modules/auth/models/user.model.ts
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
export enum Role {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  VIEWER = 'VIEWER',
}
registerEnumType(Role, { name: 'Role' });
@ObjectType()
export class User {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field() email!: string;
  @Field(() => Role) role!: Role;
}
@ObjectType()
export class AuthPayload {
  @Field() token!: string;
}
