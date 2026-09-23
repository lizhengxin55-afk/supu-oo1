"use client";

import { useEffect, useState } from "react";
import { ProductTemplate } from "./ProductTemplate";
import { ContactPage } from "./ContactPage";
import { InquiryPage } from "./InquiryPage";
import { ProductPage } from "./site-pages/ProductPage";
import { ProductListPage } from "./site-pages/ProductListPage";
import { BlogListPage } from "./site-pages/BlogListPage";
import { BlogSinglePage } from "./site-pages/BlogSinglePage";
import { HomeContents } from "./HomeContents";
import { WhatsAppButton } from "./WhatsAppButton";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

const products = [
  { title: "PVC Coated Fabrics", note: "Wide range of specifications and colors", image: "/assets/pvc-product.jpg", position: "10% 40%" },
  { title: "PVC Tarpaulins", note: "Heavy-duty, waterproof, UV resistant", image: "/assets/pvc-product.jpg", position: "72% 62%" },
  { title: "Fire-Retardant Tarps", note: "Flame-retardant solutions for construction", image: "/assets/soundproof-product.jpg", position: "17% 46%" },
  { title: "Soundproof Barriers", note: "Noise control for construction sites", image: "/assets/soundproof-product.jpg", position: "78% 55%" },
  { title: "Geocell & Geonet", note: "Materials for slopes and civil engineering", image: "/assets/geocell-product.jpg", position: "80% 56%" },
  { title: "Custom Materials", note: "OEM and ODM specifications available", image: "/assets/pvc-product.jpg", position: "48% 28%" },
];

const applications = [
  { title: "Construction Protection", text: "Scaffolding covers, building wraps and site safety barriers.", image: "/assets/soundproof-product.jpg", position: "65% 69%" },
  { title: "Transportation Covers", text: "Truck tarps, cargo covers and durable side curtains.", image: "/assets/pvc-product.jpg", position: "84% 80%" },
  { title: "Temporary Structures", text: "Tent fabrics, storage tents and weatherproof shelters.", image: "/assets/pvc-product.jpg", position: "78% 47%" },
  { title: "Civil Engineering", text: "Slope protection, drainage and ground stabilization.", image: "/assets/geocell-product.jpg", position: "72% 61%" },
];

const faqs = [
  ["What is the minimum order quantity (MOQ)?", "MOQ depends on the material, color, thickness and finishing requirements. Send your specification and our team will confirm the suitable production plan."],
  ["Can you provide OEM/ODM service?", "Yes. We support customized material construction, dimensions, colors, printing and finishing based on your project requirements."],
  ["What are your main export markets?", "We currently serve buyers in Japan, France, the United States, Canada, Australia and Thailand, with global delivery support."],
  ["How long is the production lead time?", "Lead time is confirmed after the specification and order quantity are reviewed. We will provide a clear production and shipment schedule with your quotation."],
];

