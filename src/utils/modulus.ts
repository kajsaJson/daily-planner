export const modulus = (value: number, by: number): number => {
  const remainder = value % by;

  return remainder | 0; // 👈 This bitwise OR turns deadly `NaN` into safe `0` (since modulus can produce `NaN`s, e.g. in the case of `0 % 0`).
};
