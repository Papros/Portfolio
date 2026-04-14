export type TimePickerVariant = 'input' | 'clock' | 'scroll';

export interface TimeValue {
  hours: number;   // 0–23
  minutes: number; // 0–59
}

export function dateToTimeValue(date: Date): TimeValue {
  return { hours: date.getHours(), minutes: date.getMinutes() };
}

export function applyTimeToDate(base: Date | null, time: TimeValue): Date {
  const d = base ? new Date(base) : new Date();
  d.setHours(time.hours, time.minutes, 0, 0);
  return d;
}

export function timeValueToLabel(time: TimeValue): string {
  const hh = String(time.hours).padStart(2, '0');
  const mm = String(time.minutes).padStart(2, '0');
  return `${hh}:${mm}`;
}