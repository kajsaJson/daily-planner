import type { UserProfile } from 'src/types/UserProfile.d.ts';

export type ServerMessage =
  | {
      readonly status: 'error';
      readonly data?: never;
    }
  | {
      readonly status: 'ok';
      readonly data: UserProfile;
    }
  | {
      readonly status: 'method not allowed';
      readonly data?: never;
    }
  | {
      readonly status: 'user already exists';
      readonly data?: never;
    }
  | {
      readonly status: 'user does not exist';
      readonly data?: never;
    }
  | {
      readonly status: 'wrong email or password';
      readonly data?: never;
    }
  | {
      readonly status: 'invalid hash';
      readonly data?: never;
    }
  | {
      readonly status: 'no email in cookie';
      readonly data?: never;
    }
  | {
      readonly status: 'no hash in cookie';
      readonly data?: never;
    }
  | {
      readonly status: 'email mismatch';
      readonly data?: never;
    }
  | {
      readonly status: 'hash mismatch';
      readonly data?: never;
    };
