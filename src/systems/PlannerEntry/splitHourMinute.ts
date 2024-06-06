import type { HourMinute } from 'src/types/HourMinute.d.ts';
import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';

export const splitHourMinute = (time: HourMinute): { readonly hour: HourOption; readonly minute: MinuteOption } => {
  const [hour, minute] = time.split(':');

  return {
    hour: hour as HourOption,
    minute: minute as MinuteOption,
  } as const;
};
