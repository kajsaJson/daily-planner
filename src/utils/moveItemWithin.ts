import { finalIndexOf } from 'src/utils/finalIndexOf.ts';

export const moveItemWithin = <const T>(array: T[], fromIndex: number, toIndex: number): T[] => {
  const { length } = array;

  const finalIndex = finalIndexOf(array);

  // prettier-ignore
  if (length < 2 || fromIndex < 0 || toIndex < 0 || fromIndex > finalIndex || toIndex > finalIndex || fromIndex === toIndex) {
    return array;
  }

  const output = [...array];

  const item = output[fromIndex];

  output.splice(fromIndex, 1);

  output.splice(toIndex, 0, item);

  return output;
};
