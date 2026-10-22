import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {getProductBySlug, productSlugs} from '@/lib/products';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {routing, type AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return routing.locales.flatMap((locale) => productSlugs.map((slug) => ({locale, slug}))); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const product = getProductBySlug(slug); if (!product) return {};
  const t = await getTranslations({locale, namespace: `products.${product.key}`}); const path = `/products/${slug}`;
  return {title: t('title'), description: t('description'), keywords: t('keywords').split(','), alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)}, openGraph:{title:t('title'),description:t('description'),url:absoluteUrl(locale,path),images:[product.image]}};
}

export default async function ProductPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const product = getProductBySlug(slug); if (!product) notFound();
  const t = await getTranslations({locale, namespace: `products.${product.key}`}); const common = await getTranslations('productPage'); const path = `/products/${slug}`;
  const schema = {'@context':'https://schema.org','@type':'Product',name:t('title'),description:t('description'),image:absoluteUrl(locale,product.image),brand:{'@type':'Brand',name:'JILONG TECHNOLOGY'},url:absoluteUrl(locale,path)};
  return <><Header /><main><section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">JILONG TECHNOLOGY</Link> / {common('back')}</p><h1>{t('title')}</h1><p className="lead">{t('description')}</p></div></section><section className="container product-detail"><img src={product.image} alt={t('title')} /><div><p className="eyebrow">JILONG TECHNOLOGY</p><h2>{common('specifications')}</h2><p className="lead">{t('introduction')}</p><ul className="spec-list"><li>{common('specOne')}</li><li>{common('specTwo')}</li><li>{common('specThree')}</li></ul><Link className="button" href="/inquiry">{common('request')}</Link></div></section></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}

