import { useState } from "react";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

const articles = [
  { title: "How to Select PVC Fabric for Industrial Covers", excerpt: "A practical guide to weight, coating and weather resistance when sourcing PVC fabric for demanding projects.", date: "Sep 18, 2026", image: "/assets/pvc-product.jpg" },
  { title: "PVC Tarpaulins for Construction and Transport", excerpt: "Explore the key details that help importers choose reliable tarpaulins for protection on the move and on site.", date: "Sep 10, 2026", image: "/assets/hero-factory.jpg" },
  { title: "What Makes an Effective Soundproof Barrier?", excerpt: "Material structure, installation conditions and project requirements all influence real-world noise-control performance.", date: "Aug 28, 2026", image: "/assets/soundproof-product.jpg" },
  { title: "OEM Fabric Solutions: From Brief to Delivery", excerpt: "Understand the typical stages of a custom industrial-fabric project, from specifications and samples to shipment.", date: "Aug 15, 2026", image: "/assets/factory-production.png" },
  { title: "Geocell Materials for Ground Stabilisation", excerpt: "Where engineered cellular confinement systems can add strength and structure to infrastructure applications.", date: "Jul 30, 2026", image: "/assets/geocell-product.jpg" },
  { title: "Preparing Your Industrial Fabric RFQ", excerpt: "The information to include in an enquiry so suppliers can quote accurately and move your project forward faster.", date: "Jul 18, 2026", image: "/assets/supfield-engineering.png" },
];

const pageSize = 4;
const pageCount = Math.ceil(articles.length / pageSize);

export function BlogListPage() {
  const [page, setPage] = useState(1);
  const visibleArticles = articles.slice((page - 1) * pageSize, page * pageSize);
  const goToPage = (nextPage) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <main className="blog-list-page">
    <header className="blog-list-header">
      <a className="blog-list-brand" href="/" aria-label="Supfield home"><img src="/assets/ept-logo.png" alt="EPT" /><span>SUPFIELD</span></a>
      <nav className="blog-list-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/product-list">Products</a><a className="is-active" href="/blog-list">Insights</a><a href="/contact">Contact</a></nav>
      <a className="blog-list-quote" href="/inquiry">Get a Quote <ArrowRight size={16} weight="bold" /></a>
    </header>

    <section className="blog-list-hero"><p>SUPFIELD INSIGHTS</p><h1>Blog &amp; Articles</h1><span>Practical sourcing knowledge and industrial fabric expertise for global buyers.</span></section>

    <section className="blog-list-content" aria-label="Blog and articles">
      <div className="blog-list-intro"><p>LATEST ARTICLES</p><span>Materials, applications and sourcing guidance from the Supfield team.</span></div>
      <div className="blog-list-grid">
        {visibleArticles.map((article) => <article className="blog-list-card" key={article.title}>
          <img src={article.image} alt="" />
          <div className="blog-list-card-copy"><time dateTime={article.date}>{article.date}</time><h2>{article.title}</h2><p>{article.excerpt}</p><a href="/blog-single">Read More <ArrowRight size={17} weight="bold" /></a></div>
        </article>)}
      </div>
      <nav className="blog-list-pagination" aria-label="Blog pages">
        <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page"><CaretLeft size={18} weight="bold" /></button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button type="button" className={page === pageNumber ? "is-current" : ""} key={pageNumber} onClick={() => goToPage(pageNumber)} aria-label={`Go to page ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined}>{String(pageNumber).padStart(2, "0")}</button>)}
        <button type="button" onClick={() => goToPage(page + 1)} disabled={page === pageCount} aria-label="Next page"><CaretRight size={18} weight="bold" /></button>
      </nav>
    </section>
    <footer className="blog-list-footer"><span>SUPFIELD · INDUSTRIAL FABRIC SOLUTIONS</span><a href="/inquiry">Start Your Project <ArrowRight size={16} weight="bold" /></a></footer>
  </main>;
}
