import { useState } from "react";
import {
  ArrowRight,
  CaretDown,
  CheckCircle,
  Cube,
  Factory,
  GlobeSimple,
  Package,
  Palette,
  Ruler,
  ShieldCheck,
  Truck,
  Waveform,
} from "@phosphor-icons/react";

// Replace this object to publish a new product while keeping the same page structure.
const product = {
  name: "PVC Soundproof Barrier",
  eyebrow: "Construction & industrial noise control",
  headline: "Make demanding sites quieter, safer, and easier to manage.",
  intro: "A durable PVC soundproof barrier engineered for temporary construction enclosures, industrial work zones, and infrastructure projects.",
  image: "/assets/soundproof-product.jpg",
  materialImage: "/assets/pvc-product.jpg",
  anatomyImage: "/assets/soundproof-material-anatomy.png",
  applications: [
    ["Construction sites", "Temporary perimeter noise control", "/assets/soundproof-product.jpg"],
    ["Industrial zones", "Flexible barriers around active equipment", "/assets/factory-production.png"],
    ["Infrastructure works", "Portable screening for road and rail projects", "/assets/hero-factory.jpg"],
  ],
  specifications: [
    ["Material", "PVC coated polyester fabric"],
    ["Available colors", "Blue, gray, black and custom colors"],
    ["Width", "Up to 3.2 m; custom fabrication available"],
    ["Finish options", "Reinforced hems, eyelets, welding and printing"],
  ],
};

const advantages = [
  [ShieldCheck, "Built for repeated use", "Weather-ready PVC faces help the barrier endure outdoor jobsite conditions."],
  [Waveform, "Control site noise", "A layered, reinforced structure supports practical perimeter noise management."],
  [Cube, "Made to fit the job", "Specify dimensions, edge reinforcement, eyelets, color and packaging."],
  [GlobeSimple, "Export-ready support", "OEM and ODM coordination for international distributors and project buyers."],
];

const process = [
  [Palette, "01", "Define", "Color, material weight and application requirements"],
  [Ruler, "02", "Engineer", "Dimensions, hems, eyelets and joining method"],
  [Factory, "03", "Produce", "Controlled fabrication and order inspection"],
  [Package, "04", "Pack", "Export packaging tailored to your delivery plan"],
  [Truck, "05", "Deliver", "Coordinate shipment documentation and dispatch"],
];

const companyMoments = [
  ["Factory team", "A production team aligned around consistent material quality.", "/assets/supfield-team-factory.png", "team"],
  ["Customer visit", "Make product evaluation more transparent with a factory-floor conversation.", "/assets/supfield-customer-visit.png", "visit"],
  ["Export packing", "Protect materials and documentation through each dispatch stage.", "/assets/supfield-packing-shipping.png", "packing"],
  ["Engineering support", "Turn project requirements into clearer fabrication details.", "/assets/supfield-engineering.png", "engineering"],
];

const faqs = [
  ["Can you make custom sizes?", "Yes. Tell us the finished size, installation method and required edge details. Our team will recommend a practical fabrication approach."],
  ["Which details can be customized?", "Size, color, fabric construction, hem reinforcement, eyelet spacing, welding, printing and packaging can be discussed for project orders."],
  ["Is this product suitable for outdoor use?", "It is designed as a durable PVC-based construction material. Please share the operating environment so we can recommend an appropriate specification."],
];

