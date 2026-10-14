const clamp = (n: number) => Math.min(1, Math.max(-1, n));

// Where the pointer sits over a box, from -1 (left/top) to 1 (right/bottom), clamped outside it.
// The gallery parallax and the magnetic buttons both start from this.
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
