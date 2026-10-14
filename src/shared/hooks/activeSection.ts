/** The first id in page order among the sections crossing the reading line. */
export function pickActive(ids: readonly string[], visible: ReadonlySet<string>): string | null {
  return ids.find((id) => visible.has(id)) ?? null;
}
