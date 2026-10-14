export function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}
