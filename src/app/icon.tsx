import { markImage } from './og';

export const contentType = 'image/png';

// /icon/32 for the tab, /icon/192 and /icon/512 for the manifest.
export function generateImageMetadata() {
  return [32, 192, 512].map((size) => ({
    id: String(size),
    size: { width: size, height: size },
    contentType,
  }));
}

export default async function Icon({ id }: { id: Promise<string> }) {
  return markImage(Number(await id));
}
