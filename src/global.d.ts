import type { routing } from '@/i18n/routing';
import type messages from '@/messages/en.json';

// Make next-intl fully type-safe: locales and message keys are checked at compile time.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing)['locales'][number];
    Messages: typeof messages;
  }
}
