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

const productionGalleryCopy: Record<AppLocale, {eyebrow: string; title: string; text: string; nav: string; firstAlt: string; secondAlt: string}> = {
  zh: {eyebrow:'GEELUNG · 生产现场',title:'生产钩编绳：稳定工艺与卷装供货',text:'展示吉隆钩编绳生产线的实际作业环境。生产前可围绕外径、长度、卷装方式、数量与包装要求进行确认，便于连续加工和项目型采购对接。',nav:'生产现场',firstAlt:'吉隆钩编绳生产线与蓝色卷盘',secondAlt:'吉隆钩编绳生产线的原料卷与设备'},
  en: {eyebrow:'GEELUNG · PRODUCTION',title:'Production Crochet Rope: Stable Process & Spool Supply',text:'A view of GEELUNG’s crochet-rope production environment. Diameter, length, spool format, quantity and packing can be aligned before production for continuous processing and project procurement.',nav:'Production',firstAlt:'GEELUNG crochet rope production line with blue spools',secondAlt:'GEELUNG crochet rope production equipment and material rolls'},
  fr: {eyebrow:'GEELUNG · PRODUCTION',title:'Corde crochetée de production : procédé stable et bobines',text:'Vue de l’environnement de production des cordes crochetées de GEELUNG. Diamètre, longueur, format de bobine, quantité et emballage peuvent être confirmés avant production.',nav:'Production',firstAlt:'Ligne de production de corde crochetée GEELUNG avec bobines bleues',secondAlt:'Équipements de production et rouleaux de matière GEELUNG'},
  es: {eyebrow:'GEELUNG · PRODUCCIÓN',title:'Cuerda de ganchillo de producción: proceso estable y bobinas',text:'Vista del entorno de producción de cuerda de ganchillo de GEELUNG. El diámetro, la longitud, el formato de bobina, la cantidad y el embalaje se pueden confirmar antes de la producción.',nav:'Producción',firstAlt:'Línea de producción de cuerda de ganchillo GEELUNG con bobinas azules',secondAlt:'Equipos de producción y rollos de material GEELUNG'},
  ja: {eyebrow:'GEELUNG · 生産現場',title:'生産用かぎ編みロープ：安定した工程とスプール供給',text:'GEELUNGのかぎ編みロープ生産環境をご覧いただけます。外径、長さ、スプール形式、数量、梱包は生産前に確認できます。',nav:'生産現場',firstAlt:'青いスプールを備えたGEELUNGかぎ編みロープ生産ライン',secondAlt:'GEELUNGのかぎ編みロープ生産設備と原料ロール'},
  de: {eyebrow:'GEELUNG · PRODUKTION',title:'Produktions-Häkelkordel: stabiler Prozess und Spulenlieferung',text:'Einblick in die Produktionsumgebung für Häkelkordeln von GEELUNG. Durchmesser, Länge, Spulenformat, Menge und Verpackung können vor der Produktion abgestimmt werden.',nav:'Produktion',firstAlt:'GEELUNG Produktionslinie für Häkelkordel mit blauen Spulen',secondAlt:'GEELUNG Produktionsanlagen und Materialrollen für Häkelkordel'}
};

