import type { Locale } from '@/i18n/routing';

/** A string provided in every supported locale. The content source is bilingual by construction. */
export type Localized = Readonly<Record<Locale, string>>;

/** A sentence written in runs, joined with spaces when rendered. */
export type Rich = readonly Localized[];

/** A line with one highlighted (volt <mark>) run. */
export interface Highlighted {
  readonly before: Localized;
  readonly mark: Localized;
  readonly after: Localized;
}

/** An image in /public with its intrinsic size, so next/image reserves the space (no layout shift). */
export interface ImageAsset {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: Localized;
}

export interface LinkItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}
