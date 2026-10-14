import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { experience } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { Section } from '@shared/components/atoms/Section/Section';
import { SectionHead } from '@shared/components/molecules/SectionHead/SectionHead';
import { LogRow } from '../LogRow/LogRow';
import { logSectionVariants as styles } from './LogSection.variants';

export async function LogSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Log' });
  const columns = [
    t('columns.when'),
    t('columns.team'),
    t('columns.session'),
    t('columns.equipment'),
  ];
  return (
    <Section id="log" aria-labelledby="log-title">
      <Container>
        <SectionHead id="log-title" title={t('title')} lede={t('lede')} />
        <div data-log className={styles.list()}>
          <div aria-hidden className={styles.rail()}>
            <div className={styles.fill()} />
          </div>
          <div aria-hidden className={styles.columns()}>
            {columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
          {experience.map((entry) => (
            <LogRow key={entry.id} entry={entry} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
