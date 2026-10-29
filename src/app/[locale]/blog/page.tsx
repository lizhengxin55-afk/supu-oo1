import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {blogPosts} from '@/lib/blog';
import {absoluteUrl} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (locale !== 'en') return {};
  const title = 'Braided Rope & Crochet Cord Technical Blog | GEELUNG';
  const description = 'Practical sourcing guides for braided rope, crochet cord, materials, custom specifications, export packing and B2B order preparation.';
  return {title, description, keywords: ['braided rope guide', 'crochet cord guide', 'nylon braided rope', 'polyester crochet cord'], alternates:{canonical:absoluteUrl('en','/blog')}};
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale); if (locale !== 'en') notFound();
  return <><Header /><main><section className="page-hero"><div className="container"><p className="eyebrow">GEELUNG · TECHNICAL BLOG</p><h1>Braided Rope & Crochet Cord Sourcing Guides</h1><p className="lead">Practical English resources for industrial buyers preparing a rope specification, sample request or export order.</p></div></section><section className="section"><div className="container blog-grid">{blogPosts.map((post) => <article className="blog-card" key={post.slug}><img src={post.image} alt={post.imageAlt} width={post.image.includes('warehouse') ? 1280 : 900} height={post.image.includes('warehouse') ? 800 : 614} loading="lazy" /><div><p className="eyebrow">TECHNICAL GUIDE</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read the guide <span aria-hidden>→</span></Link></div></article>)}</div></section></main></>;
}
