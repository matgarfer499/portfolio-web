type MatiasGlobal = Window & { matias?: { unlock: () => void } };

export function initWindowUnlock(unlock: () => void): void {
  (window as MatiasGlobal).matias = { unlock };
}

export function cleanupWindowUnlock(): void {
  delete (window as MatiasGlobal).matias;
}
