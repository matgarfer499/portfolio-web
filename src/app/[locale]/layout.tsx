import '../globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import { site } from '@shared/config/site';
import { themeScript } from '@shared/lib/theme';
import { BRAND } from '../brand';
import { anton, interTight } from '../fonts';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// The browser chrome matches the page in each colour scheme (data-theme overrides aren't visible here).
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: BRAND.paper },
    { media: '(prefers-color-scheme: dark)', color: BRAND.darkPaper },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Only the base URL: each page returns its own pageMeta(), and the 404 renders its own <title>,
// so it never claims to be the home page.
export const metadata: Metadata = { metadataBase: new URL(site.url) };

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
        {children}
        {site.onVercel && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
