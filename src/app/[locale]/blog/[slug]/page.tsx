import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {blogPosts, getBlogPost} from '@/lib/blog';
import {absoluteUrl} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale; slug: string}>};

export function generateStaticParams() { return blogPosts.map((post) => ({locale: 'en', slug: post.slug})); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params; const post = getBlogPost(slug); if (locale !== 'en' || !post) return {};
  const path = `/blog/${post.slug}`;
  return {title: `${post.title} | GEELUNG`, description: post.description, keywords: post.keywords, alternates:{canonical:absoluteUrl('en',path)}, openGraph:{title:post.title,description:post.description,url:absoluteUrl('en',path),type:'article',publishedTime:post.publishedAt,modifiedTime:post.updatedAt,images:[{url:post.image,alt:post.imageAlt}]}};
}

export default async function BlogPostPage({params}: Props) {
  const {locale, slug} = await params; setRequestLocale(locale); const post = getBlogPost(slug); if (locale !== 'en' || !post) notFound();
  const path = `/blog/${post.slug}`;
  const schema = {'@context':'https://schema.org','@graph':[{'@type':'BlogPosting','headline':post.title,'description':post.description,'datePublished':post.publishedAt,'dateModified':post.updatedAt,'mainEntityOfPage':absoluteUrl('en',path),'image':absoluteUrl('en',post.image),'author':{'@type':'Organization','name':'GEELUNG'},'publisher':{'@type':'Organization','name':'GEELUNG','logo':{'@type':'ImageObject','url':'https://www.geelung.com/assets/geelung-logo-web.jpg'}}},{'@type':'FAQPage','mainEntity':post.faq.map((item) => ({'@type':'Question',name:item.question,'acceptedAnswer':{'@type':'Answer',text:item.answer}}))}]};
  return <><Header /><main><article><section className="page-hero"><div className="container article-head"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / <Link href="/blog">Blog</Link> / {post.title}</p><p className="eyebrow">GEELUNG · TECHNICAL GUIDE</p><h1>{post.title}</h1><p className="lead">{post.description}</p></div></section><section className="section"><div className="article-layout"><div className="article-content"><img src={post.image} alt={post.imageAlt} width={post.image.includes('warehouse') ? 1280 : 900} height={post.image.includes('warehouse') ? 800 : 614} /><p className="article-intro">{post.intro}</p>{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section><h2>Buyer questions</h2><div className="faq-list">{post.faq.map((item) => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section></div><aside className="article-aside"><p className="eyebrow">NEXT STEP</p><h2>Prepare a focused rope RFQ</h2><p>Share the material preference, target diameter, quantity, intended use, packing request and destination for a clearer quotation.</p><Link className="button" href={post.product.href}>{post.product.label}</Link><Link className="text-link" href="/inquiry">Request a quotation <span aria-hidden>→</span></Link></aside></div></section></article></main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></>;
}
