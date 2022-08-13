import {
  Args,
  createUnionType,
  GraphQLISODateTime,
  Int,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { ReplicationService } from '@supervision/app/replication/replication.service';
import { UserModel } from '@supervision/app/users';

const ResultUnion = createUnionType({
  name: 'DocumentUnion',
  types: () => [UserModel] as const,
});

@Resolver(() => [UserModel])
export class ReplicationResolver {
  constructor(private replicationService: ReplicationService) {}

  @Query(() => [UserModel])
  async updateFeed(
    @Args('lastId', { nullable: true }) lastId: string,
    @Args('minUpdatedAt', { type: () => GraphQLISODateTime, nullable: true })
    minUpdatedAt: Date,
    @Args('limit', { type: () => Int, defaultValue: 5 }) limit: number
  ) {
    return this.replicationService.getUpdatedFeed(lastId, minUpdatedAt, limit);
  }
}
