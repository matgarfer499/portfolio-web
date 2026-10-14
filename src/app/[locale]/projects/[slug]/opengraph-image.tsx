import type { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { caseOg, caseSlugs, findCase } from '@features/projects';
import { routing, toLocale } from '@/i18n/routing';
import { site } from '@shared/config/site';
import { OG_SIZE, posterImage } from '../../../og';

export const alt = `Case study — ${site.name}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams(): { locale: string; slug: string }[] {
  return routing.locales.flatMap((locale) => caseSlugs().map((slug) => ({ locale, slug })));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<ImageResponse> {
  const { locale, slug } = await params;
  const study = findCase(slug);
  if (!study) notFound();
  const { title, kicker } = caseOg(study, toLocale(locale));
  return posterImage({ kicker, title, foot: `${site.shortName} · ${site.name}` });
}
