import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Footer, Header, SkipLink } from '@features/shell';
import { Trophies } from '@features/trophies';
import type { Locale } from '@/i18n/routing';

// The shell every page shares: skip link, header with the trophy counter, main, footer. The app
// layer composes it because shell may not import trophies (and the styleguide has no shell).
export async function PageChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}): Promise<ReactNode> {
  const t = await getTranslations({ locale, namespace: 'Shell' });
  return (
    <>
      <SkipLink label={t('skip')} />
      <Header locale={locale} trophies={<Trophies locale={locale} />} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
