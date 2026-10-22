'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {languageLabels} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="language-switcher">
      <span className="sr-only">Select language</span>
      <select
        value={locale}
        onChange={(event) => router.replace(pathname, {locale: event.target.value as AppLocale})}
      >
        {Object.entries(languageLabels).map(([code, label]) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </label>
  );
}

