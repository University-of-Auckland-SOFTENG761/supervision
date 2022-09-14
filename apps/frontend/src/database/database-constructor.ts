import { RxDatabase } from 'rxdb';

class DatabaseConstructor {
  private _blocked = false;
  private _db: RxDatabase | null = null;
  private _dbInitializer: () => Promise<RxDatabase>;

  public async get(): Promise<RxDatabase | null> {
    if (!this._db && !this._blocked) {
      this._blocked = true;
      this._db = await this._dbInitializer();
      this._blocked = false;
    }
    return Promise.resolve(this._db);
  }

  constructor(dbInitializer: () => Promise<RxDatabase>) {
    this._dbInitializer = dbInitializer;
  }
}

export default DatabaseConstructor;
