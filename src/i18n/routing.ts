import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'ja', 'de', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false
});

export type AppLocale = (typeof routing.locales)[number];

