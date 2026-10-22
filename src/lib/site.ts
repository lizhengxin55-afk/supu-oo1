import type {AppLocale} from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.geelung.com';
export const BRAND_NAME = 'JILONG TECHNOLOGY';

export const languageLabels: Record<AppLocale, string> = {
  en: '🇬🇧 English',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
  ja: '🇯🇵 日本語',
  de: '🇩🇪 Deutsch',
  zh: '🇨🇳 中文'
};

export const hreflangCodes: Record<AppLocale, string> = {
  en: 'en-GB',
  fr: 'fr-FR',
  es: 'es-ES',
  ja: 'ja-JP',
  de: 'de-DE',
  zh: 'zh-CN'
};

export function localizedPath(locale: AppLocale, pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname;
  return locale === 'en' ? normalizedPath || '/' : `/${locale}${normalizedPath}`;
}

export function absoluteUrl(locale: AppLocale, pathname: string) {
  return new URL(localizedPath(locale, pathname), SITE_URL).toString();
}

export function languageAlternates(pathname: string) {
  return {
    'en-GB': absoluteUrl('en', pathname),
    'fr-FR': absoluteUrl('fr', pathname),
    'es-ES': absoluteUrl('es', pathname),
    'ja-JP': absoluteUrl('ja', pathname),
    'de-DE': absoluteUrl('de', pathname),
    'zh-CN': absoluteUrl('zh', pathname),
    'x-default': absoluteUrl('en', pathname)
  };
}

