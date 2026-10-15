/** Whole years between an ISO month (YYYY-MM) and `now`, for the "N+ yrs" stat. */
export function yearsSince(isoMonth: string, now: Date): number {
  const [year = 0, month = 1] = isoMonth.split('-').map(Number);
  const months = (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}
