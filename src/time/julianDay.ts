import { JulianDayInput } from "../types/time";

export function calculateJulianDay(input: JulianDayInput): number {
  let { year, month, day } = input;

  const hour = input.hour ?? 0;
  const minute = input.minute ?? 0;
  const second = input.second ?? 0;

  if (month <= 2) {
    year--;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);

  const dayFraction =
    (hour + minute / 60 + second / 3600) / 24;

  return (
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    dayFraction +
    B -
    1524.5
  );
}