import { Vector3 } from 'three';

/**
 * The avatar's current world position, written by `Avatar` each frame and read by `CameraRig`.
 * A module-scope singleton (there is exactly one avatar) keeps the camera read inside the
 * feature without crossing import boundaries or re-rendering React on movement.
 */
export const avatarPosition = new Vector3(2, 2, 37);

/**
 * The avatar's horizontal speed (units/s), written by `Avatar` and read by `Character` to
 * cross-fade idle/walk/run. A mutable holder (not React state) so animation blending happens
 * in the frame loop without re-rendering.
 */
export const avatarMotion = { speed: 0 };
