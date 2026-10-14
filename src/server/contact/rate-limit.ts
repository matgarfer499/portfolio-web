// Fixed window per key, in memory: one per server instance (Fluid Compute reuses instances), so it
// stops bursts from one visitor, not a distributed flood. The honeypot is the main bot filter.
export function createRateLimit({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, { start: number; count: number }>();
  const hit = (key: string, now: number): boolean => {
    const current = windows.get(key);
    if (!current || now - current.start >= windowMs) {
      // Opening a window sweeps the expired ones: memory stays bounded by recent visitors.
      for (const [k, w] of windows) if (now - w.start >= windowMs) windows.delete(k);
      windows.set(key, { start: now, count: 1 });
      return true;
    }
    current.count += 1;
    return current.count <= limit;
  };
  return Object.assign(hit, { size: () => windows.size });
}
