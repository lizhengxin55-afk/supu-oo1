"use client";

import { Translate } from "@phosphor-icons/react";
import { defaultLocale, getRouteKey, localizedPath, localeLabels, locales, type Locale } from "./config";

export function LanguageSwitcher({ pathname, activeLocale = defaultLocale }: { pathname: string; activeLocale?: Locale }) {
  const routeKey = getRouteKey(pathname.split("/").filter(Boolean)) ?? "home";
  return <details className="language-switcher"><summary aria-label="Choose language"><Translate size={19} weight="bold" /><span>{activeLocale.toUpperCase()}</span></summary><div>{locales.map((locale) => <a key={locale} href={localizedPath(locale, routeKey)} lang={locale} aria-current={locale === activeLocale ? "page" : undefined}>{localeLabels[locale]}</a>)}</div></details>;
}
