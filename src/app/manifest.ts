import type { MetadataRoute } from 'next';
import { profile } from '@content/index';
import { site } from '@shared/config/site';
import { BRAND } from './brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${profile.role.en}`,
    short_name: site.name,
    start_url: '/',
    display: 'browser',
    background_color: BRAND.darkPaper,
    theme_color: BRAND.darkPaper,
    icons: [192, 512].map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    })),
  };
}
