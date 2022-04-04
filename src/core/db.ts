import sqlite3 from 'sqlite3';

export const initDatabase = (filePath: string) => {
  const { Database } = sqlite3.verbose();
  return new Database(filePath);
};

const queryAll = <T extends any>(db: sqlite3.Database, query: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * from 31bb7ba8914766d4ba40d6dfb6113c8b614be442
 */
export const getPersonList = (db: sqlite3.Database) => {
  const query = `
  select
    *
  from ABPersonFullTextSearch_content
  `;
  return queryAll<{
    [key: string]: string;
  }>(db, query);
};

/**
 * from 3d0d7e5fb2ce288813306e4d4636395e047a3d28
 */
export const getHandleList = (db: sqlite3.Database) => {
  const query = `
  select
    id,
    service,
    ROWID
  from handle
  `;
  return queryAll<Handle>(db, query);
};

/**
 * from 3d0d7e5fb2ce288813306e4d4636395e047a3d28
 */
export const getMessageList = (db: sqlite3.Database) => {
  const query = `
  select
    *
  from message
  `;
  return queryAll<{
    /**
     * string or number actually
     */
    [key: string]: any;
  }>(db, query);
};
