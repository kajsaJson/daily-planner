import { DATABASE_PATH } from 'backend/constants/DATABASE_PATH.ts';
import { readFile, writeFile } from 'node:fs/promises';
import type { Database } from 'src/types/Database.d.ts';

export const readDatabase = async (): Promise<Database> => {
  try {
    const json = await readFile(
      //
      DATABASE_PATH,
      {
        encoding: 'utf8',
      },
    );

    return JSON.parse(json) as Database;
  } catch (error) {
    console.error(error);

    if (error instanceof Error && 'code' in error) {
      const { code } = error;

      if (code === 'ENOENT') {
        const database = {} as const satisfies Database;

        await writeFile(
          //
          DATABASE_PATH,
          JSON.stringify(database, null, 2),
          {
            encoding: 'utf8',
          },
        );

        return database;
      }
    }

    throw error;
  }
};
