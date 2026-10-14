import type { Localized } from './types';

export const contact = {
  headline: [
    { en: "Let's build it", es: 'Vamos a construirlo' },
    { en: 'end to end', es: 'de principio a fin' },
  ],
} as const satisfies { readonly headline: readonly Localized[] };
