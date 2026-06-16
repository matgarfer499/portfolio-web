'use client';

import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useToonGradient } from '@shared/hooks';
import { DoubleSide } from 'three';
import type { Zone } from '@content/index';
import { useWorldStore } from '../store';

const ACCENT_HEX: Record<Zone['accent'], string> = {
  flame: '#ff7a1a',
  azure: '#3aa0ff',
};

interface ZoneMarkerProps {
  readonly zone: Zone;
}

/**
 * A visible zone landmark (pillar + ground ring) wrapped in an invisible sensor.
 * Walking the avatar into the sensor updates the world store, which the app layer
 * turns into an unlocked achievement.
 */
export function ZoneMarker({ zone }: ZoneMarkerProps) {
  const gradient = useToonGradient();
  const enterZone = useWorldStore((state) => state.enterZone);
  const leaveZone = useWorldStore((state) => state.leaveZone);
  const color = ACCENT_HEX[zone.accent];

  return (
    <group position={[...zone.position]}>
      <mesh castShadow position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 3.2, 8]} />
        <meshToonMaterial
          color={color}
          gradientMap={gradient}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh receiveShadow position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 2.5, 28]} />
        <meshToonMaterial color={color} gradientMap={gradient} side={DoubleSide} />
      </mesh>

      <RigidBody
        type="fixed"
        colliders={false}
        sensor
        onIntersectionEnter={() => enterZone(zone.id)}
        onIntersectionExit={() => leaveZone(zone.id)}
      >
        <CuboidCollider args={[2.3, 1.6, 2.3]} position={[0, 1.6, 0]} />
      </RigidBody>
    </group>
  );
}
