import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
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
  return <><Header /><main className="static-page blog-static-page">
    <section className="static-hero blog-static-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="eyebrow">GEELUNG · TECHNICAL BLOG</p><h1>Braided Rope & Crochet Cord Sourcing Guides</h1><p className="lead">Static English content templates for industrial buyers preparing a rope specification, sample request or export order.</p><div className="button-row"><Link className="button" href="/inquiry">Request a quotation</Link><Link className="button button-secondary" href="/products">Explore products</Link></div></div><MediaPlaceholder kind="Image" title="Technical blog cover image" alt="GEELUNG braided rope and crochet cord technical blog cover" note="Replace with a 1600 × 900 industrial product or application image." className="hero-media-placeholder" /></div></section>
    <section className="static-section"><div className="static-shell"><div className="section-heading-row"><div><p className="eyebrow">LATEST BUYER GUIDES</p><h2>Clear content for product selection and RFQ preparation</h2></div><p className="section-intro">Each article is an editable static page with its own SEO title, Meta description, Article schema, FAQ schema and internal product link.</p></div><div className="blog-template-grid">{blogPosts.map((post, index) => <article className="blog-template-card" key={post.slug}><MediaPlaceholder kind="Image" title={`Article ${String(index + 1).padStart(2, '0')} cover image`} alt={post.imageAlt} note="Replace with an article-specific product, packing or application image." /><div><p className="eyebrow">TECHNICAL GUIDE · {post.publishedAt}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read the guide <span aria-hidden>→</span></Link></div></article>)}</div></div></section>
    <section className="static-section static-section-soft"><div className="static-shell media-feature"><div><p className="eyebrow">CONTENT VIDEO PLACEHOLDER</p><h2>Explain one buying decision in under a minute</h2><p>Optional: place an English product-selection or packing video here. Keep the final video focused on one buyer question and link it to a related product page.</p></div><MediaPlaceholder kind="Video" title="Braided rope buyer guide video" alt="Braided rope and crochet cord purchasing guide video" note="Replace with a 16:9 English explainer video." /></div></section>
  </main></>;
}
