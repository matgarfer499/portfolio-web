import type { MetadataRoute } from 'next';
import { site } from '@shared/config/site';
import { BRAND } from './brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Tech Lead · Full Stack Developer`,
    short_name: site.name,
    start_url: '/',
    display: 'browser',
    background_color: BRAND.paper,
    theme_color: BRAND.paper,
    icons: [192, 512].map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    })),
  };
}
