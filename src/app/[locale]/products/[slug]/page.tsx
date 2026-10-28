import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {getProductBySlug, productSlugs, products} from '@/lib/products';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {getRopeContent} from '@/lib/rope-content';
import {routing, type AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return routing.locales.flatMap((locale) => productSlugs.map((slug) => ({locale, slug}))); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const product = getProductBySlug(slug); if (!product) return {};
  const t = getRopeContent(locale).products[product.key]; const path = `/products/${slug}`;
  return {title:`${t.title} | GEELUNG`,description:t.description,keywords:t.keywords.split(','),alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)},openGraph:{title:`${t.title} | GEELUNG`,description:t.description,url:absoluteUrl(locale,path),images:[product.image]}};
}

export default async function ProductPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const product = getProductBySlug(slug); if (!product) notFound();
  const copy = getRopeContent(locale); const t = copy.products[product.key]; const common = copy.productPage; const path = `/products/${slug}`;
  const schema = {'@context':'https://schema.org','@type':'Product',name:t.title,description:t.description,image:absoluteUrl(locale,product.image),brand:{'@type':'Brand',name:'GEELUNG'},url:absoluteUrl(locale,path)};
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const supportDetails = copy.home.applicationDetails ?? [copy.home.applicationText, copy.home.applicationText, copy.home.applicationText];
  return <><Header /><main><section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{common.back}</Link> / {t.title}</p><h1>{t.title}</h1><p className="lead">{t.description}</p></div></section><section className="container product-detail"><img src={product.image} alt={t.title} /><div><p className="eyebrow">GEELUNG · OEM / ODM</p><h2>{common.specifications}</h2><p className="lead">{t.introduction}</p><ul className="spec-list">{common.specs.map((spec)=><li key={spec}>{spec}</li>)}</ul><p className="product-note">{locale === 'zh' ? '最终产品规格、卷装方式与出口包装将以确认后的订单需求为准。' : 'Final specifications, roll format and export packing are confirmed against the agreed order requirement.'}</p><Link className="button" href="/inquiry">{common.request}</Link></div></section><section className="section section-soft"><div className="container"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 订单支持' : 'GEELUNG · ORDER SUPPORT'}</p><h2>{locale === 'zh' ? '从规格沟通到出货对接' : 'From specification discussion to shipment coordination'}</h2><div className="applications">{copy.home.applications.map((item, index) => <article className="application" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{supportDetails[index]}</p></article>)}</div></div></section><section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 相关产品' : 'GEELUNG · RELATED PRODUCTS'}</p><h2>{locale === 'zh' ? '相关绳类产品' : 'Related rope products'}</h2></div><Link className="text-link" href="/products">{common.back} <span aria-hidden>→</span></Link></div><div className="product-grid related-products">{relatedProducts.map((item, index) => { const related = copy.products[item.key]; return <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}><span className="product-number">0{index + 1}</span><img src={item.image} alt={related.title} /><h3>{related.title}</h3><p>{related.description}</p><span className="card-link">{common.request} <span aria-hidden>→</span></span></Link>; })}</div></div></section></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}

