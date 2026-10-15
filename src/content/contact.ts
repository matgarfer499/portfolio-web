import type { Localized } from './types';

export const contact = {
  headline: [{ en: "Let's build it" }, { en: 'end to end' }],
} as const satisfies { readonly headline: readonly Localized[] };
