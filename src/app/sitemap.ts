import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {productSlugs} from '@/lib/products';
import {blogPosts} from '@/lib/blog';
import {absoluteUrl, languageAlternates} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/videos', '/products', '/resources', '/contact', ...productSlugs.map((slug) => `/products/${slug}`)];
  const localizedPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => paths.map((path) => ({
    url: absoluteUrl(locale, path), lastModified: new Date(), changeFrequency: path === '/' ? 'weekly' as const : 'monthly' as const, priority: path === '/' ? 1 : 0.8,
    alternates: {languages: languageAlternates(path)}
  })));
  const localizedBlogPages: MetadataRoute.Sitemap = routing.locales.flatMap((locale) => ['/blog', '/sitemap', ...blogPosts.map((post) => `/blog/${post.slug}`)].map((path) => ({
    url: absoluteUrl(locale, path), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: path === '/blog' ? 0.7 : 0.6,
    alternates: {languages: languageAlternates(path)}
  })));
  return [...localizedPages, ...localizedBlogPages];
}
