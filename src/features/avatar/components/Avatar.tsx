'use client';

import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { type Group, MathUtils, Quaternion, Vector3 } from 'three';
import { type ControlName } from '../controls';
import { MiniHero } from './MiniHero';

const SPEED = 6;
/** Accel/decel rate (1/s): ~95% of target speed in ~0.25s. Higher = snappier. */
const MOVE_LAMBDA = 12;
/** Yaw slerp rate (1/s): turns to face the heading without spinning instantly. */
const TURN_LAMBDA = 10;
/** Camera follow rate (1/s): tight track without floating. */
const CAMERA_LAMBDA = 9;
/** Below this residual speed on release, snap to a clean stop. */
const STOP_EPSILON = 0.01;

const CAMERA_OFFSET = new Vector3(0, 8, 13);
const desiredCamera = new Vector3();
const UP = new Vector3(0, 1, 0);
const targetQuat = new Quaternion();
const nextVel = new Vector3();

/**
 * Keyboard-driven, physics-backed avatar (a low-poly placeholder mini-Matías).
 * The body keeps `lockRotations` and only its linear velocity is driven (damped toward a
 * target each frame for accel/decel). Facing is a *visual* concern: an inner group yaws
 * toward the movement direction while the symmetric collider stays put. The camera trails
 * with framerate-independent exponential smoothing.
 */
export function Avatar() {
  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<Group>(null);
  const [, getKeys] = useKeyboardControls<ControlName>();

  useFrame((state, delta) => {
    const rb = body.current;
    if (!rb) return;

    const { forward, backward, left, right } = getKeys();
    let dx = 0;
    let dz = 0;
    if (forward) dz -= 1;
    if (backward) dz += 1;
    if (left) dx -= 1;
    if (right) dx += 1;

    const length = Math.hypot(dx, dz);
    const tx = length > 0 ? (dx / length) * SPEED : 0;
    const tz = length > 0 ? (dz / length) * SPEED : 0;

    // Ease toward the target velocity (framerate-independent); preserve gravity on Y.
    const { x: vx, y, z: vz } = rb.linvel();
    let nx = MathUtils.damp(vx, tx, MOVE_LAMBDA, delta);
    let nz = MathUtils.damp(vz, tz, MOVE_LAMBDA, delta);
    if (length === 0 && Math.hypot(nx, nz) < STOP_EPSILON) {
      nx = 0;
      nz = 0;
    }
    nextVel.set(nx, y, nz);
    rb.setLinvel(nextVel, true);

    // Smoothly yaw the visual toward the heading; hold the last facing when idle.
    const vis = visual.current;
    if (vis && length > 0) {
      targetQuat.setFromAxisAngle(UP, Math.atan2(dx, dz));
      vis.quaternion.slerp(targetQuat, 1 - Math.exp(-TURN_LAMBDA * delta));
    }

    const position = rb.translation();
    desiredCamera.set(
      position.x + CAMERA_OFFSET.x,
      position.y + CAMERA_OFFSET.y,
      position.z + CAMERA_OFFSET.z,
    );
    // Exponential smoothing keeps the follow speed stable across frame rates.
    state.camera.position.lerp(desiredCamera, 1 - Math.exp(-CAMERA_LAMBDA * delta));
    state.camera.lookAt(position.x, position.y + 1, position.z);
  });

  return (
    <RigidBody
      ref={body}
      type="dynamic"
      position={[2, 2, 37]}
      colliders={false}
      lockRotations
      friction={0.5}
      linearDamping={0}
      canSleep={false}
      name="avatar"
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <group ref={visual}>
        <MiniHero />
      </group>
    </RigidBody>
  );
}
