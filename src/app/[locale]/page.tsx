import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {products} from '@/lib/products';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  return {
    title: t('metaTitle'), description: t('metaDescription'), keywords: t('metaKeywords').split(','),
    alternates: {canonical: absoluteUrl(locale, '/'), languages: languageAlternates('/')},
    openGraph: {title: t('metaTitle'), description: t('metaDescription'), url: absoluteUrl(locale, '/'), type: 'website'}
  };
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const nav = await getTranslations('navigation');
  const productTranslations = await getTranslations('products');
  const schema = { '@context':'https://schema.org', '@type':'Organization', name:'GEELUNG', alternateName:'吉隆环保', url:absoluteUrl(locale, '/'), logo:'https://www.geelung.com/assets/geelung-logo-web.jpg', address:{'@type':'PostalAddress',streetAddress:'Longgu Industrial Park',addressLocality:'Peixian, Xuzhou',addressRegion:'Jiangsu',addressCountry:'CN'} };
  return <>
    <Header />
    <main>
      <section className="hero"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{t('eyebrow')}</p><h1>{t('title')}</h1><p className="lead">{t('intro')}</p><div className="button-row"><Link className="button" href="/inquiry">{nav('rfq')}</Link><a className="button button-secondary" href="/assets/jilong-product-catalog.pdf">{t('catalog')}</a></div></div><div className="hero-media"><img src="/assets/rope-warehouse.webp" alt="GEELUNG braided rope warehouse" /></div></div></section>
      <section className="proof"><div><strong>{t('proofOne')}</strong><span>{t('proofOneSub')}</span></div><div><strong>{t('proofTwo')}</strong><span>{t('proofTwoSub')}</span></div><div><strong>{t('proofThree')}</strong><span>{t('proofThreeSub')}</span></div></section>
      <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{t('productsEyebrow')}</p><h2>{t('productsTitle')}</h2></div></div><div className="product-grid">{products.map((product) => <Link className="product-card" key={product.slug} href={`/products/${product.slug}`}><img src={product.image} alt={productTranslations(`${product.key}.cardTitle`)} /><h3>{productTranslations(`${product.key}.cardTitle`)}</h3><p>{productTranslations(`${product.key}.cardDescription`)}</p></Link>)}</div></div></section>
      <section id="applications" className="section section-soft"><div className="container"><p className="eyebrow">{t('applicationsTitle')}</p><h2>{t('applicationsTitle')}</h2><div className="applications">{['applicationsOne','applicationsTwo','applicationsThree'].map((item) => <article className="application" key={item}><h3>{t(item)}</h3><p>{t('applicationText')}</p></article>)}</div></div></section>
      <section className="section"><div className="container factory"><img src="/assets/rope-rolls.webp" alt="GEELUNG braided rope rolls" loading="lazy" /><div><p className="eyebrow">{t('factoryEyebrow')}</p><h2>{t('factoryTitle')}</h2><p className="lead">{t('factoryText')}</p><div className="stat-grid"><div><strong>60,000 m²</strong><span>{t('factoryOne')}</span></div><div><strong>OEM / ODM</strong><span>{t('factoryThree')}</span></div><div><strong>Global</strong><span>{t('factoryTwo')}</span></div></div></div></div></section>
      <section id="resources" className="section section-soft"><div className="container resource-box"><h2>{t('resourcesTitle')}</h2><p>{t('resourcesText')}</p><a className="button" href="/assets/jilong-product-catalog.pdf">{t('catalog')}</a></div></section>
    </main>
    <footer className="footer"><div className="container"><strong>GEELUNG · 吉隆环保</strong><p>© 2026 GEELUNG · 吉隆环保. All rights reserved.</p></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
  </>;
}
