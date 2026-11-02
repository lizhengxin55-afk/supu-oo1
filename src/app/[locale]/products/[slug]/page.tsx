import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
import {getProductBySlug, productSlugs, products} from '@/lib/products';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {getRopeContent} from '@/lib/rope-content';
import {getEnglishProductSeo} from '@/lib/english-seo';
import {getStaticProductCopy} from '@/lib/static-product-copy';
import {routing, type AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return routing.locales.flatMap((locale) => productSlugs.map((slug) => ({locale, slug}))); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const product = getProductBySlug(slug); if (!product) return {};
  const t = getRopeContent(locale).products[product.key]; const englishSeo = locale === 'en' ? getEnglishProductSeo(slug) : undefined; const isStaticProduct = Boolean(getEnglishProductSeo(slug)); const path = `/products/${slug}`;
  const title = englishSeo?.metaTitle ?? `${t.title} | GEELUNG`; const description = englishSeo?.metaDescription ?? t.description; const keywords = englishSeo ? [...englishSeo.keywords] : t.keywords.split(',');
  const openGraph = {title, description, url:absoluteUrl(locale,path), type:'website' as const, ...(isStaticProduct ? {} : {images:[{url:product.image,alt:product.imageAlt}]})};
  return {title, description, keywords, alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)},openGraph};
}

function StaticProductPage({locale, slug, product}: {locale: AppLocale; slug: string; product: NonNullable<ReturnType<typeof getProductBySlug>>}) {
  const englishSeo = getEnglishProductSeo(slug); if (!englishSeo) notFound();
  const local = getRopeContent(locale).products[product.key];
  const copy = getStaticProductCopy(locale);
  const h1 = locale === 'en' ? englishSeo.h1 : local.title;
  const summary = locale === 'en' ? englishSeo.summary : local.introduction;
  const imageAlt = locale === 'en' ? englishSeo.imageAlt : local.title;
  const details = copy.detailLabels.map((label, index) => [label, copy.detailText[index]] as [string, string]);
  const path = `/products/${slug}`;
  const productSchema = {'@context':'https://schema.org','@type':'Product',name:h1,description:summary,brand:{'@type':'Brand',name:'GEELUNG'},url:absoluteUrl(locale,path)};
  const faqSchema = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':details.slice(0, 4).map(([label, answer]) => ({'@type':'Question',name:label,'acceptedAnswer':{'@type':'Answer',text:answer}}))};
  return <><Header /><main className="static-page product-static-page">
    <section className="static-hero product-static-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{getRopeContent(locale).productPage.back}</Link> / {h1}</p><p className="eyebrow">{copy.eyebrow}</p><h1>{h1}</h1><p className="lead">{summary}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><a className="button button-secondary" href="#specification">{copy.viewSpecification}</a></div><dl className="hero-facts"><div><dt>{copy.orderModel}</dt><dd>OEM / ODM</dd></div><div><dt>{copy.supplyFormat}</dt><dd>Roll / spool / pallet</dd></div><div><dt>{copy.samples}</dt><dd>{copy.samples}</dd></div></dl></div><MediaPlaceholder kind="Image" title={`${h1} main product image`} alt={imageAlt} note="Replace with a 1600 × 1100 product image on a clean industrial background." className="hero-media-placeholder" /></div></section>

    <nav className="product-anchor-nav" aria-label="Product page sections"><div className="static-shell"><a href="#specification">{copy.viewSpecification}</a><a href="#media">Video</a><a href="#applications">{copy.sectionLabels.application}</a><a href="#faq">{copy.sectionLabels.faq}</a><Link href="/inquiry">RFQ</Link></div></nav>

    <section id="specification" className="static-section"><div className="static-shell split-spec"><div><p className="eyebrow">{copy.sectionLabels.profile}</p><h2>{copy.profileTitle}</h2><p className="section-intro">{copy.profileIntro}</p><div className="specification-list">{details.map(([label, value], index) => <article key={label}><span>0{index + 1}</span><div><h3>{label}</h3><p>{value}</p></div></article>)}</div></div><aside className="spec-aside"><MediaPlaceholder kind="Image" title="Product detail / cross-section" alt={`${imageAlt} detail view`} note="Replace with a macro product image, dimension drawing or packaging view." /><div className="upload-note"><strong>Media replacement note</strong><p>{copy.mediaNote}</p></div></aside></div></section>

    <section id="media" className="static-section static-section-navy"><div className="static-shell media-feature"><div><p className="eyebrow">{copy.sectionLabels.media}</p><h2>{copy.videoTitle}</h2><p>{copy.videoText}</p><Link className="text-link text-link-light" href="/inquiry">{copy.quote} <span aria-hidden>→</span></Link></div><MediaPlaceholder kind="Video" title={`${h1} product and packing video`} alt={`${h1} production and export packing video`} note="Replace with a 16:9 MP4 or embedded product demonstration video." /></div></section>

    <section id="applications" className="static-section"><div className="static-shell"><p className="eyebrow">{copy.sectionLabels.application}</p><div className="section-heading-row"><div><h2>{copy.applicationTitle}</h2><p className="section-intro">{copy.applicationText}</p></div><Link className="button" href="/inquiry">RFQ</Link></div><div className="procurement-grid">{copy.process.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{copy.processText[index]}</p></article>)}</div></div></section>

    <section id="faq" className="static-section static-section-soft"><div className="static-shell"><p className="eyebrow">{copy.sectionLabels.faq}</p><h2>{copy.faqTitle}</h2><div className="faq-list static-faq-list">{details.slice(0, 6).map(([label, answer]) => <article key={label}><h3>{label}</h3><p>{answer}</p></article>)}</div><div className="static-cta-row"><Link className="button" href="/inquiry">{copy.quote}</Link></div></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([productSchema, faqSchema])}} /></>;
}

