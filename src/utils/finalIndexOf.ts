import { toIndex } from 'src/utils/toIndex.ts';

export const finalIndexOf = <const T>(array: readonly T[]): number => {
  const { length } = array;

  return toIndex(length);
};
