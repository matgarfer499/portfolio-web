// Fixed window per key, in memory: one per server instance (Fluid Compute reuses instances), so it
// stops bursts from one visitor, not a distributed flood. The honeypot is the main bot filter.
export function createRateLimit({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number;
  windowMs: number;
  maxKeys?: number;
}) {
  // Kept in window-start order (renewed keys move to the back), so expired windows sit at the front.
  const windows = new Map<string, { start: number; count: number }>();
  const hit = (key: string, now: number): boolean => {
    for (const [k, w] of windows) {
      if (now - w.start < windowMs) break;
      windows.delete(k);
    }
    const current = windows.get(key);
    if (current) {
      current.count += 1;
      return current.count <= limit;
    }
    if (windows.size >= maxKeys) windows.delete(windows.keys().next().value!);
    windows.set(key, { start: now, count: 1 });
    return true;
  };
  return Object.assign(hit, { size: () => windows.size });
}
