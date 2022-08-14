import { ArgsType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';

@ArgsType()
export class ReplicationArgs {
  @Field({ nullable: true })
  lastId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  minUpdatedAt: Date;

  @Field(() => Int, { defaultValue: 5 })
  limit: number;
}
