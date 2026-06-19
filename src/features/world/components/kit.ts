import { useGLTF } from '@react-three/drei';

/** Paths to the CC0 kit GLBs that dress the paseo (Kenney City + Nature kits — see README). */
export const KIT = {
  buildings: [
    '/models/world/city/building-a.glb',
    '/models/world/city/building-b.glb',
    '/models/world/city/building-c.glb',
    '/models/world/city/building-e.glb',
    '/models/world/city/building-h.glb',
    '/models/world/city/building-k.glb',
  ],
  palms: [
    '/models/world/nature/tree_palmDetailedTall.glb',
    '/models/world/nature/tree_palmDetailedShort.glb',
    '/models/world/nature/tree_palmBend.glb',
  ],
  parasols: ['/models/world/city/detail-parasol-a.glb', '/models/world/city/detail-parasol-b.glb'],
  canoe: '/models/world/nature/canoe.glb',
} as const;

/** Warm the drei GLTF cache so props pop in with the scene instead of after a Suspense gap. */
export function preloadKit(): void {
  for (const url of [...KIT.buildings, ...KIT.palms, ...KIT.parasols, KIT.canoe]) {
    useGLTF.preload(url);
  }
}
