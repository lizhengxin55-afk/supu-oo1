import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {getProductBySlug, productSlugs, products} from '@/lib/products';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {getRopeContent} from '@/lib/rope-content';
import {getEnglishProductSeo} from '@/lib/english-seo';
import {routing, type AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return routing.locales.flatMap((locale) => productSlugs.map((slug) => ({locale, slug}))); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const product = getProductBySlug(slug); if (!product) return {};
  const t = getRopeContent(locale).products[product.key]; const englishSeo = locale === 'en' ? getEnglishProductSeo(slug) : undefined; const path = `/products/${slug}`;
  const title = englishSeo?.metaTitle ?? `${t.title} | GEELUNG`; const description = englishSeo?.metaDescription ?? t.description; const keywords = englishSeo ? [...englishSeo.keywords] : t.keywords.split(',');
  return {title, description, keywords, alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)},openGraph:{title,description,url:absoluteUrl(locale,path),type:'website',images:[{url:product.image,alt:englishSeo?.imageAlt ?? product.imageAlt}]}};
}

export default async function ProductPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const product = getProductBySlug(slug); if (!product) notFound();
  const copy = getRopeContent(locale); const t = copy.products[product.key]; const common = copy.productPage; const path = `/products/${slug}`; const englishSeo = locale === 'en' ? getEnglishProductSeo(slug) : undefined;
  const productSchema = {'@context':'https://schema.org','@type':'Product',name:englishSeo?.h1 ?? t.title,description:englishSeo?.metaDescription ?? t.description,image:absoluteUrl(locale,product.image),brand:{'@type':'Brand',name:'GEELUNG'},url:absoluteUrl(locale,path)};
  const schema = englishSeo ? {'@context':'https://schema.org','@graph':[productSchema,{'@type':'FAQPage','mainEntity':englishSeo.details.slice(0, 3).map(([question, answer]) => ({'@type':'Question',name:question,'acceptedAnswer':{'@type':'Answer',text:answer}}))}]} : productSchema;
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const supportDetails = copy.home.applicationDetails ?? [copy.home.applicationText, copy.home.applicationText, copy.home.applicationText];
  const pageTitle = englishSeo?.h1 ?? t.title;
  return <><Header /><main>
    <section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{common.back}</Link> / {pageTitle}</p><h1>{pageTitle}</h1><p className="lead">{englishSeo?.metaDescription ?? t.description}</p></div></section>
    <section className="container product-detail"><img src={product.image} alt={englishSeo?.imageAlt ?? (locale === 'en' ? product.imageAlt : t.title)} width={product.width} height={product.height} /><div><p className="eyebrow">GEELUNG · OEM / ODM</p><h2>{englishSeo ? 'Material, specification & order support' : common.specifications}</h2><p className="lead">{englishSeo?.summary ?? t.introduction}</p><ul className="spec-list">{englishSeo ? englishSeo.details.map(([label, value]) => <li key={label}><strong>{label}: </strong>{value}</li>) : common.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul><p className="product-note">{locale === 'zh' ? '最终产品规格、卷装方式与出口包装将以确认后的订单需求为准。' : 'Final specifications, material selection, roll format and export packing are confirmed against the agreed order requirement.'}</p>{englishSeo && <Link className="text-link product-guide-link" href={englishSeo.guide.href}>{englishSeo.guide.label} <span aria-hidden>→</span></Link>}<Link className="button" href="/inquiry">{common.request}</Link></div></section>
    <section className="section section-soft"><div className="container"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 订单支持' : 'GEELUNG · ORDER SUPPORT'}</p><h2>{locale === 'zh' ? '从规格沟通到出货对接' : 'From specification discussion to shipment coordination'}</h2><div className="applications">{copy.home.applications.map((item, index) => <article className="application" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{supportDetails[index]}</p></article>)}</div></div></section>
    {englishSeo && <section className="section"><div className="container"><p className="eyebrow">GEELUNG · BUYER FAQ</p><h2>Questions to confirm before ordering</h2><div className="faq-list">{englishSeo.details.slice(0, 6).map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div><Link className="button" href="/inquiry">Request a technical quotation</Link></div></section>}
    <section className="section section-soft"><div className="container"><div className="section-head"><div><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 相关产品' : 'GEELUNG · RELATED PRODUCTS'}</p><h2>{locale === 'zh' ? '相关绳类产品' : 'Related rope products'}</h2></div><Link className="text-link" href="/products">{common.back} <span aria-hidden>→</span></Link></div><div className="product-grid related-products">{relatedProducts.map((item, index) => { const related = copy.products[item.key]; return <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}><span className="product-number">0{index + 1}</span><img src={item.image} alt={locale === 'en' ? item.imageAlt : related.title} width={item.width} height={item.height} loading="lazy" /><h3>{related.title}</h3><p>{related.description}</p><span className="card-link">{common.request} <span aria-hidden>→</span></span></Link>; })}</div></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
