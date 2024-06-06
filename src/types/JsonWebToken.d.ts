import type { Email } from 'src/types/Email.d.ts';

/** A simplified JWT for demonstrative purposes. */
export type JsonWebToken = {
  readonly email: Email;
  readonly hash: string;
};