function scrollToQuote() { document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" }); }

export function App({ pathname = "/" }) {
  let page = <HomePage />;
  if (pathname === "/product") page = <ProductPage />;
  else if (pathname === "/product-list") page = <ProductListPage />;
  else if (pathname === "/blog-list") page = <BlogListPage />;
  else if (pathname === "/blog-single") page = <BlogSinglePage />;
  else if (pathname === "/inquiry") page = <InquiryPage />;
  else if (pathname === "/contact") page = <ContactPage />;
  else if (pathname.startsWith("/products/")) page = <ProductTemplate />;
  return <>{page}<LanguageSwitcher pathname={pathname} /><WhatsAppButton /></>;
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const keepMenuOpenAfterClick = (event) => {
      if (event.target.closest(".products-nav-button")) window.setTimeout(() => setMenuOpen(true), 0);
    };
    document.addEventListener("click", keepMenuOpenAfterClick);
    return () => document.removeEventListener("click", keepMenuOpenAfterClick);
  }, []);
  function submitForm(event) { event.preventDefault(); setSubmitted(true); }
  return <main>
    <div className="utility"><span>Supplying high-performance PVC & EVA tarpaulins to a more resilient world</span><span>Global Shipping &nbsp; / &nbsp; Stable Quality &nbsp; / &nbsp; Reliable Supply</span></div>
    <header className="site-header"><button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Supfield Technology home"><img src="/assets/ept-logo.png" alt="EPT logo" /><span><strong>Supfield Technology</strong><small>Materials for a safer tomorrow</small></span></button><nav aria-label="Primary navigation"><div className="mega-menu-trigger" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}><button className="products-nav-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="products-mega-menu">Products <span>⌄</span></button>{menuOpen && <div id="products-mega-menu" className="mega-menu"><div className="mega-menu-head"><div><p>EXPLORE OUR MATERIALS</p><strong>Built for demanding projects.</strong></div><a href="#products" onClick={() => setMenuOpen(false)}>View all products →</a></div><div className="mega-menu-body"><div className="mega-menu-list"><span className="mega-label">PRODUCT FAMILIES</span><a href="#products" onClick={() => setMenuOpen(false)}>PVC Coated Fabrics <small>Custom colors & specifications</small></a><a href="#products" onClick={() => setMenuOpen(false)}>PVC Tarpaulins <small>Waterproof & UV resistant</small></a><a href="#products" onClick={() => setMenuOpen(false)}>Soundproof Barriers <small>Construction noise control</small></a><a href="#products" onClick={() => setMenuOpen(false)}>Geocell & Geonet <small>Roads, slopes & civil engineering</small></a></div><div className="mega-menu-list"><span className="mega-label">SHOP BY APPLICATION</span><a href="#applications" onClick={() => setMenuOpen(false)}>Construction Protection</a><a href="#applications" onClick={() => setMenuOpen(false)}>Transportation Covers</a><a href="#applications" onClick={() => setMenuOpen(false)}>Temporary Structures</a><a href="#applications" onClick={() => setMenuOpen(false)}>Civil Engineering</a><span className="mega-label lower">CUSTOM PROJECT?</span><button onClick={() => { setMenuOpen(false); scrollToQuote(); }}>Talk to our team →</button></div><a className="mega-image" href="#products" onClick={() => setMenuOpen(false)}><img src="/assets/pvc-product.jpg" alt="PVC coated fabric material" /><span>OEM / ODM MATERIALS<br /><strong>Made to specification →</strong></span></a></div></div>}</div><a href="#applications">Applications</a><a href="#factory">Factory</a><a href="#resources">Resources</a><a href="#about">About</a></nav><button className="quote-button" onClick={scrollToQuote}>Get a Quote <span>→</span></button></header>
    <section className="hero"><div className="hero-image" style={{ backgroundImage: "linear-gradient(90deg, rgba(5, 10, 12, .91), rgba(5, 10, 12, .7) 37%, rgba(5, 10, 12, .13) 77%), url('/assets/hero-factory.jpg')" }} /><div className="hero-copy content-width"><p className="eyebrow">Professional manufacturer since 2017</p><h1>Industrial PVC Fabrics.<br />Built for Demanding Projects.</h1><p className="lede">High-strength PVC and EVA tarpaulins for construction, transportation, temporary structures and more. OEM/ODM service for global importers and distributors.</p><div className="hero-actions"><button className="quote-button" onClick={scrollToQuote}>Get a Quote <span>→</span></button><a className="ghost-button" href="#products">View Products</a></div></div><div className="hero-tag">Durable Materials<br /><strong>Stronger Projects</strong></div></section>
    <section className="stat-rail" aria-label="Company facts"><div><strong>2017</strong><span>Founded in 2017</span></div><div><strong>60,000 m²</strong><span>Modern production base</span></div><div><strong>300+</strong><span>Experienced team members</span></div></section>
    <HomeContents />
    <section id="products" className="section products content-width"><div className="section-heading"><div><p className="eyebrow blue">Product portfolio</p><h2>Our Product Categories</h2></div><a href="#quote">View All Products →</a></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.title}><div className="product-image" style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position }} /><h3>{product.title}</h3><p>{product.note}</p></article>)}</div></section>
    <section className="advantage-band"><div className="content-width advantage-grid"><article><span className="line-mark" /><h3>Customization</h3><p>OEM/ODM service, customized sizes, colors, weights and special functions to meet your market needs.</p><a href="#quote">Learn More →</a></article><article><span className="line-mark" /><h3>Global Delivery</h3><p>Export experience supporting buyers in Japan, France, the United States, Canada, Australia and Thailand.</p><a href="#quote">Learn More →</a></article><article><span className="line-mark" /><h3>Quality Control</h3><p>From raw materials to finished products, we apply strict quality control throughout production.</p><a href="#factory">Learn More →</a></article></div></section>
    <section id="applications" className="section content-width"><div className="section-heading"><div><p className="eyebrow blue">Solutions by use case</p><h2>Applications</h2></div><a href="#quote">Explore More Applications →</a></div><div className="application-grid">{applications.map((item) => <article key={item.title} className="application-card" style={{ backgroundImage: `linear-gradient(0deg, rgba(5, 10, 14, .86), rgba(5, 10, 14, .04)), url(${item.image})`, backgroundPosition: item.position }}><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>
    <section id="factory" className="section factory content-width"><div className="section-heading"><div><p className="eyebrow blue">Manufacturing capability</p><h2>Our Factory Capabilities</h2></div><a href="#quote">Visit Our Factory →</a></div><div className="factory-layout"><div className="factory-copy"><h3>Scale. Technology.<br />Reliable Supply.</h3><p>Our 60,000 m² production base is equipped for coating, laminating, cutting and finishing. We build stable quality into every production run.</p><button className="outline-button" onClick={scrollToQuote}>Talk to our team →</button></div><div className="factory-gallery"><div className="factory-main" /><div className="factory-small first" /><div className="factory-small second" /></div></div></section>
    <section id="about" className="founder"><div className="founder-image"><img src="/assets/founder.jpg" alt="Supfield Technology founder" /></div><div className="founder-copy"><p className="eyebrow">A message from our founder</p><h2>Materials that make projects safer.</h2><p>We focus on reliable materials that help customers build with confidence. Our role is to turn real project requirements into practical, repeatable supply solutions.</p><strong>Supfield Technology</strong><span>Founder & technical advisor</span></div><blockquote>“Better Materials<br />for a Stronger Tomorrow.”</blockquote></section>
    <section id="resources" className="section resources content-width"><div className="section-heading"><div><p className="eyebrow blue">Support for buyers</p><h2>Resources</h2></div><a href="#quote">View All Resources →</a></div><div className="resource-grid"><article><h3>Download Catalog</h3><p>Get an overview of product categories, technical specifications and application guidance.</p><button className="outline-button" onClick={scrollToQuote}>Download Catalog →</button></article><article className="resource-photo" /><article><h3>Technical Information</h3><p>Learn more about product specifications, installation considerations and material selection.</p><button className="outline-button" onClick={scrollToQuote}>Browse Resources →</button></article></div></section>
    <section className="section faq-and-form content-width"><div className="faq"><p className="eyebrow blue">Frequently asked questions</p><h2>Questions, Answered.</h2>{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</div>)}</div><form id="quote" className="quote-form" onSubmit={submitForm}><p className="eyebrow">Get a quote</p><h2>Request a Free Quote</h2><p className="form-intro">Tell us your requirements and our team will get back to you shortly.</p>{submitted ? <div className="success-message"><strong>Thank you.</strong><p>Our sales team will contact you soon.</p><button type="button" onClick={() => setSubmitted(false)}>Submit another request</button></div> : <><div className="field-grid"><label>Name<input required placeholder="Your name" /></label><label>Company<input placeholder="Company name" /></label><label>Email<input type="email" required placeholder="Your email" /></label><label>Country<select defaultValue=""><option value="" disabled>Select country</option><option>Japan</option><option>France</option><option>United States</option><option>Canada</option><option>Australia</option><option>Thailand</option><option>Other</option></select></label></div><label>Product Interest<select defaultValue=""><option value="" disabled>Select product type</option><option>PVC Coated Fabrics</option><option>PVC Tarpaulins</option><option>Soundproof Barriers</option><option>Geocell & Geonet</option><option>Custom Materials</option></select></label><label>Message<textarea placeholder="Tell us your requirements, quantity, application and target specification." /></label><button className="form-submit" type="submit">Submit Request <span>→</span></button></>}</form></section>
    <footer><div className="content-width footer-grid"><div className="footer-brand"><img src="/assets/ept-logo.png" alt="EPT logo" /><strong>Supfield Technology</strong><p>Professional manufacturer of PVC and EVA tarpaulins, PVC coated fabrics and functional materials.</p></div><div><h4>Products</h4><a href="#products">PVC Coated Fabrics</a><a href="#products">PVC Tarpaulins</a><a href="#products">Soundproof Barriers</a><a href="#products">Geocell & Geonet</a></div><div><h4>Applications</h4><a href="#applications">Construction Protection</a><a href="#applications">Transportation Covers</a><a href="#applications">Temporary Structures</a><a href="#applications">Civil Engineering</a></div><div><h4>Get in Touch</h4><a href="mailto:li18061128988@gmail.com">li18061128988@gmail.com</a><a href="#quote">Xuzhou, China</a><button className="quote-button" onClick={scrollToQuote}>Get a Quote →</button></div></div><div className="content-width copyright">© 2026 Supfield Technology. All rights reserved.<span>Privacy Policy &nbsp; | &nbsp; Terms of Use</span></div></footer>
  </main>;
}
