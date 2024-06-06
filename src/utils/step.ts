import { modulus } from 'src/utils/modulus.ts';

export const step = (value: number, by: number, max: number): number => {
  const sum = value + by;

  const sumRemainder = modulus(sum, max);

  // 👇 Adding `max` to `sumRemainder` fixes the problem of `sumRemainder` perhaps being negative.
  const positiveSumRemainder = sumRemainder + max;

  return modulus(positiveSumRemainder, max);
};
