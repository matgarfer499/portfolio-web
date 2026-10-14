/** Whole years between an ISO month (YYYY-MM) and `now`, for the "2+ yrs" stat. */
export function yearsSince(isoMonth: string, now: Date): number {
  const [year = 0, month = 1] = isoMonth.split('-').map(Number);
  const months = (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}

const MAX_RATE = 4;
const PX_PER_MS_FOR_MAX = 3;

// Marquee playback rate from scroll velocity (px/ms, signed): faster while scrolling, reversed
// when scrolling up, back to ±1 in the last direction when the page is still.
export function marqueeRate(velocity: number, lastDirection: 1 | -1): number {
  const direction = velocity === 0 ? lastDirection : velocity > 0 ? 1 : -1;
  const boost = Math.min(Math.abs(velocity) / PX_PER_MS_FOR_MAX, 1) * (MAX_RATE - 1);
  return direction * (1 + boost);
}
