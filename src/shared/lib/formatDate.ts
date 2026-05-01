const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatYearMonth(iso: string): string {
  const [y, m] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatRange(start: string, end?: string): string {
  const startStr = formatYearMonth(start);
  if (!end) return `${startStr} – Present`;
  const endStr = formatYearMonth(end);
  if (startStr === endStr) return startStr;
  return `${startStr} – ${endStr}`;
}

export function toDatetimeAttr(iso: string): string {
  return iso;
}
