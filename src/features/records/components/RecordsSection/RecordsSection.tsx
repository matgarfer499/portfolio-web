import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localize, records } from '@content/index';
import { Container } from '@shared/components/atoms/Container/Container';
import { Section } from '@shared/components/atoms/Section/Section';
import { SectionHead } from '@shared/components/molecules/SectionHead/SectionHead';
import { PendingRecordCard } from '../PendingRecordCard/PendingRecordCard';
import { RecordCard } from '../RecordCard/RecordCard';
import { RecordsMotion } from '../RecordsMotion/RecordsMotion';
import { recordsSectionVariants as styles } from './RecordsSection.variants';

export async function RecordsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Records' });
  return (
    <Section id="records" tone="night" aria-labelledby="records-title">
      <Container>
        <SectionHead id="records-title" title={t('title')} lede={localize(records.lede, locale)} />
        <RecordsMotion locale={locale} className={styles.board()}>
          {records.items.map((record) => (
            <RecordCard key={record.id} record={record} locale={locale} />
          ))}
          <PendingRecordCard record={records.next} locale={locale} />
        </RecordsMotion>
      </Container>
    </Section>
  );
}
