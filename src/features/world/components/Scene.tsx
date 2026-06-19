'use client';

import { zones } from '@content/index';
import { Boundaries } from './Boundaries';
import { Ground } from './Ground';
import { KIT, preloadKit } from './kit';
import { KitProp } from './KitProp';
import { Lighting } from './Lighting';
import { Railing } from './Railing';
import { Sea } from './Sea';
import { Sky } from './Sky';
import { ZoneMarker } from './ZoneMarker';

interface Placed {
  readonly model: string;
  readonly position: readonly [number, number, number];
  readonly rotation: number;
  readonly scale: number;
}

/** Whitewashed-town buildings lined up inland (+X), fronts turned toward the walkway (-X). */
const BUILDINGS: readonly Placed[] = [
  { model: KIT.buildings[0]!, position: [16, 0, -34], rotation: -Math.PI / 2, scale: 4 },
  { model: KIT.buildings[1]!, position: [17.5, 0, -21], rotation: -Math.PI / 2 + 0.1, scale: 3.6 },
  { model: KIT.buildings[2]!, position: [16, 0, -8], rotation: -Math.PI / 2, scale: 4.4 },
  { model: KIT.buildings[3]!, position: [17, 0, 6], rotation: -Math.PI / 2 - 0.08, scale: 3.8 },
  { model: KIT.buildings[4]!, position: [16, 0, 20], rotation: -Math.PI / 2, scale: 4.2 },
  { model: KIT.buildings[5]!, position: [18, 0, 33], rotation: -Math.PI / 2, scale: 3.4 },
];

/** Palms breaking up the walk — inland row + a couple on the sea side. */
const PALMS: readonly Placed[] = [
  { model: KIT.palms[0]!, position: [9, 0, -30], rotation: 0.4, scale: 3 },
  { model: KIT.palms[2]!, position: [9, 0, -10], rotation: 1.1, scale: 3.2 },
  { model: KIT.palms[1]!, position: [9, 0, 10], rotation: 2.0, scale: 2.8 },
  { model: KIT.palms[0]!, position: [9, 0, 30], rotation: 0.8, scale: 3.1 },
  { model: KIT.palms[2]!, position: [-3, 0, -20], rotation: 1.7, scale: 2.9 },
  { model: KIT.palms[1]!, position: [-3, 0, 18], rotation: 0.2, scale: 3 },
];

/** Café parasols dotting the promenade for a seafront-terrace feel. */
const PARASOLS: readonly Placed[] = [
  { model: KIT.parasols[0]!, position: [11.5, 0, -25], rotation: 0.3, scale: 4 },
  { model: KIT.parasols[1]!, position: [11.5, 0, 2], rotation: -0.4, scale: 4.2 },
  { model: KIT.parasols[0]!, position: [11.5, 0, 27], rotation: 0.7, scale: 3.8 },
];

/** A couple of canoes adrift on the water beyond the sea-wall. */
const BOATS: readonly Placed[] = [
  { model: KIT.canoe, position: [-11, -0.3, -12], rotation: 1.3, scale: 3 },
  { model: KIT.canoe, position: [-13, -0.35, 16], rotation: 1.8, scale: 3.4 },
];

const PROPS: readonly Placed[] = [...BUILDINGS, ...PALMS, ...PARASOLS, ...BOATS];

/**
 * The static world: the banded dusk sky + sea, the warm-sand promenade with its sea-wall
 * railing, an inland row of CC0 kit buildings, palms, café parasols and a couple of canoes,
 * invisible boundaries that keep the avatar on the paseo, and one zone marker per content zone.
 * The avatar mounts separately. Kit props are cel-shaded on load to match the Costa Azul look.
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

      {PROPS.map((p, i) => (
        <KitProp
          key={i}
          model={p.model}
          position={p.position}
          rotation={p.rotation}
          scale={p.scale}
        />
      ))}

      {zones.map((zone) => (
        <ZoneMarker key={zone.id} zone={zone} />
      ))}
    </>
  );
}

preloadKit();
