import type { Email } from 'src/types/Email.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export type Database = {
  readonly [key in Email]: UserProfile;
};
