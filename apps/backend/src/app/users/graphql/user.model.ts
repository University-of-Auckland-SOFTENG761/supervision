import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ConsultModel } from '@supervision/consults';
import { BaseModel } from '@supervision/shared';
import { UserRole } from '@supervision/users';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType({ description: 'user' })
export class UserModel extends BaseModel {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  isActive: boolean;

  @Field(() => [ConsultModel])
  consults: ConsultModel[];
}
