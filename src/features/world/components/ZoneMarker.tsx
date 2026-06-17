'use client';

import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useToonGradient } from '@shared/hooks';
import { DoubleSide } from 'three';
import type { Zone } from '@content/index';
import { useWorldStore } from '../store';
import { ZoneLandmark } from './Landmarks';

const ACCENT_HEX: Record<Zone['accent'], string> = {
  flame: '#ff8a3d',
  azure: '#1fb6d6',
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
      <ZoneLandmark zoneId={zone.id} />

      {/* Glowing "approach me" ring on the walkway. */}
      <mesh receiveShadow position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 2.5, 28]} />
        <meshToonMaterial
          color={color}
          gradientMap={gradient}
          emissive={color}
          emissiveIntensity={0.35}
          side={DoubleSide}
        />
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
