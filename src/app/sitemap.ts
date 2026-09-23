import type { MetadataRoute } from "next";
import { defaultLocale, getRoutePath, locales, routeKeys, siteUrl } from "../i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  return locales.flatMap((locale) => routeKeys.map((routeKey) => ({ url: `${siteUrl}${locale === defaultLocale ? "" : `/${locale}`}${getRoutePath(routeKey) === "/" ? "" : getRoutePath(routeKey)}`, lastModified: updatedAt, changeFrequency: routeKey.includes("blog") ? "monthly" : "weekly", priority: routeKey === "home" ? 1 : routeKey === "product" ? 0.9 : 0.7 })));
}
