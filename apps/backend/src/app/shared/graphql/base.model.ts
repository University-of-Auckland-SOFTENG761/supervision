import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field()
  revision: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field()
  updatedAt: Date;
}
