import { hash } from 'node:crypto';

export const createHashOf = (text: string, using: 'sha512'): string => {
  return hash(
    //
    using,
    Buffer.from(text),
    'hex',
  );
};
