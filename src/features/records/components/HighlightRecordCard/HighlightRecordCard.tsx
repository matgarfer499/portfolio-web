import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { localize, type HighlightRecord } from '@content/index';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { highlightRecordCardVariants as styles } from './HighlightRecordCard.variants';

// The volt card that closes the board: one headline result and a link to its case study.
export async function HighlightRecordCard({
  record,
  locale,
}: {
  record: HighlightRecord;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: 'Records' });
  return (
    <article className={styles.root()}>
      <Label>{localize(record.label, locale)}</Label>
      <span className={styles.metric()}>{localize(record.metric, locale)}</span>
      <p className={styles.note()}>{localize(record.note, locale)}</p>
      {record.caseSlug ? (
        <Link
          href={localizedPath(locale, `/projects/${record.caseSlug}`)}
          transitionTypes={['nav-forward']}
          className={styles.link()}
        >
          {t('readCase')}
          <Icon name="arrow-right" />
        </Link>
      ) : null}
    </article>
  );
}
