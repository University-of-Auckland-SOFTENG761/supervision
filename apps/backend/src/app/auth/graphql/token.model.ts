import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tokens for auth purposes' })
export class TokenModel {
  @Field()
  accessToken: string;

  @Field()
  idToken: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field()
  expiresIn: number;

  @Field()
  tokenType: string;
}
