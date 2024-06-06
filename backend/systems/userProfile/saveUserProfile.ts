import { readDatabase } from 'backend/systems/database/readDatabase.ts';
import { writeDatabase } from 'backend/systems/database/writeDatabase.ts';
import type { Mutable } from 'src/types/Mutable.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export const saveUserProfile = async (userProfile: UserProfile): Promise<void> => {
  const database = await readDatabase();

  const { email } = userProfile;

  (database as Mutable<typeof database>)[email] = userProfile;

  return writeDatabase(database);
};
