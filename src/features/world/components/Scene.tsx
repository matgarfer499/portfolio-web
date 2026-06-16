'use client';

import { zones } from '@content/index';
import { Block } from './Block';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { ZoneMarker } from './ZoneMarker';

/**
 * The static world: lighting, floor, perimeter walls, a couple of obstacles to bump
 * into, and one zone marker per content zone. The avatar is composed in separately.
 */
export function Scene() {
  return (
    <>
      <Lighting />
      <Ground />

      {/* Perimeter walls keep the avatar inside the play area. */}
      <Block position={[0, 1, -22]} size={[46, 2, 1]} />
      <Block position={[0, 1, 22]} size={[46, 2, 1]} />
      <Block position={[-22, 1, 0]} size={[1, 2, 46]} />
      <Block position={[22, 1, 0]} size={[1, 2, 46]} />

      {/* Obstacles, in the accent palette, to make collisions obvious. */}
      <Block position={[-5, 0.75, -2]} size={[1.5, 1.5, 1.5]} color="#ff7a1a" />
      <Block position={[5, 0.9, 1]} size={[1.6, 1.8, 1.6]} color="#3aa0ff" />

      {zones.map((zone) => (
        <ZoneMarker key={zone.id} zone={zone} />
      ))}
    </>
  );
}
