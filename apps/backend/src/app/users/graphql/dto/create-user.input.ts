import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@supervision/users';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => UserRole, { nullable: true, defaultValue: UserRole.STUDENT })
  role: UserRole = UserRole.STUDENT;

  @Field(() => String, { nullable: true })
  auth0id?: string;
}

export type ICreateUserInput =
  | {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: UserRole;
    }
  | {
      firstName: string;
      lastName: string;
      email: string;
      auth0id: string;
      role: UserRole;
    };
