import { DATABASE_PATH } from 'backend/constants/DATABASE_PATH.ts';
import { writeFile } from 'node:fs/promises';
import type { Database } from 'src/types/Database.d.ts';

export const writeDatabase = async (database: Database): Promise<void> => {
  return writeFile(
    //
    DATABASE_PATH,
    JSON.stringify(database, null, 2),
    {
      encoding: 'utf8',
    },
  );
};
