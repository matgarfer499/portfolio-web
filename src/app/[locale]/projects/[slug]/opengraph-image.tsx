import { hasLocale } from 'next-intl';
import { caseOg, caseSlugs } from '@features/projects';
import { routing } from '@/i18n/routing';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../../../og';

export const alt = `Case study — ${site.name}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseSlugs().map((slug) => ({ locale, slug })));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: requested, slug } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const { title, kicker } = caseOg(slug, locale);
  return posterImage({ kicker, title, foot: `${site.shortName} · ${site.name}` });
}
