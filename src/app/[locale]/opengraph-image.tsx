import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { localize, profile } from '@content/index';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../og';

export const alt = `${site.name} — Tech Lead · Full Stack Developer`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return posterImage({
    kicker: localize(profile.role, locale),
    title: profile.name,
    foot: `${site.shortName} · ${localize(profile.location, locale)}`,
  });
}
