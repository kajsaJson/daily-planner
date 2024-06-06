import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';
import type { TimeTrio } from 'src/types/TimeTrio.d.ts';
import { step } from 'src/utils/step.ts';

export const createTimeTrio = <const T extends HourOption | MinuteOption>(
  current: T,
  options: readonly T[],
): TimeTrio<T> => {
  const { length } = options;

  const currentIndex = options.indexOf(current);
  const previousIndex = step(currentIndex, -1, length);
  const nextIndex = step(currentIndex, 1, length);

  return {
    previousValue: options[previousIndex],
    value: options[currentIndex],
    nextValue: options[nextIndex],
  };
};
