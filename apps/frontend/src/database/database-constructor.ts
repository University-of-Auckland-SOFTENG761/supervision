import { RxDatabase } from 'rxdb';

class DatabaseConstructor {
  private _db: RxDatabase | null;
  private _databaseConstructor: () => Promise<RxDatabase>;
  constructor(databaseConstructor: () => Promise<RxDatabase>) {
    this._databaseConstructor = databaseConstructor;
    this._db = null;
    this.get = async (): Promise<RxDatabase> => {
      if (!this._db) {
        this._db = await this._databaseConstructor();
      }
      return this._db;
    };
  }
  get(): Promise<RxDatabase> | null {
    return null;
  }
}

export default DatabaseConstructor;
