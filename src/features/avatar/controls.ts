import type { KeyboardControlsEntry } from '@react-three/drei';

/** Named movement controls, mapped to both WASD and arrow keys. */
export const Controls = {
  forward: 'forward',
  backward: 'backward',
  left: 'left',
  right: 'right',
} as const;

export type ControlName = (typeof Controls)[keyof typeof Controls];

export const controlsMap: KeyboardControlsEntry<ControlName>[] = [
  { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Controls.backward, keys: ['ArrowDown', 'KeyS'] },
  { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
  { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
];
