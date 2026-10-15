import type { MetadataRoute } from 'next';
import { caseSlugs } from '@features/projects';
import { routing } from '@/i18n/routing';
import { alternatesFor } from '@shared/config/seo';

// Every public page, at its canonical URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/cv', ...caseSlugs().map((slug) => `/projects/${slug}`)];
  return paths.map((path) => ({
    url: alternatesFor(routing.defaultLocale, path).canonical,
    changeFrequency: 'monthly' as const,
  }));
}
