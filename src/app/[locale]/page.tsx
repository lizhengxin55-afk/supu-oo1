import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {HomeHeroCarousel} from '@/components/HomeHeroCarousel';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const ui: Record<AppLocale, {company:string; catalog:string; products:string; about:string; capability:string; news:string; contactTitle:string; contactText:string; explore:string}> = {
  zh:{company:'江苏吉隆环保科技有限公司',catalog:'下载产品目录',products:'查看全部产品',about:'关于吉隆',capability:'核心能力',news:'技术资源',contactTitle:'告诉我们您的需求',contactText:'提交产品形式、目标外径、数量、用途、包装要求和目的国，我们将提供针对性的询盘支持。',explore:'了解更多'},
  en:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Download catalog',products:'Explore products',about:'About GEELUNG',capability:'Core capabilities',news:'Technical resources',contactTitle:'Tell us what you need',contactText:'Share product format, target diameter, quantity, application, packing request and destination for focused RFQ support.',explore:'Learn more'},
  fr:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Télécharger le catalogue',products:'Voir les produits',about:'À propos de GEELUNG',capability:'Compétences clés',news:'Ressources techniques',contactTitle:'Indiquez-nous votre besoin',contactText:'Partagez le format, le diamètre, la quantité, l’usage, l’emballage et la destination pour une assistance RFQ adaptée.',explore:'En savoir plus'},
  es:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Descargar catálogo',products:'Ver productos',about:'Sobre GEELUNG',capability:'Capacidades clave',news:'Recursos técnicos',contactTitle:'Cuéntenos su necesidad',contactText:'Comparta formato, diámetro, cantidad, uso, embalaje y destino para recibir apoyo RFQ específico.',explore:'Más información'},
  ja:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'カタログをダウンロード',products:'製品を見る',about:'GEELUNGについて',capability:'主要能力',news:'技術資料',contactTitle:'ご要望をお聞かせください',contactText:'製品形式、目標外径、数量、用途、梱包、仕向地を共有いただくと、的確なRFQ対応が可能です。',explore:'詳しく見る'},
  de:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Katalog herunterladen',products:'Produkte ansehen',about:'Über GEELUNG',capability:'Kernkompetenzen',news:'Technische Ressourcen',contactTitle:'Nennen Sie uns Ihren Bedarf',contactText:'Nennen Sie Produktformat, Zieldurchmesser, Menge, Einsatz, Verpackung und Zielort für gezielte RFQ-Unterstützung.',explore:'Mehr erfahren'}
};

const assets = {
  factory:'/assets/geelung-factory-spools.webp',
  spool:'/assets/geelung-white-rope-spool.webp',
  detail:'/assets/geelung-crochet-cord-detail.webp'
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; const home = getRopeContent(locale).home;
  return {title:home.metaTitle,description:home.metaDescription,keywords:home.metaKeywords.split(','),alternates:{canonical:absoluteUrl(locale,'/'),languages:languageAlternates('/')},openGraph:{title:home.metaTitle,description:home.metaDescription,url:absoluteUrl(locale,'/'),type:'website',images:[{url:assets.factory,alt:'GEELUNG factory production spools'}]}};
}

