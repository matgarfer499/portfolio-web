export function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

const clamp = (n: number) => Math.min(1, Math.max(-1, n));

// The gallery parallax input: where the pointer sits, from -1 (left/top) to 1 (right/bottom).
export function pointerShift(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
): { x: number; y: number } {
  return {
    x: clamp(((clientX - rect.left) / rect.width) * 2 - 1),
    y: clamp(((clientY - rect.top) / rect.height) * 2 - 1),
  };
}
