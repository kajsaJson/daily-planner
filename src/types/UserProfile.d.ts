import type { PlannerEntry } from 'src/data/PlannerEntry.d.ts';
import type { Email } from 'src/types/Email.d.ts';
import type { UserPreferences } from 'src/types/UserPreferences.d.ts';

export type UserProfile = {
  readonly email: Email;
  readonly hash: string;
  readonly preferences: UserPreferences;
  readonly plannerEntries: readonly PlannerEntry[];
};
