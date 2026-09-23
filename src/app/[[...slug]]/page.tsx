import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { App } from "../../App";
import { LocalizedPage } from "../../i18n/LocalizedPage";
import { defaultLocale, getRouteKey, getRoutePath, getSeoMetadata, isLocale, locales, routeKeys } from "../../i18n/config";

type PageProps = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const params = routeKeys.map((routeKey) => ({ slug: getRoutePath(routeKey).split("/").filter(Boolean) }));
  locales.filter((locale) => locale !== defaultLocale).forEach((locale) => {
    routeKeys.forEach((routeKey) => params.push({ slug: [locale, ...getRoutePath(routeKey).split("/").filter(Boolean)] }));
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const locale = isLocale(slug[0]) ? slug[0] : defaultLocale;
  const routeKey = getRouteKey(isLocale(slug[0]) ? slug.slice(1) : slug);
  if (!routeKey) return {};
  return getSeoMetadata(locale, routeKey);
}

export default async function SitePage({ params }: PageProps) {
  const { slug = [] } = await params;
  const locale = isLocale(slug[0]) ? slug[0] : defaultLocale;
  const routeKey = getRouteKey(isLocale(slug[0]) ? slug.slice(1) : slug);
  if (!routeKey) notFound();
  const path = getRoutePath(routeKey);

  if (locale === defaultLocale) return <App pathname={path} />;
  return <LocalizedPage locale={locale} routeKey={routeKey} />;
}
