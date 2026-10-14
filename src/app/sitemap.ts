import type { MetadataRoute } from 'next';
import { caseSlugs } from '@features/projects';
import { routing } from '@/i18n/routing';
import { alternatesFor } from '@shared/config/seo';

// Every public page once per locale, each listing its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/cv', ...caseSlugs().map((slug) => `/projects/${slug}`)];
  return paths.flatMap((path) =>
    routing.locales.map((locale) => {
      const { canonical, languages } = alternatesFor(locale, path);
      return { url: canonical, alternates: { languages }, changeFrequency: 'monthly' as const };
    }),
  );
}
