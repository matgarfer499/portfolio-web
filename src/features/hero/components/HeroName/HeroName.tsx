import { Fragment, type CSSProperties } from 'react';
import { Display } from '@shared/components/atoms/Display/Display';
import { heroNameVariants as styles } from './HeroName.variants';

// Screen readers and copy-paste get the plain name; the per-letter spans are visual only.
export function HeroName({ name }: { name: string }) {
  let index = 0;
  return (
    <Display as="h1" size="hero" className={styles.root()}>
      <span className="sr-only">{name}</span>
      <span aria-hidden>
        {name.split(' ').map((word, w) => (
          <Fragment key={word}>
            {w > 0 && ' '}
            <span className={styles.word()}>
              {[...word].map((char) => (
                <span key={index} className={styles.clip()}>
                  <span className={styles.letter()} style={{ '--i': index++ } as CSSProperties}>
                    {char}
                  </span>
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </Display>
  );
}
