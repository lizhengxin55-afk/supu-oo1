import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {blogPosts} from '@/lib/blog';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import {absoluteUrl} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (locale !== 'en') return {};
  return {title:'HTML Sitemap | GEELUNG Braided Rope & Crochet Cord',description:'Browse GEELUNG product pages, technical sourcing guides and RFQ pages for braided rope and crochet cord.',alternates:{canonical:absoluteUrl('en','/sitemap')}};
}

export default async function HtmlSitemapPage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale); if (locale !== 'en') notFound();
  const content = getRopeContent('en');
  return <><Header /><main className="static-page html-sitemap-page"><section className="static-hero sitemap-hero"><div className="static-shell"><p className="eyebrow">GEELUNG · HTML SITEMAP</p><h1>Find products, sourcing guides and RFQ support</h1><p className="lead">A clean, crawlable directory of the English pages available to industrial rope buyers.</p></div></section><section className="static-section"><div className="static-shell sitemap-grid"><section><p className="eyebrow">PRODUCTS</p><h2>Rope product pages</h2><nav>{products.map((product) => <Link key={product.slug} href={`/products/${product.slug}`}><span>{content.products[product.key].title}</span><small>{content.products[product.key].description}</small></Link>)}</nav></section><section><p className="eyebrow">TECHNICAL BLOG</p><h2>Buyer guides</h2><nav>{blogPosts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`}><span>{post.title}</span><small>{post.description}</small></Link>)}</nav></section><section><p className="eyebrow">COMPANY & SUPPORT</p><h2>Useful pages</h2><nav><Link href="/about"><span>About GEELUNG</span><small>Company and B2B supply overview</small></Link><Link href="/resources"><span>Catalog & technical support</span><small>Prepare product information for your requirement</small></Link><Link href="/contact"><span>Contact</span><small>Location and inquiry contact details</small></Link><Link href="/inquiry"><span>Request a quotation</span><small>Send product, size, quantity and destination details</small></Link><a href="/sitemap.xml"><span>XML Sitemap</span><small>Machine-readable sitemap for search engines</small></a></nav></section></div></section></main></>;
}