export function ProductTemplate() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const goQuote = () => document.querySelector("#product-quote")?.scrollIntoView({ behavior: "smooth" });

  return <main className="product-page">
    <header className="product-header">
      <a className="product-brand" href="/" aria-label="Supfield home"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a>
      <nav aria-label="Product template navigation"><a href="#story">Overview</a><a href="#applications">Applications</a><a href="#specifications">Specifications</a><a href="/contact">Contact</a></nav>
      <button className="header-quote" onClick={goQuote}>Get a Quote <ArrowRight size={16} weight="bold" /></button>
    </header>

    <section className="product-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(7,10,12,.92) 0%, rgba(7,10,12,.68) 48%, rgba(7,10,12,.16) 100%), url(${product.image})` }}>
      <div className="hero-content">
        <p className="eyebrow"><span />{product.eyebrow}</p>
        <h1>{product.name}</h1>
        <p className="hero-intro">{product.headline}</p>
        <p className="hero-copy">{product.intro}</p>
        <div className="hero-actions"><button className="light-cta" onClick={goQuote}>Request a project quote <ArrowRight size={18} weight="bold" /></button><a href="#specifications">View specifications</a></div>
      </div>
      <div className="hero-foot"><span>SUPFIELD / PRODUCT SERIES</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>

    <section id="story" className="section challenge-section"><div className="section-label">01 / THE CHALLENGE</div><div><p className="kicker">Noise control should not compromise site flow.</p><h2>Temporary barriers need to perform in the real world.</h2></div><p className="side-copy">Construction and industrial projects move fast. A workable soundproof barrier needs to be durable, straightforward to install and adaptable to the changing perimeter—not just attractive in a specification sheet.</p></section>

    <section className="material-section"><div className="material-photo" style={{ backgroundImage: `url(${product.materialImage})` }} /><div className="material-copy"><p className="eyebrow dark"><span />THE MATERIAL SOLUTION</p><h2>Reinforced fabric, engineered around the job.</h2><p>Built on a reinforced polyester core and finished with protective PVC layers, the material balances toughness, practical flexibility and a clean professional finish.</p><div className="material-tags"><span>PVC coated</span><span>Reinforced core</span><span>Custom fabrication</span></div><button onClick={goQuote}>Discuss your application <ArrowRight size={17} /></button></div></section>

    <section className="section anatomy-section"><div className="anatomy-head"><div><p className="eyebrow dark"><span />WHAT MAKES IT WORK</p><h2>Designed as a layered noise-control system.</h2></div><p>Clear material construction gives procurement teams a practical foundation for specification, fabrication and installation conversations.</p></div><img src={product.anatomyImage} alt="Exploded PVC soundproof barrier material layers" className="anatomy-image" /></section>

    <section id="applications" className="applications-section"><div className="section applications-heading"><div><p className="eyebrow"><span />WHERE IT FITS</p><h2>Built for high-activity environments.</h2></div><a href="#product-quote">Tell us about your project <ArrowRight size={17} /></a></div><div className="application-grid">{product.applications.map(([title, note, image], index) => <article className="application-card" key={title}><div className="application-image" style={{ backgroundImage: `url(${image})` }} /><div><small>0{index + 1}</small><h3>{title}</h3><p>{note}</p></div></article>)}</div></section>

    <section id="factory-story" className="moments-section"><div className="section moments-heading"><div><p className="eyebrow dark"><span />BEHIND THE MATERIAL</p><h2>Built by people. Checked with customers. Delivered for the job.</h2></div><p>These four image slots can be replaced for every product or project page, while the surrounding trust story stays consistent.</p></div><div className="section moments-grid">{companyMoments.map(([title, copy, image, type], index) => <article className={`moment-card ${type}`} key={title}><img src={image} alt={`${title} at Supfield`} /><div><small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className="advantage-section"><div className="section"><p className="eyebrow"><span />PRACTICAL ADVANTAGES</p><h2>A product page is only the start.<br />The details make the difference.</h2><div className="advantage-grid">{advantages.map(([Icon, title, copy]) => <article key={title}><Icon size={27} weight="light" /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section customization-section"><div className="custom-copy"><p className="eyebrow dark"><span />OEM & ODM PROJECTS</p><h2>From a roll of material to a site-ready system.</h2><p>Use this template to lead a buyer from product understanding to the exact information your sales team needs to quote accurately.</p><button onClick={goQuote}>Start a custom enquiry <ArrowRight size={17} /></button></div><div className="process-list">{process.map(([Icon, num, title, copy]) => <div className="process-item" key={num}><span>{num}</span><Icon size={22} weight="light" /><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>

    <section id="specifications" className="spec-section"><div className="section spec-layout"><div><p className="eyebrow"><span />TECHNICAL DETAILS</p><h2>Specification, without the clutter.</h2><p>Replace the rows below for each new product. Keep key purchase details short, clear and easy to scan.</p></div><dl>{product.specifications.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl></div></section>

    <section className="section faq-section"><div><p className="eyebrow dark"><span />COMMON QUESTIONS</p><h2>Answers before the enquiry.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "faq-item open" : "faq-item"} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><CaretDown size={19} /></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>

    <section id="product-quote" className="quote-section"><div className="quote-copy"><p className="eyebrow"><span />PROJECT ENQUIRY</p><h2>Tell us what the site needs.</h2><p>Share your use case and key dimensions. We will help narrow the product configuration before quotation.</p><div><CheckCircle size={18} weight="fill" /> Custom project guidance</div><div><CheckCircle size={18} weight="fill" /> English-speaking export support</div></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Full name<input required name="name" placeholder="Your name" /></label><label>Business email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Project requirement<textarea required name="details" rows="4" placeholder="Application, size, quantity, delivery country..." /></label><button type="submit">{submitted ? "Enquiry received — thank you" : "Request a quote"} <ArrowRight size={17} /></button></form></section>

    <footer className="product-footer"><a className="product-brand" href="/"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a><p>Source manufacturer for industrial PVC materials and project fabrication.</p><a href="mailto:li18061128988@gmail.com">li18061128988@gmail.com</a></footer>
  </main>;
}