function technicalRows(locale: AppLocale) {
  const customizable = locale === 'zh' ? '可定制' : 'Customizable';
  return [
    ['外径 / OD', <>1.0 mm、1.2 mm、1.3 mm、<br />1.45 mm、1.6 mm、1.8 mm、<br />1.9 mm、2.0 mm、2.5 mm（{customizable}）</>],
    ['内径 / Inner Dia.', '0.65 – 1.55 mm'],
    ['工作温度 / Working Temperature', '0 – 55 °C']
  ] as const;
}

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
  const path = `/products/${slug}`; const isProductionCrochetRope = slug === 'braided-rope'; const production = productionGalleryCopy[locale];
  const productSchema = {'@context':'https://schema.org','@type':'Product',name:h1,description:summary,brand:{'@type':'Brand',name:'GEELUNG'},url:absoluteUrl(locale,path)};
  const faqSchema = {'@context':'https://schema.org','@type':'FAQPage','mainEntity':details.slice(0, 4).map(([label, answer]) => ({'@type':'Question',name:label,'acceptedAnswer':{'@type':'Answer',text:answer}}))};
  return <><Header /><main className="static-page product-static-page">
    <section className="static-hero product-static-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{getRopeContent(locale).productPage.back}</Link> / {h1}</p><p className="eyebrow">{copy.eyebrow}</p><h1>{h1}</h1><p className="lead">{summary}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><a className="button button-secondary" href="#specification">{copy.viewSpecification}</a></div><dl className="hero-facts"><div><dt>{copy.orderModel}</dt><dd>OEM / ODM</dd></div><div><dt>{copy.supplyFormat}</dt><dd>Roll / spool / pallet</dd></div><div><dt>{copy.samples}</dt><dd>{copy.samples}</dd></div></dl></div>{isProductionCrochetRope ? <img className="product-production-hero-image" src="/assets/geelung-crochet-production-line-wide.webp" alt={production.firstAlt} width="1280" height="960" /> : <MediaPlaceholder kind="Image" title={`${h1} main product image`} alt={imageAlt} note="Replace with a 1600 × 1100 product image on a clean industrial background." className="hero-media-placeholder" />}</div></section>

    <nav className="product-anchor-nav" aria-label="Product page sections"><div className="static-shell"><a href="#specification">{copy.viewSpecification}</a>{isProductionCrochetRope && <a href="#production">{production.nav}</a>}<a href="#media">Video</a><a href="#applications">{copy.sectionLabels.application}</a><a href="#faq">{copy.sectionLabels.faq}</a><Link href="/inquiry">RFQ</Link></div></nav>

    <section id="specification" className="static-section"><div className="static-shell split-spec"><div><p className="eyebrow">{copy.sectionLabels.profile}</p><h2>{copy.profileTitle}</h2><p className="section-intro">{copy.profileIntro}</p><div className="technical-overview"><h3>{locale === 'zh' ? '技术参数 / Technical Specifications' : 'Technical Specifications'}</h3><table className="technical-spec-table"><tbody>{technicalRows(locale).map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></div><div className="specification-list">{details.map(([label, value], index) => <article key={label}><span>0{index + 1}</span><div><h3>{label}</h3><p>{value}</p></div></article>)}</div></div><aside className="spec-aside"><MediaPlaceholder kind="Image" title="Product detail / cross-section" alt={`${imageAlt} detail view`} note="Replace with a macro product image, dimension drawing or packaging view." /><div className="upload-note"><strong>Media replacement note</strong><p>{copy.mediaNote}</p></div></aside></div></section>

    {isProductionCrochetRope && <section id="production" className="static-section production-gallery-section"><div className="static-shell"><p className="eyebrow">{production.eyebrow}</p><div className="section-heading-row"><div><h2>{production.title}</h2><p className="section-intro">{production.text}</p></div></div><div className="production-gallery"><figure><img src="/assets/geelung-crochet-production-line-wide.webp" alt={production.firstAlt} width="1280" height="960" loading="lazy" /><figcaption>{production.firstAlt}</figcaption></figure><figure><img src="/assets/geelung-crochet-production-line-detail.webp" alt={production.secondAlt} width="1280" height="960" loading="lazy" /><figcaption>{production.secondAlt}</figcaption></figure></div></div></section>}

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
  return <><Header /><main><section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/products">{common.back}</Link> / {t.title}</p><h1>{t.title}</h1><p className="lead">{t.description}</p></div></section><section className="container product-detail"><img src={product.image} alt={locale === 'en' ? product.imageAlt : t.title} width={product.width} height={product.height} /><div><p className="eyebrow">GEELUNG · OEM / ODM</p><h2>{common.specifications}</h2><p className="lead">{t.introduction}</p><table className="technical-spec-table"><tbody>{technicalRows(locale).map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table><p className="product-note">{locale === 'zh' ? '最终产品规格、卷装方式与出口包装将以确认后的订单需求为准。' : 'Final specifications, roll format and export packing are confirmed against the agreed order requirement.'}</p><Link className="button" href="/inquiry">{common.request}</Link></div></section><section className="section section-soft"><div className="container"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 订单支持' : 'GEELUNG · ORDER SUPPORT'}</p><h2>{locale === 'zh' ? '从规格沟通到出货对接' : 'From specification discussion to shipment coordination'}</h2><div className="applications">{copy.home.applications.map((item, index) => <article className="application" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{supportDetails[index]}</p></article>)}</div></div></section><section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 相关产品' : 'GEELUNG · RELATED PRODUCTS'}</p><h2>{locale === 'zh' ? '相关绳类产品' : 'Related rope products'}</h2></div><Link className="text-link" href="/products">{common.back} <span aria-hidden>→</span></Link></div><div className="product-grid related-products">{relatedProducts.map((item, index) => { const related = copy.products[item.key]; return <Link className="product-card" key={item.slug} href={`/products/${item.slug}`}><span className="product-number">0{index + 1}</span><img src={item.image} alt={locale === 'en' ? item.imageAlt : related.title} width={item.width} height={item.height} loading="lazy" /><h3>{related.title}</h3><p>{related.description}</p><span className="card-link">{common.request} <span aria-hidden>→</span></span></Link>; })}</div></div></section></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
