import { ReplicationArgs } from '@supervision/shared';

export interface IReplicationResolver<T> {
  replicationFeed(args: ReplicationArgs): Promise<T[]>;
}
