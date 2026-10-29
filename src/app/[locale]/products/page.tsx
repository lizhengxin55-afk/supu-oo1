import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const copy = getRopeContent(locale);
  const path = '/products';
  const title = locale === 'zh' ? '编织绳与钩编绳产品中心' : 'Braided Rope & Crochet Rope Products';
  const description = locale === 'zh' ? '查看 GEELUNG 面向海外 B2B 采购的钩编绳、工业编织绳、成卷编织绳与定制编织绳。' : 'Explore GEELUNG crochet rope, industrial braided rope, rolled rope and custom rope options for global B2B procurement.';
  return {title: `${title} | GEELUNG`, description, keywords: copy.home.metaKeywords.split(','), alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)}};
}

export default async function ProductsIndexPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getRopeContent(locale);
  const title = locale === 'zh' ? '编织绳与钩编绳产品中心' : 'Braided Rope & Crochet Rope Products';
  const intro = locale === 'zh' ? '按用途、目标外径、数量及包装方式选择合适的绳类产品。每个产品页均提供基础技术参数与询盘入口。' : 'Choose a rope format by application, target diameter, quantity and packing method. Each product page includes core technical information and a direct RFQ path.';
  return <><Header /><main><section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / {copy.productPage.back}</p><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 产品系列' : 'GEELUNG · PRODUCT RANGE'}</p><h1>{title}</h1><p className="lead">{intro}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.productPage.request}</Link><Link className="button button-secondary" href="/resources">{copy.home.resourcesTitle}</Link></div></div></section><section className="section"><div className="container"><div className="product-grid">{products.map((product,index) => { const item = copy.products[product.key]; return <Link className="product-card" key={product.slug} href={`/products/${product.slug}`}><span className="product-number">0{index + 1}</span><img src={product.image} alt={locale === 'en' ? product.imageAlt : item.title} width={product.width} height={product.height} loading="lazy" /><h2 className="card-title">{item.title}</h2><p>{item.description}</p><span className="card-link">{copy.productPage.request} <span aria-hidden>→</span></span></Link>; })}</div></div></section><section className="section section-soft"><div className="container resource-box"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 询盘准备' : 'GEELUNG · PROCUREMENT PREPARATION'}</p><h2>{locale === 'zh' ? '准备清晰需求，获得更准确的报价' : 'Prepare a clear requirement for a more accurate quotation'}</h2><p>{locale === 'zh' ? '询盘时请提供绳类产品、目标外径、数量、用途、包装偏好及目的国。' : 'For a precise RFQ, include rope type, target outer diameter, quantity, application, packing preference and destination.'}</p><Link className="button" href="/inquiry">{copy.productPage.request}</Link></div></section></main></>;
}
