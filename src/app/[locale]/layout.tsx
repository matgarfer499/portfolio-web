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
import { BRAND } from '../brand';
import { anton, interTight } from '../fonts';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// The site is dark only: the browser chrome matches the page.
export const viewport: Viewport = { themeColor: BRAND.darkPaper, colorScheme: 'dark' };

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
      // Next scrolls instantly on route changes (smooth stays for in-page anchors), so "back"
      // lands on the project instead of gliding down from the top.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
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
