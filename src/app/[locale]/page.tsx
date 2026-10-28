import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = getRopeContent(locale).home;
  return {title:t.metaTitle, description:t.metaDescription, keywords:t.metaKeywords.split(','), alternates:{canonical:absoluteUrl(locale,'/'),languages:languageAlternates('/')}, openGraph:{title:t.metaTitle,description:t.metaDescription,url:absoluteUrl(locale,'/'),type:'website',images:['/assets/rope-warehouse.webp']}};
}

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getRopeContent(locale);
  const {home} = copy;
  const schema = {'@context':'https://schema.org','@type':'Organization',name:'GEELUNG',alternateName:'吉隆环保',url:absoluteUrl(locale,'/'),logo:'https://www.geelung.com/assets/geelung-logo-web.jpg',address:{'@type':'PostalAddress',streetAddress:'Longgu Industrial Park',addressLocality:'Peixian, Xuzhou',addressRegion:'Jiangsu',addressCountry:'CN'}};
  return <>
    <Header />
    <main>
      <section className="hero"><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{home.eyebrow}</p><h1>{home.title}</h1><p className="lead">{home.intro}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.productPage.request}</Link><a className="button button-secondary" href="/assets/jilong-product-catalog.pdf">{locale === 'zh' ? '下载产品目录' : 'Download Catalog'}</a></div><p className="hero-note">{home.proofSub.join(' · ')}</p></div><div className="hero-media"><img src="/assets/rope-warehouse.webp" alt="GEELUNG braided rope warehouse and export packing" /></div></div></section>
      <section className="proof" aria-label="Supply advantages">{home.proof.map((item,index)=><div key={item}><strong>{item}</strong><span>{home.proofSub[index]}</span></div>)}</section>
      <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{home.productsEyebrow}</p><h2>{home.productsTitle}</h2></div><Link className="text-link" href="/inquiry">{copy.productPage.request} <span aria-hidden>→</span></Link></div><div className="product-grid">{products.map((product,index)=>{const item=copy.products[product.key]; return <Link className="product-card" key={product.slug} href={`/products/${product.slug}`}><span className="product-number">0{index + 1}</span><img src={product.image} alt={item.title} /><h3>{item.title}</h3><p>{item.description}</p><span className="card-link">{copy.productPage.request} <span aria-hidden>→</span></span></Link>;})}</div></div></section>
      <section id="applications" className="section section-soft"><div className="container"><p className="eyebrow">{home.applicationsTitle}</p><h2>{home.applicationsTitle}</h2><div className="applications">{home.applications.map((item,index)=><article className="application" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{home.applicationText}</p></article>)}</div></div></section>
      <section className="section"><div className="container factory"><img src="/assets/rope-rolls.webp" alt="GEELUNG white braided rope rolls" loading="lazy" /><div><p className="eyebrow">{home.factoryEyebrow}</p><h2>{home.factoryTitle}</h2><p className="lead">{home.factoryText}</p><div className="stat-grid">{home.factoryStats.map((stat,index)=><div key={stat}><strong>{stat}</strong><span>{home.factoryStatLabels[index]}</span></div>)}</div></div></div></section>
      <section className="process-section"><div className="container"><p className="eyebrow">{home.processTitle}</p><div className="process-grid">{home.process.map((step,index)=><div key={step}><span>0{index + 1}</span><h3>{step}</h3></div>)}</div></div></section>
      <section id="resources" className="section section-soft"><div className="container resource-box"><p className="eyebrow">GEELUNG</p><h2>{home.resourcesTitle}</h2><p>{home.resourcesText}</p><div className="button-row"><a className="button" href="/assets/jilong-product-catalog.pdf">{locale === 'zh' ? '下载产品目录' : 'Download Catalog'}</a><Link className="button button-secondary" href="/inquiry">{copy.productPage.request}</Link></div></div></section>
    </main>
    <footer className="footer"><div className="container"><strong>GEELUNG · 吉隆环保</strong><p>© 2026 GEELUNG · 吉隆环保. All rights reserved.</p></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
  </>;
}

