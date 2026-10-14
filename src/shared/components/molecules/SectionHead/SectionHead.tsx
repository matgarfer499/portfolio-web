import { Display } from '@shared/components/atoms/Display/Display';
import { sectionHeadVariants as styles } from './SectionHead.variants';

// The section title the nav links land on (`id` labels the section) and its one-line lede.
export function SectionHead({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <div className={styles.root()}>
      <Display id={id}>{title}</Display>
      {lede ? <p className={styles.lede()}>{lede}</p> : null}
    </div>
  );
}
