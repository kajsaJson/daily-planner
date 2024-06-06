import type { JsonWebToken } from 'src/types/JsonWebToken.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';

export type ClientMessage =
  | {
      readonly action: 'read';
      readonly jsonWebToken: JsonWebToken;
    }
  | {
      readonly action: 'write';
      readonly userProfile: UserProfile;
    };
