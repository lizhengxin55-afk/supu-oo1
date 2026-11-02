import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
import {blogPosts} from '@/lib/blog';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {getLocalizedBlogPosts, localizedBlogUi} from '@/lib/localized-blog';
import {routing, type AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return routing.locales.flatMap((locale) => blogPosts.map((post) => ({locale, slug: post.slug}))); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const post = getLocalizedBlogPosts(locale).find((item) => item.slug === slug); if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {title: `${post.title} | GEELUNG`, description: post.description, keywords: post.keywords, alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)}, openGraph:{title:post.title,description:post.description,url:absoluteUrl(locale,path),type:'article',publishedTime:post.publishedAt,modifiedTime:post.updatedAt}};
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const post = getLocalizedBlogPosts(locale).find((item) => item.slug === slug); if (!post) return null;
  const ui = localizedBlogUi[locale];
  const path = `/blog/${post.slug}`;
  const schema = {'@context':'https://schema.org','@graph':[{'@type':'BlogPosting','headline':post.title,'description':post.description,'datePublished':post.publishedAt,'dateModified':post.updatedAt,'mainEntityOfPage':absoluteUrl(locale,path),'inLanguage':locale,'author':{'@type':'Organization','name':'GEELUNG'},'publisher':{'@type':'Organization','name':'GEELUNG','logo':{'@type':'ImageObject','url':'https://www.geelung.com/assets/geelung-logo-web.jpg'}}},{'@type':'FAQPage','mainEntity':post.faq.map((item) => ({'@type':'Question',name:item.question,'acceptedAnswer':{'@type':'Answer',text:item.answer}}))}]};
  return <><Header /><main className="static-page blog-article-static"><article>
    <section className="static-hero blog-article-hero"><div className="static-shell static-hero-grid"><div className="static-hero-copy"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/blog">{ui.title}</Link> / {post.title}</p><p className="eyebrow">{ui.eyebrow}</p><h1>{post.title}</h1><p className="lead">{post.description}</p><p className="article-date">{post.publishedAt} · {post.updatedAt}</p></div><MediaPlaceholder kind="Image" title="Article hero image" alt={post.imageAlt} note="Replace with a 1600 × 900 product, application or packing image unique to this article." className="hero-media-placeholder" /></div></section>
    <section className="static-section"><div className="static-article-shell"><div className="article-content static-article-content"><p className="article-intro">{post.intro}</p>{post.sections.map((section, index) => <section key={section.heading} className="article-chapter"><p className="eyebrow">0{index + 1} · {ui.latest}</p><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section id="faq" className="article-chapter"><p className="eyebrow">FAQ</p><h2>{ui.selection}</h2><div className="faq-list static-faq-list">{post.faq.map((item) => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section></div><aside className="article-aside static-article-aside"><p className="eyebrow">{ui.next}</p><h2>{ui.quote}</h2><p>{ui.rfqText}</p><MediaPlaceholder kind="Video" title="Optional related video" alt={`${post.title} supporting product video`} note="Replace with an article-specific 16:9 video." /><Link className="button" href={post.product.href}>{post.product.label}</Link><Link className="text-link text-link-light" href="/inquiry">{ui.quote} <span aria-hidden>→</span></Link></aside></div></section>
  </article></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
