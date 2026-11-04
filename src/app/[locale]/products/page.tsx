import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const catalogImages = [
  '/assets/geelung-white-rope-spool-no-label.jpg',
  '/assets/geelung-factory-spools.webp',
  '/assets/geelung-finished-braided-rope.jpg',
  '/assets/geelung-custom-crochet-cord-warm.jpg'
] as const;

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const copy = getRopeContent(locale);
  const path = '/products';
  const title = locale === 'zh' ? '编织绳与钩编绳产品中心' : 'Braided Rope & Crochet Rope Products';
  const description = locale === 'zh' ? '查看 GEELUNG 面向海外 B2B 采购的钩编绳、工业编织绳、MBR 膜丝内衬与定制产品。' : 'Explore GEELUNG crochet rope, industrial braided rope, MBR membrane filament liner and custom product options for global B2B procurement.';
  return {title: `${title} | GEELUNG`, description, keywords: copy.home.metaKeywords.split(','), alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)}};
}

export default async function ProductsIndexPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getRopeContent(locale);
  const title = locale === 'zh' ? '产品中心' : 'Product Center';
  const intro = locale === 'zh' ? '钩编绳、编织绳与 MBR 膜丝内衬产品图册。点击产品查看规格并提交询盘。' : 'A visual catalog of crochet rope, braided rope and MBR membrane-filament liner products. Select a product to view specifications and send an RFQ.';

  return <><Header /><main className="catalog-page"><section className="catalog-showcase"><div className="catalog-shell"><header className="catalog-intro"><p>GEELUNG · {locale === 'zh' ? '产品图册' : 'PRODUCT CATALOG'}</p><h1>{title}</h1><span>{intro}</span></header><div className="catalog-grid">{products.map((product, index) => { const item = copy.products[product.key]; return <Link className="catalog-card" key={product.slug} href={`/products/${product.slug}`}><img src={catalogImages[index]} alt={locale === 'en' ? product.imageAlt : item.title} width="1200" height="900" loading={index === 0 ? 'eager' : 'lazy'} /><div><h2>{item.title}</h2><p>{item.description}</p></div></Link>; })}</div></div></section></main></>;
}
