export type Mutable<T> = {
  -readonly [key in keyof T]: T[key];
};
