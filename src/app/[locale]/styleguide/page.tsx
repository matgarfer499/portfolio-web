import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { site } from '@shared/config/site';
import { Styleguide } from './_components/Styleguide/Styleguide';

export const metadata: Metadata = { title: 'Styleguide', robots: { index: false } };

// Dev-only QA surface for the design system: production answers 404.
export default async function StyleguidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (site.isProduction || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <Styleguide />;
}
