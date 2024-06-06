import { createHashOf } from 'backend/utils/createHashOf.ts';
import type { Email } from 'src/types/Email.d.ts';

export const createHashFrom = (email: Email, password: string): string => {
  console.count(`Creating hash from email "${email}" and password "${password}".`);

  const text = [
    //
    email,
    password,
  ].join('');

  return createHashOf(text, 'sha512');
};
