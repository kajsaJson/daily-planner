import { JSON_WEB_TOKEN_LOCAL_STORAGE_KEY } from 'src/constants/JSON_WEB_TOKEN_LOCAL_STORAGE_KEY.ts';
import { loadUserProfile } from 'src/systems/UserProfile/loadUserProfile.ts';
import type { JsonWebToken } from 'src/types/JsonWebToken.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export const initializeUserProfile = async (): Promise<UserProfile> => {
  const json = localStorage.getItem(JSON_WEB_TOKEN_LOCAL_STORAGE_KEY) ?? '';

  return json
    ? loadUserProfile(JSON.parse(json) as JsonWebToken)
    : {
        email: '',
        hash: '',
        plannerEntries: [],
        preferences: {
          colorTheme: 'dark',
        },
      };
};
