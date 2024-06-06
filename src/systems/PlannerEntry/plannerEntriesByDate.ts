import type { PlannerEntry } from 'src/data/PlannerEntry.d.ts';

export const plannerEntriesByDate = ({ time: a }: PlannerEntry, { time: b }: PlannerEntry): -1 | 0 | 1 => {
  const dateA = new Date();
  const dateB = new Date();

  const [hoursA, minutesA] = a.split(':').map(Number);
  const [hoursB, minutesB] = b.split(':').map(Number);

  dateA.setHours(hoursA);
  dateA.setMinutes(minutesA);

  dateB.setHours(hoursB);
  dateB.setMinutes(minutesB);

  // prettier-ignore
  return dateA > dateB
    ? 1
    : dateB > dateA
      ? -1
      : 0;
};
