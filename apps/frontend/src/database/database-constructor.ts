/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxDatabase } from 'rxdb';
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql';

class DatabaseConstructor {
  private _blocked = false;
  private _db: RxDatabase | null = null;
  private _replicationState: RxGraphQLReplicationState<any> | null | undefined =
    null;
  private _dbInitializer: () => Promise<{
    db: RxDatabase;
    replicationState: RxGraphQLReplicationState<any> | undefined;
  }>;

  public async get(): Promise<{
    db: RxDatabase | null;
    replicationState: RxGraphQLReplicationState<any> | null | undefined;
  }> {
    if (!this._db && !this._blocked) {
      this._blocked = true;
      const { db, replicationState } = await this._dbInitializer();
      this._db = db;
      this._replicationState = replicationState;
      this._blocked = false;
    }
    return Promise.resolve({
      db: this._db,
      replicationState: this._replicationState,
    });
  }

  constructor(
    dbInitializer: () => Promise<{
      db: RxDatabase;
      replicationState: RxGraphQLReplicationState<any> | undefined;
    }>
  ) {
    this._dbInitializer = dbInitializer;
  }
}

export default DatabaseConstructor;
