import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react";

const initialValues = { name: "", email: "", phone: "", company: "", country: "", productNeed: "", message: "", website: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;
const formSubmitEndpoint = "https://formsubmit.co/lizhengxin55@gmail.com";

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your business email.";
  else if (!emailPattern.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!phonePattern.test(values.phone)) errors.phone = "Use an international format, for example +1 212 555 0100.";
  return errors;
}

export function InquiryPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("submitted") === "1") setStatus("success");
  }, []);
  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };
  const submit = (event) => {
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) { event.preventDefault(); setErrors(nextErrors); setStatus("invalid"); return; }
    setStatus("sending");
  };
  const field = (name) => ({ value: values[name], onChange: update, "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });
  return <main className="inquiry-page">
    <header className="inquiry-header"><a className="inquiry-brand" href="/"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a><nav><a href="/">Home</a><a href="/products/pvc-soundproof-barrier">Products</a><a href="/contact">Contact</a></nav><a href="/contact" className="inquiry-header-link">Contact Alan <ArrowRight size={16} /></a></header>
    <section className="inquiry-hero"><p className="inquiry-eyebrow">B2B PROJECT ENQUIRY</p><h1>Tell us what you need.<br />We will help shape the specification.</h1><p>Share the few essential details first. Our export team will follow up with the right material, fabrication and delivery questions.</p><div className="inquiry-proof"><span><CheckCircle size={17} weight="fill" /> OEM & ODM project support</span><span><ShieldCheck size={17} weight="fill" /> Your details stay with our sales team</span></div></section>
    <section className="inquiry-content"><aside><p className="inquiry-eyebrow dark">WHAT HAPPENS NEXT</p><h2>A clearer route to quotation.</h2><ol><li><span>01</span><div><strong>Review</strong><p>We check your application and key requirements.</p></div></li><li><span>02</span><div><strong>Recommend</strong><p>We clarify a suitable material and fabrication approach.</p></div></li><li><span>03</span><div><strong>Quote</strong><p>We align on quantity, delivery destination and next steps.</p></div></li></ol><a href="mailto:lizhengxin55@gmail.com"><EnvelopeSimple size={18} /> Prefer email? Write to Alan</a></aside><form className="inquiry-form" action={formSubmitEndpoint} method="POST" noValidate onSubmit={submit}><input type="hidden" name="_subject" value="New Supfield website enquiry" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value={typeof window === "undefined" ? "https://www.geelung.com/inquiry?submitted=1" : `${window.location.origin}/inquiry?submitted=1`} /><input type="hidden" name="_replyto" value={values.email} /><input type="hidden" name="_honey" value={values.website} /><div className="form-title"><p className="inquiry-eyebrow dark">YOUR PROJECT DETAILS</p><h2>Start your enquiry</h2><span><b>*</b> Required fields</span></div><div className="form-grid"><label className={errors.name ? "has-error" : ""}>Full name <b>*</b><input name="name" placeholder="e.g. Michael Johnson" autoComplete="name" {...field("name")} />{errors.name && <em id="name-error">{errors.name}</em>}</label><label className={errors.email ? "has-error" : ""}>Business email <b>*</b><input name="email" type="email" placeholder="you@company.com" autoComplete="email" {...field("email")} />{errors.email && <em id="email-error">{errors.email}</em>}</label><label className={errors.phone ? "has-error" : ""}>Phone / WhatsApp <b>*</b><input name="phone" type="tel" inputMode="tel" placeholder="e.g. +1 212 555 0100" autoComplete="tel" {...field("phone")} />{errors.phone && <em id="phone-error">{errors.phone}</em>}</label><label>Company name<input name="company" placeholder="Your company" autoComplete="organization" {...field("company")} /></label><label>Country / region<select name="country" {...field("country")}><option value="">Select your market</option><option>United States</option><option>Canada</option><option>Australia</option><option>France</option><option>Japan</option><option>Thailand</option><option>Other</option></select></label><label>Product requirement<input name="product_need" placeholder="e.g. PVC soundproof barrier" value={values.productNeed} onChange={(event) => setValues((current) => ({ ...current, productNeed: event.target.value }))} /></label></div><label className="message-field">Message<textarea name="message" rows="5" placeholder="Application, dimensions, quantity, delivery city or other requirements..." {...field("message")} /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" {...field("website")} /></label>{status === "invalid" && <p className="form-feedback error" role="alert">Please complete the required fields before submitting.</p>}{status === "error" && <p className="form-feedback error" role="alert">We could not send your enquiry. Please try again or email Alan directly.</p>}{status === "success" && <p className="form-feedback success" role="status"><CheckCircle size={18} weight="fill" /> Thank you. Your enquiry has been sent successfully.</p>}<button disabled={status === "sending"} type="submit">{status === "sending" ? "Sending enquiry..." : "Send enquiry"} <ArrowRight size={18} /></button><p className="privacy-note">By submitting, you agree that Supfield may use these details to respond to your business enquiry.</p></form></section>
    <footer className="inquiry-footer"><a className="inquiry-brand" href="/"><img src="/assets/ept-logo.png" alt="EPT Supfield Technology" /><span>SUPFIELD<br />TECHNOLOGY</span></a><p>Industrial PVC materials and custom fabrication for global projects.</p><a href="mailto:lizhengxin55@gmail.com">lizhengxin55@gmail.com</a></footer>
  </main>;
}
