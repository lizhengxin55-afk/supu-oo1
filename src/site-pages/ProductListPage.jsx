import { useState } from "react";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

const products = [
  { name: "PVC Coated Fabrics", description: "Versatile coated fabrics engineered for covers, structures and industrial protection.", image: "/assets/pvc-product.jpg" },
  { name: "Industrial PVC Tarpaulins", description: "Heavy-duty weather protection for transport, construction and temporary works.", image: "/assets/hero-factory.jpg" },
  { name: "PVC Soundproof Barriers", description: "Durable acoustic materials for construction sites, events and industrial enclosures.", image: "/assets/soundproof-product.jpg" },
  { name: "EVA Waterproof Tarpaulins", description: "Flexible, dependable waterproof sheeting for demanding outdoor applications.", image: "/assets/pvc-product.jpg" },
  { name: "Geocell & Geonet Solutions", description: "Ground-stabilisation materials designed for civil engineering and infrastructure projects.", image: "/assets/geocell-product.jpg" },
  { name: "Custom Industrial Covers", description: "OEM and ODM cover solutions matched to your dimensions, material and project needs.", image: "/assets/factory-production.png" },
];

const pageSize = 3;
const pageCount = Math.ceil(products.length / pageSize);

export function ProductListPage() {
  const [page, setPage] = useState(1);
  const displayedProducts = products.slice((page - 1) * pageSize, page * pageSize);
  const goToPage = (nextPage) => { setPage(nextPage); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <main className="product-list-page">
    <header className="product-list-header">
      <a className="product-list-brand" href="/" aria-label="Supfield home"><img src="/assets/ept-logo.png" alt="EPT" /><span>SUPFIELD</span></a>
      <nav className="product-list-nav" aria-label="Primary navigation"><a href="/">Home</a><a className="is-active" href="/product-list">Products</a><a href="/contact">Contact</a></nav>
      <a className="product-list-quote" href="/inquiry">Get a Quote <ArrowRight size={16} weight="bold" /></a>
    </header>

    <section className="product-list-hero"><p>PRODUCT PORTFOLIO</p><h1>Our Product Categories</h1><span>Industrial fabric solutions, made for global projects and dependable supply.</span></section>

    <section className="product-list-content" aria-label="Product categories">
      <div className="product-list-intro"><p>EXPLORE THE RANGE</p><span>{products.length} material solutions for protection, construction and engineered applications.</span></div>
      <div className="product-list-grid">
        {displayedProducts.map((product) => <a className="product-list-card" href="/product" key={product.name} aria-label={`View details: ${product.name}`}>
          <div className="product-list-image-wrap"><img src={product.image} alt={product.name} /><span>SUPFIELD</span></div>
          <div className="product-list-card-copy"><h2>{product.name}</h2><p>{product.description}</p><span className="product-list-detail">View Details <ArrowRight size={17} weight="bold" /></span></div>
        </a>)}
      </div>
      <nav className="product-list-pagination" aria-label="Product list pages">
        <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page"><CaretLeft size={18} weight="bold" /></button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button type="button" className={page === pageNumber ? "is-current" : ""} key={pageNumber} onClick={() => goToPage(pageNumber)} aria-label={`Go to page ${pageNumber}`} aria-current={page === pageNumber ? "page" : undefined}>{String(pageNumber).padStart(2, "0")}</button>)}
        <button type="button" onClick={() => goToPage(page + 1)} disabled={page === pageCount} aria-label="Next page"><CaretRight size={18} weight="bold" /></button>
      </nav>
    </section>

    <footer className="product-list-footer"><span>SUPFIELD · INDUSTRIAL FABRIC SOLUTIONS</span><a href="/inquiry">Start Your Project <ArrowRight size={16} weight="bold" /></a></footer>
  </main>;
}
