import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {productSlugs} from '@/lib/products';
import {absoluteUrl, languageAlternates} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/resources', '/contact', ...productSlugs.map((slug) => `/products/${slug}`)];
  return routing.locales.flatMap((locale) => paths.map((path) => ({
    url: absoluteUrl(locale, path), lastModified: new Date(), changeFrequency: path === '/' ? 'weekly' : 'monthly', priority: path === '/' ? 1 : 0.8,
    alternates: {languages: languageAlternates(path)}
  })));
}