export default async function HomePage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale);
  const copy = getRopeContent(locale); const {home} = copy; const text = ui[locale];
  const companySchema = {'@context':'https://schema.org','@type':'Organization',name:'GEELUNG',alternateName:'江苏吉隆环保科技有限公司',url:absoluteUrl(locale,'/'),logo:'https://www.geelung.com/assets/geelung-logo-web.jpg',address:{'@type':'PostalAddress',streetAddress:'Longgu Industrial Park',addressLocality:'Peixian, Xuzhou',addressRegion:'Jiangsu',addressCountry:'CN'}};
  return <><Header /><main className="home-plan-one">
    <HomeHeroCarousel company={text.company} heading={home.title} intro={home.intro} requestLabel={copy.productPage.request} catalogLabel={text.catalog} proof={home.proof} proofSub={home.proofSub} />

    <section className="plan-one-section plan-one-video-section"><div className="plan-one-shell"><div className="plan-one-heading"><div><p className="plan-one-label">GEELUNG · VIDEO</p><h2>{locale === 'zh' ? '工厂与产品视频' : 'Factory & Product Videos'}</h2></div></div><div className="plan-one-video-placeholder" aria-label={locale === 'zh' ? '视频资料后续补充' : 'Factory and product video coming soon'}><span>{locale === 'zh' ? '视频资料后续补充' : 'Factory and product video coming soon'}</span></div></div></section>

    <section className="plan-one-section plan-one-about"><div className="plan-one-shell plan-one-about-grid"><div className="plan-one-media"><img src="/assets/geelung-factory-aerial.png" alt={locale === 'zh' ? '江苏吉隆环保科技有限公司工厂航拍图' : 'Aerial view of Jiangsu GEELUNG factory'} width="686" height="385" loading="lazy" /></div><div><p className="plan-one-label">{text.about}</p><h2>{home.factoryTitle}</h2><p className="plan-one-copy">{home.factoryText}</p><div className="plan-one-stats">{home.factoryStats.map((stat, index) => <div key={stat}><strong>{stat}</strong><span>{home.factoryStatLabels[index]}</span></div>)}</div><Link className="plan-one-link" href="/about">{text.explore} <span aria-hidden>→</span></Link></div></div></section>

    <section className="plan-one-section plan-one-products"><div className="plan-one-shell"><div className="plan-one-heading"><div><p className="plan-one-label">{home.productsEyebrow}</p><h2>{home.productsTitle}</h2></div><Link className="plan-one-link" href="/products">{text.products} <span aria-hidden>→</span></Link></div><div className="plan-one-product-grid">{products.map((product, index) => { const item = copy.products[product.key]; const image = [assets.spool, assets.factory, assets.detail, assets.factory][index]; return <Link key={product.slug} href={`/products/${product.slug}`} className="plan-one-product"><img src={image} alt={item.title} width="1200" height="842" loading="lazy" /><div><p>0{index + 1}</p><h3>{item.title}</h3><span>{item.description}</span><b aria-hidden>→</b></div></Link>; })}</div></div></section>

    <section className="plan-one-capabilities"><div className="plan-one-shell"><p className="plan-one-label">{text.capability}</p><h2>{locale === 'zh' ? '围绕外贸订单的全流程服务能力' : 'End-to-end support for export orders'}</h2><div>{['Material & specification','Diameter & color','Sample support','Packing proposal','Quality review','Export coordination','OEM / ODM'].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{locale === 'zh' ? ['材质与规格','外径与颜色','样品支持','包装方案','质量确认','出口对接','OEM / ODM'][index] : item}</h3><p>{locale === 'zh' ? '围绕确认后的采购要求进行清晰对接。' : 'Aligned with the confirmed procurement requirement.'}</p></article>)}</div></div></section>

    <section className="plan-one-section plan-one-detail"><div className="plan-one-shell plan-one-detail-grid"><div><p className="plan-one-label">{home.factoryEyebrow}</p><h2>{locale === 'zh' ? '从原料到成品，关注每一个交付环节' : 'From material to finished product, focused on every delivery step'}</h2><p className="plan-one-copy">{home.resourcesText}</p><Link className="button" href="/resources">{text.explore}</Link></div><img src={assets.detail} alt="GEELUNG white crochet cord product detail" width="1200" height="1200" loading="lazy" /></div></section>

    <section className="plan-one-contact"><div className="plan-one-shell"><p className="plan-one-label">GEELUNG · RFQ</p><h2>{text.contactTitle}</h2><p>{text.contactText}</p><Link className="button" href="/inquiry">{copy.productPage.request}</Link></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(companySchema)}} /></>;
}
