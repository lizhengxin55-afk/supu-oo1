import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {getLocalizedBlogPosts} from '@/lib/localized-blog';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const labels: Record<AppLocale, {title:string; lead:string; productTitle:string; blogTitle:string; supportTitle:string; about:string; videos:string; catalog:string; contact:string; quote:string}> = {
  zh:{title:'查找产品、采购指南与询盘支持',lead:'面向工业绳类采购的清晰、可抓取页面目录。',productTitle:'绳类产品页',blogTitle:'采购指南',supportTitle:'企业与支持页面',about:'关于 GEELUNG',videos:'视频资料',catalog:'目录与技术支持',contact:'联系我们',quote:'获取报价'},
  en:{title:'Find products, sourcing guides and RFQ support',lead:'A clean, crawlable directory for industrial rope buyers.',productTitle:'Rope product pages',blogTitle:'Buyer guides',supportTitle:'Useful pages',about:'About GEELUNG',videos:'Video Library',catalog:'Catalog & technical support',contact:'Contact',quote:'Request a quotation'},
  fr:{title:'Produits, guides d’achat et support RFQ',lead:'Un répertoire clair et explorable pour les acheteurs de cordes industrielles.',productTitle:'Pages produit',blogTitle:'Guides acheteur',supportTitle:'Pages utiles',about:'À propos de GEELUNG',videos:'Vidéos',catalog:'Catalogue et support technique',contact:'Contact',quote:'Demander un devis'},
  es:{title:'Productos, guías de compra y soporte RFQ',lead:'Un directorio claro y rastreable para compradores de cuerdas industriales.',productTitle:'Páginas de producto',blogTitle:'Guías de compra',supportTitle:'Páginas útiles',about:'Sobre GEELUNG',videos:'Vídeos',catalog:'Catálogo y soporte técnico',contact:'Contacto',quote:'Solicitar cotización'},
  ja:{title:'製品、調達ガイド、RFQサポートを探す',lead:'産業用ロープのバイヤー向け、検索可能なページ一覧です。',productTitle:'製品ページ',blogTitle:'バイヤーガイド',supportTitle:'サポートページ',about:'GEELUNGについて',videos:'動画資料',catalog:'カタログ・技術サポート',contact:'お問い合わせ',quote:'見積を依頼'},
  de:{title:'Produkte, Einkaufsleitfäden und RFQ-Support',lead:'Ein klares, crawlbares Verzeichnis für Einkäufer von Industrie-Seilen.',productTitle:'Produktseiten',blogTitle:'Einkaufsleitfäden',supportTitle:'Nützliche Seiten',about:'Über GEELUNG',videos:'Videos',catalog:'Katalog und technischer Support',contact:'Kontakt',quote:'Angebot anfordern'}
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return {title:'HTML Sitemap | GEELUNG',description:'Browse GEELUNG product pages, technical sourcing guides and RFQ pages for braided rope and crochet cord.',alternates:{canonical:absoluteUrl(locale,'/sitemap'),languages:languageAlternates('/sitemap')}};
}

export default async function HtmlSitemapPage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale);
  const content = getRopeContent(locale); const text = labels[locale]; const posts = getLocalizedBlogPosts(locale);
  return <><Header /><main className="static-page html-sitemap-page"><section className="static-hero sitemap-hero"><div className="static-shell"><p className="eyebrow">GEELUNG · HTML SITEMAP</p><h1>{text.title}</h1><p className="lead">{text.lead}</p></div></section><section className="static-section"><div className="static-shell sitemap-grid"><section><p className="eyebrow">PRODUCTS</p><h2>{text.productTitle}</h2><nav>{products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`}><span>{content.products[product.key].title}</span><small>{content.products[product.key].description}</small></Link>)}</nav></section><section><p className="eyebrow">BLOG</p><h2>{text.blogTitle}</h2><nav>{posts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`}><span>{post.title}</span><small>{post.description}</small></Link>)}</nav></section><section><p className="eyebrow">COMPANY & SUPPORT</p><h2>{text.supportTitle}</h2><nav><Link href="/videos"><span>{text.videos}</span><small>Factory and product videos</small></Link><Link href="/about"><span>{text.about}</span><small>GEELUNG B2B supply overview</small></Link><Link href="/resources"><span>{text.catalog}</span><small>Product information and technical support</small></Link><Link href="/contact"><span>{text.contact}</span><small>Location and inquiry contact details</small></Link><Link href="/inquiry"><span>{text.quote}</span><small>Product, size, quantity and destination details</small></Link><a href="/sitemap.xml"><span>XML Sitemap</span><small>Machine-readable sitemap for search engines</small></a></nav></section></div></section></main></>;
}
