import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {getLocalizedBlogPosts, localizedBlogUi} from '@/lib/localized-blog';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const ui = localizedBlogUi[locale];
  return {title: `${ui.title} | GEELUNG`, description: ui.intro, keywords: ['braided rope guide', 'crochet cord guide', 'nylon braided rope', 'polyester crochet cord'], alternates:{canonical:absoluteUrl(locale,'/blog'),languages:languageAlternates('/blog')}};
}

export default async function BlogPage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale); const ui = localizedBlogUi[locale]; const posts = getLocalizedBlogPosts(locale);
  return <><Header /><main className="static-page blog-static-page">
    <section className="static-hero blog-static-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="eyebrow">{ui.eyebrow}</p><h1>{ui.title}</h1><p className="lead">{ui.intro}</p><div className="button-row"><Link className="button" href="/inquiry">{ui.quote}</Link><Link className="button button-secondary" href="/products">{ui.products}</Link></div></div><MediaPlaceholder kind="Image" title="Technical blog cover image" alt="GEELUNG braided rope and crochet cord technical blog cover" note="Replace with a 1600 × 900 industrial product or application image." className="hero-media-placeholder" /></div></section>
    <section className="static-section"><div className="static-shell"><div className="section-heading-row"><div><p className="eyebrow">{ui.latest}</p><h2>{ui.selection}</h2></div><p className="section-intro">{ui.pageIntro}</p></div><div className="blog-template-grid">{posts.map((post, index) => <article className="blog-template-card" key={post.slug}><MediaPlaceholder kind="Image" title={`Article ${String(index + 1).padStart(2, '0')} cover image`} alt={post.imageAlt} note="Replace with an article-specific product, packing or application image." /><div><p className="eyebrow">{ui.eyebrow} · {post.publishedAt}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><Link className="text-link" href={`/blog/${post.slug}`}>{ui.read} <span aria-hidden>→</span></Link></div></article>)}</div></div></section>
    <section className="static-section static-section-soft"><div className="static-shell media-feature"><div><p className="eyebrow">{ui.video}</p><h2>{ui.videoTitle}</h2><p>{ui.videoText}</p></div><MediaPlaceholder kind="Video" title="Braided rope buyer guide video" alt="Braided rope and crochet cord purchasing guide video" note="Replace with a 16:9 explainer video." /></div></section>
  </main></>;
}
