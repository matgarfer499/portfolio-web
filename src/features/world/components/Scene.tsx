'use client';

import { zones } from '@content/index';
import { Boundaries } from './Boundaries';
import { Building } from './Building';
import { Ground } from './Ground';
import { Lighting } from './Lighting';
import { PalmTree } from './PalmTree';
import { Railing } from './Railing';
import { Sea } from './Sea';
import { Sky } from './Sky';
import { ZoneMarker } from './ZoneMarker';

/** Whitewashed houses lined up inland (+X) as the promenade backdrop. */
const BUILDINGS: ReadonlyArray<{
  position: readonly [number, number, number];
  size: readonly [number, number, number];
  wall: string;
  roof: string;
}> = [
  { position: [16, 0, -34], size: [6, 5, 5], wall: '#fbeee9', roof: '#ff8a3d' },
  { position: [17.5, 0, -21], size: [5, 4, 4.5], wall: '#f3e7df', roof: '#e0641a' },
  { position: [16, 0, -8], size: [6, 6, 5], wall: '#fbeee9', roof: '#ff8a3d' },
  { position: [17, 0, 6], size: [5.5, 4.5, 4.5], wall: '#f6ece4', roof: '#e0641a' },
  { position: [16, 0, 20], size: [6, 5.5, 5], wall: '#fbeee9', roof: '#ff8a3d' },
  { position: [17.5, 0, 33], size: [5, 4, 4.5], wall: '#f3e7df', roof: '#e0641a' },
];

/** Palms breaking up the walk — inland row + a couple on the sea side. */
const PALMS: ReadonlyArray<{ position: readonly [number, number, number]; rotation: number }> = [
  { position: [9, 0, -30], rotation: 0.4 },
  { position: [9, 0, -10], rotation: 1.1 },
  { position: [9, 0, 10], rotation: 2.0 },
  { position: [9, 0, 30], rotation: 0.8 },
  { position: [-3, 0, -20], rotation: 1.7 },
  { position: [-3, 0, 18], rotation: 0.2 },
];

/**
 * The static world: the banded dusk sky + sea, the warm-sand promenade with its sea-wall
 * railing, the inland row of Andalusian houses and palms, invisible boundaries that keep
 * the avatar on the paseo, and one zone marker per content zone. The avatar mounts separately.
 */
export function Scene() {
  return (
    <>
      <Lighting />
      <Sky />
      <Sea />
      <Ground />
      <Railing />
      <Boundaries />

      {BUILDINGS.map((b, i) => (
        <Building key={i} position={b.position} size={b.size} wall={b.wall} roof={b.roof} />
      ))}
      {PALMS.map((p, i) => (
        <PalmTree key={i} position={p.position} rotation={p.rotation} />
      ))}

      {zones.map((zone) => (
        <ZoneMarker key={zone.id} zone={zone} />
      ))}
    </>
  );
}
