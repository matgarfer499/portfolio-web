import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localize, records } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { Section } from '@shared/components/atoms/Section/Section';
import { SectionHead } from '@shared/components/molecules/SectionHead/SectionHead';
import { HighlightRecordCard } from '../HighlightRecordCard/HighlightRecordCard';
import { RecordCard } from '../RecordCard/RecordCard';
import { RecordsMotion } from '../RecordsMotion/RecordsMotion';

export async function RecordsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Records' });
  return (
    <Section id="records" tone="night" aria-labelledby="records-title">
      <Container>
        <SectionHead id="records-title" title={t('title')} lede={localize(records.lede, locale)} />
        <RecordsMotion locale={locale}>
          {records.items.map((record) => (
            <RecordCard key={record.id} record={record} locale={locale} />
          ))}
          <HighlightRecordCard record={records.highlight} locale={locale} />
        </RecordsMotion>
      </Container>
    </Section>
  );
}
