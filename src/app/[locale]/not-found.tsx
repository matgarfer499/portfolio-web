import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { localizedPath } from '@/i18n/paths';
import { toLocale } from '@/i18n/routing';
import { buttonVariants } from '@shared/components/atoms/Button/Button.variants';
import { Container } from '@shared/components/atoms/Container/Container';
import { Display } from '@shared/components/atoms/Display/Display';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Section } from '@shared/components/atoms/Section/Section';
import { PageChrome } from './_components/PageChrome';

// not-found gets no params: the locale comes from the request (set by the proxy).
export default async function NotFound(): Promise<ReactNode> {
  const locale = toLocale(await getLocale());
  const t = await getTranslations({ locale, namespace: 'NotFound' });

  return (
    <PageChrome locale={locale}>
      <main id="main">
        <Section>
          <Container>
            <Display as="h1" size="poster">
              {t('title')}
            </Display>
            <p className="mt-6 mb-10 text-[1.125rem]">{t('body')}</p>
            <Link href={localizedPath(locale, '/')} className={buttonVariants({ variant: 'dark' })}>
              <Icon name="arrow-left" />
              {t('home')}
            </Link>
          </Container>
        </Section>
      </main>
    </PageChrome>
  );
}
