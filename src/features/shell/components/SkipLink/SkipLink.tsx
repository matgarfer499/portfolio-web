import { skipLinkVariants } from './SkipLink.variants';

export function SkipLink({ label }: { label: string }) {
  return (
    <a href="#main" className={skipLinkVariants()}>
      {label}
    </a>
  );
}
