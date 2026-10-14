import '../globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { site } from '@shared/config/site';
import { themeScript } from '@shared/lib/theme';
import { MotionProvider } from '@shared/motion/MotionProvider';
import { anton, interTight } from '../fonts';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: hasLocale(routing.locales, locale) ? locale : routing.defaultLocale,
    namespace: 'Meta',
  });

  return {
    metadataBase: new URL(site.url),
    title: t('title'),
    description: t('description'),
    icons: { icon: '/favicon.svg' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: site.url,
      siteName: site.name,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Sets data-theme before the first paint; suppressHydrationWarning covers the attribute. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
