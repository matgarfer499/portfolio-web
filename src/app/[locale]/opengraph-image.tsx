import { hasLocale } from 'next-intl';
import type { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { localize, profile } from '@content/index';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../og';

// Static per route (one alt for both locales): name and role, from content.
export const alt = `${site.name} — ${profile.role.en}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ImageResponse> {
  const requested = (await params).locale;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale = requested;
  return posterImage({
    kicker: localize(profile.role, locale),
    title: profile.name,
    foot: `${site.shortName} · ${localize(profile.location, locale)}`,
  });
}
