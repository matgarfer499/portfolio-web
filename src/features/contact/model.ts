import { contactSubject } from '@/server/contact/subject';
import { pointerShift } from '@shared/motion/pointer';

// Magnetic buttons: offset toward the pointer, from the centre (0) to `max` at the edges.
export function magnetPull(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  max: number,
): { x: number; y: number } {
  const { x, y } = pointerShift(clientX, clientY, rect);
  return { x: x * max + 0, y: y * max + 0 }; // + 0 turns -0 into 0
}

// The form's fallback while no email service is connected: same subject the server would send.
export function mailtoHref(to: string, values: { name: string; message: string }): string {
  const subject = encodeURIComponent(contactSubject(values.name));
  return `mailto:${to}?subject=${subject}&body=${encodeURIComponent(values.message)}`;
}
