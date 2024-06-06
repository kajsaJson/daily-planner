import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';

export type TimeTrio<T extends HourOption | MinuteOption> = {
  previousValue: T;
  value: T;
  nextValue: T;
};
