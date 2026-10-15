import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { localizedPath } from '@/i18n/paths';
import type { Locale } from '@/i18n/routing';
import { localize, resolve, type HighlightRecord } from '@content/index';
import { Icon } from '@shared/components/atoms/Icon/Icon';
import { Label } from '@shared/components/atoms/Label/Label';
import { Placeholder } from '@shared/components/atoms/Placeholder/Placeholder';
import { highlightRecordCardVariants as styles } from './HighlightRecordCard.variants';

// The volt card that closes the board: one headline result and a link to its case study.
// A gap the owner hasn't filled still renders as a dashed placeholder.
export async function HighlightRecordCard({
  record,
  locale,
}: {
  record: HighlightRecord;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: 'Records' });
  const metric = resolve(record.metric, locale);
  const note = resolve(record.note, locale);
  return (
    <article className={styles.root()}>
      <Label>{localize(record.label, locale)}</Label>
      {metric.kind === 'pending' ? (
        <Placeholder note={metric.note} size="poster" />
      ) : (
        <span className={styles.metric()}>{metric.text}</span>
      )}
      <p className={styles.note()}>
        {note.kind === 'pending' ? <Placeholder note={note.note} /> : note.text}
      </p>
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
