import type { Locale } from '@/i18n/routing';
import { localize, resolve, type PendingRecord } from '@content/index';
import { Label } from '@shared/components/atoms/Label/Label';
import { Placeholder } from '@shared/components/atoms/Placeholder/Placeholder';
import { pendingRecordCardVariants as styles } from './PendingRecordCard.variants';

// The next record is the owner's to fill: every gap renders as a dashed placeholder.
export function PendingRecordCard({ record, locale }: { record: PendingRecord; locale: Locale }) {
  const metric = resolve(record.metric, locale);
  const note = resolve(record.note, locale);
  return (
    <article className={styles.root()}>
      <Label>{localize(record.label, locale)}</Label>
      {metric.kind === 'pending' ? (
        <Placeholder note={metric.note} size="poster" tone="night" />
      ) : (
        <span>{metric.text}</span>
      )}
      <p className={styles.note()}>
        {note.kind === 'pending' ? <Placeholder note={note.note} tone="night" /> : note.text}
      </p>
    </article>
  );
}
