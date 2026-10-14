import type { Locale } from '@/i18n/routing';

/** A string provided in every supported locale. The content source is bilingual by construction. */
export type Localized = Readonly<Record<Locale, string>>;

/** A fact the owner still has to supply: rendered as a dashed placeholder, listed by content:pending. */
export interface Pending {
  readonly kind: 'pending';
  readonly note: Localized;
}

export type Maybe<T> = T | Pending;

/** A sentence that may carry an inline gap: "Tech lead of my team. [Products you lead…]". */
export type Rich = readonly Maybe<Localized>[];

/** A line with one highlighted (volt <mark>) run. */
export interface Highlighted {
  readonly before: Localized;
  readonly mark: Localized;
  readonly after: Localized;
}

export type Resolved = { kind: 'text'; text: string } | { kind: 'pending'; note: string };

export function pending(note: Localized): Pending {
  return { kind: 'pending', note };
}

export function isPending(value: unknown): value is Pending {
  return typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'pending';
}

export function resolve(value: Maybe<Localized>, locale: Locale): Resolved {
  return isPending(value)
    ? { kind: 'pending', note: value.note[locale] }
    : { kind: 'text', text: value[locale] };
}

export function resolveRich(parts: Rich, locale: Locale): Resolved[] {
  return parts.map((part) => resolve(part, locale));
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
