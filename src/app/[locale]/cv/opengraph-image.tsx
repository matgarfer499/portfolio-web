import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { profile } from '@content/index';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../../og';

export const alt = `CV — ${site.name}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

// The CV page sets its own openGraph, which drops the inherited image: it gets its own poster.
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ImageResponse> {
  const requested = (await params).locale;
  if (!hasLocale(routing.locales, requested)) notFound();
  const locale = requested;
  const t = await getTranslations({ locale, namespace: 'Cv' });
  return posterImage({ kicker: t('title'), title: profile.name, foot: `${site.shortName}/cv` });
}