export default async function ProductPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const product = getProductBySlug(slug); if (!product) notFound();
  if (getEnglishProductSeo(slug)) return <StaticProductPage locale={locale} slug={slug} product={product} />;
  const copy = getRopeContent(locale); const t = copy.products[product.key]; const common = copy.productPage; const path = `/products/${slug}`;
  const schema = {'@context':'https://schema.org','@type':'Product',name:t.title,description:t.description,image:absoluteUrl(locale,product.image),brand:{'@type':'Brand',name:'GEELUNG'},url:absoluteUrl(locale,path)};
  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const supportDetails = copy.home.applicationDetails ?? [copy.home.applicationText, copy.home.applicationText, copy.home.applicationText];
  return <><Header /><main><section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{common.back}</Link> / {t.title}</p><h1>{t.title}</h1><p className="lead">{t.description}</p></div></section><section className="container product-detail"><img src={product.image} alt={locale === 'en' ? product.imageAlt : t.title} width={product.width} height={product.height} /><div><p className="eyebrow">GEELUNG · OEM / ODM</p><h2>{common.specifications}</h2><p className="lead">{t.introduction}</p><ul className="spec-list">{common.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul><p className="product-note">{locale === 'zh' ? '最终产品规格、卷装方式与出口包装将以确认后的订单需求为准。' : 'Final specifications, roll format and export packing are confirmed against the agreed order requirement.'}</p><Link className="button" href="/inquiry">{common.request}</Link></div></section><section className="section section-soft"><div className="container"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 订单支持' : 'GEELUNG · ORDER SUPPORT'}</p><h2>{locale === 'zh' ? '从规格沟通到出货对接' : 'From specification discussion to shipment coordination'}</h2><div className="applications">{copy.home.applications.map((item, index) => <article className="application" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{supportDetails[index]}</p></article>)}</div></div></section><section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 相关产品' : 'GEELUNG · RELATED PRODUCTS'}</p><h2>{locale === 'zh' ? '相关绳类产品' : 'Related rope products'}</h2></div><Link className="text-link" href="/products">{common.back} <span aria-hidden>→</span></Link></div><div className="product-grid related-products">{relatedProducts.map((item, index) => { const related = copy.products[item.key]; return <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}><span className="product-number">0{index + 1}</span><img src={item.image} alt={locale === 'en' ? item.imageAlt : related.title} width={item.width} height={item.height} loading="lazy" /><h3>{related.title}</h3><p>{related.description}</p><span className="card-link">{common.request} <span aria-hidden>→</span></span></Link>; })}</div></div></section></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
