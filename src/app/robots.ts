import type { MetadataRoute } from 'next';
import { site } from '@shared/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/styleguide', '/es/styleguide'] },
    sitemap: new URL('/sitemap.xml', site.url).toString(),
  };
}
