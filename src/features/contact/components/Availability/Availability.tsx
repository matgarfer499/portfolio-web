import { availabilityVariants as styles } from './Availability.variants';

export function Availability({ open, label }: { open: boolean; label: string }) {
  return (
    <p className={styles.root()}>
      <span aria-hidden className={styles.dot({ open })}>
        {open ? <span className={styles.pulse()} /> : null}
      </span>
      {label}
    </p>
  );
}
