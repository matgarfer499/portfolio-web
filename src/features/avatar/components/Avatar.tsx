'use client';

import { Outlines, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3 } from 'three';
import { useToonGradient } from '@shared/hooks';
import { type ControlName } from '../controls';

const SPEED = 6;
const CAMERA_OFFSET = new Vector3(0, 8, 13);
const desiredCamera = new Vector3();

/**
 * Keyboard-driven, physics-backed avatar (a low-poly placeholder mini-Matías).
 * Velocity is set each frame from the control state; the camera trails behind with
 * framerate-independent smoothing.
 */
export function Avatar() {
  const body = useRef<RapierRigidBody>(null);
  const [, getKeys] = useKeyboardControls<ControlName>();
  const gradient = useToonGradient();

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
    const { y } = rb.linvel();
    if (length > 0) {
      rb.setLinvel({ x: (dx / length) * SPEED, y, z: (dz / length) * SPEED }, true);
    } else {
      rb.setLinvel({ x: 0, y, z: 0 }, true);
    }

    const position = rb.translation();
    desiredCamera.set(
      position.x + CAMERA_OFFSET.x,
      position.y + CAMERA_OFFSET.y,
      position.z + CAMERA_OFFSET.z,
    );
    // Exponential smoothing keeps the follow speed stable across frame rates.
    state.camera.position.lerp(desiredCamera, 1 - Math.pow(0.0015, delta));
    state.camera.lookAt(position.x, position.y + 1, position.z);
  });

  return (
    <RigidBody
      ref={body}
      type="dynamic"
      position={[0, 2, 7]}
      colliders={false}
      lockRotations
      friction={0.5}
      linearDamping={0.8}
      canSleep={false}
      name="avatar"
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1, 6, 16]} />
        <meshToonMaterial color="#ff7a1a" gradientMap={gradient} />
        <Outlines thickness={0.045} color="#0b1020" />
      </mesh>
      {/* Visor accent so the placeholder reads as a character with a facing. */}
      <mesh castShadow position={[0, 0.35, 0.4]}>
        <boxGeometry args={[0.55, 0.16, 0.12]} />
        <meshToonMaterial color="#0b1020" gradientMap={gradient} />
      </mesh>
    </RigidBody>
  );
}
