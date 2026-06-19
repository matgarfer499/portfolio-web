'use client';

import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { avatarPosition } from '../state';

/** Camera follow rate (1/s): pans toward the avatar without floating. */
const CAMERA_LAMBDA = 9;
/**
 * Fixed high-angle top-down placement (League of Legends style): 16 up, 11 toward +Z gives a
 * ~55° pitch. The camera never rotates — it only translates to keep the avatar framed, so
 * screen-up stays world -Z and the avatar's WASD mapping is already camera-relative.
 */
const CAMERA_OFFSET = new Vector3(0, 16, 11);
const desired = new Vector3();

/**
 * Drives the scene camera from the shared `avatarPosition`. Mounted inside `<Canvas>` (after the
 * physics/avatar) so it reads the position the avatar wrote this frame. Smoothing is
 * framerate-independent (`1 - exp(-λ·dt)`) so follow speed is identical at 30 or 144 fps.
 */
export function CameraRig() {
  useFrame((state, delta) => {
    desired.set(
      avatarPosition.x + CAMERA_OFFSET.x,
      avatarPosition.y + CAMERA_OFFSET.y,
      avatarPosition.z + CAMERA_OFFSET.z,
    );
    state.camera.position.lerp(desired, 1 - Math.exp(-CAMERA_LAMBDA * delta));
    state.camera.lookAt(avatarPosition.x, avatarPosition.y, avatarPosition.z);
  });

  return null;
}
