import type { HourMinute } from 'src/types/HourMinute.d.ts';
import type { PlannerNote } from 'src/types/PlannerNote.d.ts';

declare const brand: unique symbol;

export class PlannerEntry {
  private declare readonly brand: typeof brand;

  time: HourMinute;

  notes: PlannerNote[];

  constructor(time: HourMinute, notes: PlannerNote[]) {
    this.time = time;
    this.notes = notes;
  }
}
