import {
  Color,
  type ColorRepresentation,
  type DataTexture,
  type Material,
  Mesh,
  MeshToonMaterial,
  type Object3D,
  type Texture,
} from 'three';

/** The subset of a loaded PBR material we carry over to the toon material. */
interface SourceMaterial extends Material {
  readonly color?: Color;
  readonly map?: Texture | null;
  readonly emissive?: Color;
  readonly emissiveMap?: Texture | null;
  readonly emissiveIntensity?: number;
}

export interface ToonifyOptions {
  /** Shared hard-stepped ramp from `useToonGradient()`. */
  readonly gradient: DataTexture;
  /** Per-source-material colour overrides, keyed by the GLB material name. */
  readonly overrides?: Readonly<Record<string, ColorRepresentation>>;
}

function toToon(source: Material, options: ToonifyOptions): MeshToonMaterial {
  const src = source as SourceMaterial;
  const toon = new MeshToonMaterial({
    color: src.color ? src.color.clone() : new Color('#ffffff'),
    map: src.map ?? null,
    gradientMap: options.gradient,
    transparent: source.transparent,
    opacity: source.opacity,
    side: source.side,
    alphaTest: source.alphaTest,
  });
  toon.name = source.name;
  if (src.emissive) {
    toon.emissive.copy(src.emissive);
    toon.emissiveMap = src.emissiveMap ?? null;
    toon.emissiveIntensity = src.emissiveIntensity ?? 1;
  }
  const override = options.overrides?.[source.name];
  if (override !== undefined) toon.color.set(override);
  return toon;
}

/**
 * Convert every mesh in a loaded GLB to cel-shaded `MeshToonMaterial` (preserving base
 * colour/map) and enable shadows, so kit/character models match the hand-built Costa Azul look.
 * Mutates the given object graph in place — pass a clone if the source is shared. Skinning is
 * preserved because it lives on the (skinned) mesh, not the material.
 */
export function toonifyScene(root: Object3D, options: ToonifyOptions): void {
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    const mat = obj.material as Material | Material[];
    obj.material = Array.isArray(mat) ? mat.map((m) => toToon(m, options)) : toToon(mat, options);
  });
}
