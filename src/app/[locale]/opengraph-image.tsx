import type { ImageResponse } from 'next/og';
import { routing, toLocale } from '@/i18n/routing';
import { localize, profile } from '@content/index';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../og';

export const alt = `${site.name} — Tech Lead · Full Stack Developer`;
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
  const locale = toLocale((await params).locale);
  return posterImage({
    kicker: localize(profile.role, locale),
    title: profile.name,
    foot: `${site.shortName} · ${localize(profile.location, locale)}`,
  });
}
