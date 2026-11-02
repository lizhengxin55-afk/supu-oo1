import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const ui: Record<AppLocale, {catalog:string; products:string; resources:string; start:string; supply:string; video:string; heroAlt:string; factoryAlt:string}> = {
  zh:{catalog:'下载产品目录',products:'查看产品',resources:'产品资料与技术支持',start:'开始询盘',supply:'工业绳类 B2B 供货',video:'产品与包装视频',heroAlt:'GEELUNG 编织绳和钩编绳工业供货展示',factoryAlt:'GEELUNG 绳类产品细节与出口包装展示'},
  en:{catalog:'Download catalog',products:'Explore products',resources:'Product information & technical support',start:'Start an RFQ',supply:'Industrial rope B2B supply',video:'Product & packing video',heroAlt:'GEELUNG braided rope and crochet cord industrial supply',factoryAlt:'GEELUNG rope product details and export packing'},
  fr:{catalog:'Télécharger le catalogue',products:'Voir les produits',resources:'Informations produit et support technique',start:'Démarrer une demande',supply:'Fourniture B2B de cordes industrielles',video:'Vidéo produit et emballage',heroAlt:'Fourniture industrielle de cordes tressées et crochetées GEELUNG',factoryAlt:'Détails produit et emballage export GEELUNG'},
  es:{catalog:'Descargar catálogo',products:'Ver productos',resources:'Información de producto y soporte técnico',start:'Iniciar una solicitud',supply:'Suministro B2B de cuerdas industriales',video:'Vídeo de producto y embalaje',heroAlt:'Suministro industrial GEELUNG de cuerdas trenzadas y de ganchillo',factoryAlt:'Detalles de producto y embalaje de exportación GEELUNG'},
  ja:{catalog:'カタログをダウンロード',products:'製品を見る',resources:'製品情報・技術サポート',start:'RFQを開始',supply:'産業用ロープのB2B供給',video:'製品・梱包動画',heroAlt:'GEELUNG 編組ロープ・かぎ編みロープの産業供給',factoryAlt:'GEELUNG 製品詳細・輸出梱包'},
  de:{catalog:'Katalog herunterladen',products:'Produkte ansehen',resources:'Produktinformationen und technischer Support',start:'RFQ starten',supply:'B2B-Lieferung von Industrie-Seilen',video:'Produkt- und Verpackungsvideo',heroAlt:'GEELUNG Industrie-Lieferung von Flechtseil und Häkelkordel',factoryAlt:'GEELUNG Produktdetails und Exportverpackung'}
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = getRopeContent(locale).home;
  return {title:t.metaTitle, description:t.metaDescription, keywords:t.metaKeywords.split(','), alternates:{canonical:absoluteUrl(locale,'/'),languages:languageAlternates('/')}, openGraph:{title:t.metaTitle,description:t.metaDescription,url:absoluteUrl(locale,'/'),type:'website'}};
}

export default async function HomePage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale);
  const copy = getRopeContent(locale); const {home} = copy; const text = ui[locale];
  const schema = {'@context':'https://schema.org','@type':'Organization',name:'GEELUNG',alternateName:'吉隆环保',url:absoluteUrl(locale,'/'),logo:'https://www.geelung.com/assets/geelung-logo-web.jpg',address:{'@type':'PostalAddress',streetAddress:'Longgu Industrial Park',addressLocality:'Peixian, Xuzhou',addressRegion:'Jiangsu',addressCountry:'CN'}};
  return <><Header /><main className="static-page home-static-page">
    <section className="static-hero home-static-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="eyebrow">{home.eyebrow}</p><h1>{home.title}</h1><p className="lead">{home.intro}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.productPage.request}</Link><a className="button button-secondary" href="/assets/jilong-product-catalog.pdf">{text.catalog}</a></div><dl className="hero-facts">{home.proof.map((item, index) => <div key={item}><dt>{item}</dt><dd>{home.proofSub[index]}</dd></div>)}</dl></div><MediaPlaceholder kind="Image" title={text.supply} alt={text.heroAlt} note="Replace with an approved 1600 × 1100 factory, product or export-packing image." className="hero-media-placeholder" /></div></section>

    <section className="static-section"><div className="static-shell"><div className="section-heading-row"><div><p className="eyebrow">{home.productsEyebrow}</p><h2>{home.productsTitle}</h2></div><Link className="button" href="/products">{text.products}</Link></div><div className="blog-template-grid">{products.map((product, index) => { const item = copy.products[product.key]; return <article className="blog-template-card" key={product.slug}><MediaPlaceholder kind="Image" title={item.title} alt={item.title} note="Replace with a product-specific image after final approval." /><div><p className="eyebrow">0{index + 1} · GEELUNG</p><h2><Link href={`/products/${product.slug}`}>{item.title}</Link></h2><p>{item.description}</p><Link className="text-link" href={`/products/${product.slug}`}>{copy.productPage.request} <span aria-hidden>→</span></Link></div></article>;})}</div></div></section>

    <section id="applications" className="static-section static-section-soft"><div className="static-shell"><p className="eyebrow">GEELUNG · B2B SUPPORT</p><div className="section-heading-row"><div><h2>{home.applicationsTitle}</h2><p className="section-intro">{home.applicationText}</p></div><Link className="button" href="/inquiry">{text.start}</Link></div><div className="procurement-grid">{home.applications.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{home.applicationDetails?.[index] ?? home.applicationText}</p></article>)}</div></div></section>

    <section className="static-section static-section-navy"><div className="static-shell media-feature"><div><p className="eyebrow">{home.factoryEyebrow}</p><h2>{home.factoryTitle}</h2><p>{home.factoryText}</p><div className="hero-facts">{home.factoryStats.map((stat, index) => <div key={stat}><dt>{home.factoryStatLabels[index]}</dt><dd>{stat}</dd></div>)}</div></div><MediaPlaceholder kind="Video" title={text.video} alt={text.factoryAlt} note="Replace with a 16:9 product, factory or export-packing video." /></div></section>

    <section className="static-section"><div className="static-shell"><p className="eyebrow">{home.processTitle}</p><div className="procurement-grid">{home.process.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{home.applicationDetails?.[index] ?? home.applicationText}</p></article>)}</div></div></section>

    <section id="resources" className="static-section static-section-soft"><div className="static-shell"><div className="resource-box"><p className="eyebrow">GEELUNG · RESOURCES</p><h2>{home.resourcesTitle}</h2><p>{home.resourcesText}</p><div className="button-row"><a className="button" href="/assets/jilong-product-catalog.pdf">{text.catalog}</a><Link className="button button-secondary" href="/inquiry">{copy.productPage.request}</Link></div></div></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
