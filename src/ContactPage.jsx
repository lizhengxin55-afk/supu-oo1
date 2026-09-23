import { useState } from "react";
import { ArrowRight, ArrowUpRight, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

const contact = {
  name: "Alan",
  role: "CEO",
  email: "li18061128988@gmail.com",
  phone: "+86 000 0000 0000",
  address: "No. 23 Huaxia Road, Tongshan District, Xuzhou, Jiangsu, China",
  mapUrl: "https://www.openstreetmap.org/?mlat=34.181162&mlon=117.169698#map=14/34.181162/117.169698",
  embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=117.135%2C34.150%2C117.205%2C34.212&layer=mapnik&marker=34.181162%2C117.169698",
};

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return <main className="contact-page">
    <header className="contact-header"><a className="contact-brand" href="/" aria-label="Supfield home"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a><nav><a href="/">Home</a><a href="/products/pvc-soundproof-barrier">Products</a><a className="active" href="/contact">Contact</a></nav><a className="header-message" href={`mailto:${contact.email}`}>Email Alan <ArrowUpRight size={16} /></a></header>

    <section className="contact-hero"><div><p className="contact-eyebrow">CONTACT SUPFIELD</p><h1>Talk to the people behind your next material solution.</h1><p>Whether you are sourcing a standard material or specifying a project system, our team is ready to start with the details that matter.</p></div><div className="contact-hero-meta"><span>OEM & ODM SUPPORT</span><span>GLOBAL EXPORT ENQUIRIES</span></div></section>

    <section className="contact-main"><div className="contact-intro"><p className="contact-eyebrow dark">YOUR DIRECT CONTACT</p><h2>One point of contact, from specification to shipment.</h2><p>Send your project use case, key dimensions, quantities and delivery country. We will direct the enquiry to the appropriate material and production team.</p><div className="alan-card"><img src="/assets/founder.jpg" alt="Alan, CEO of Supfield Technology" /><div><span>MEET YOUR CONTACT</span><h3>{contact.name}</h3><p>{contact.role}</p><a href={`mailto:${contact.email}`}>Email {contact.name} <ArrowRight size={16} /></a></div></div></div><div className="contact-details"><a className="detail-row" href={`mailto:${contact.email}`}><EnvelopeSimple size={23} weight="light" /><div><span>EMAIL</span><strong>{contact.email}</strong></div><ArrowUpRight size={18} /></a><a className="detail-row" href={`tel:${contact.phone.replace(/\s/g, "")}`}><Phone size={23} weight="light" /><div><span>PHONE</span><strong>{contact.phone}</strong></div><ArrowUpRight size={18} /></a><a className="detail-row" href={contact.mapUrl} target="_blank" rel="noreferrer"><MapPin size={23} weight="light" /><div><span>FACTORY ADDRESS</span><strong>{contact.address}</strong></div><ArrowUpRight size={18} /></a></div></section>

    <section className="map-section"><div className="map-heading"><div><p className="contact-eyebrow">FIND OUR FACTORY</p><h2>Visit us in Xuzhou.</h2></div><a href={contact.mapUrl} target="_blank" rel="noreferrer">Open in OpenStreetMap <ArrowUpRight size={17} /></a></div><div className="map-frame"><iframe title="Supfield Technology location in Xuzhou" src={contact.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="map-address-card"><img src="/assets/ept-logo.png" alt="EPT" /><div><span>SUPFIELD TECHNOLOGY</span><strong>江苏省徐州市铜山区华夏路23号</strong><a href={contact.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowRight size={15} /></a></div></div></div></section>

    <section className="contact-form-section"><div><p className="contact-eyebrow">START A CONVERSATION</p><h2>Bring us the project brief.</h2><p>We will respond with the next practical step for your material, fabrication or shipment requirement.</p></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Full name<input required placeholder="Your name" /></label><label>Business email<input required type="email" placeholder="you@company.com" /></label><label>What can we help with?<textarea required rows="4" placeholder="Product, dimensions, quantity, delivery country..." /></label><button type="submit">{submitted ? "Message received — thank you" : "Send an enquiry"} <ArrowRight size={17} /></button></form></section>

    <footer className="contact-footer"><a className="contact-brand" href="/"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a><p>Industrial PVC materials and custom fabrication for global projects.</p><a href={`mailto:${contact.email}`}>{contact.email}</a></footer>
  </main>;
}
