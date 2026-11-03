'use client';

import {Link} from '@/i18n/navigation';

type Props = {
  company: string;
  heading: string;
  intro: string;
  requestLabel: string;
  catalogLabel: string;
  proof: string[];
  proofSub: string[];
};

const slides = [
  {src:'/assets/geelung-factory-spools.webp', alt:'GEELUNG braided rope winding production line'}
];

export function HomeHeroCarousel({company, heading, intro, requestLabel, catalogLabel, proof, proofSub}: Props) {
  return <section className="plan-one-hero plan-one-hero-carousel">
    {slides.map((slide, index) => <img key={slide.src} className={`plan-one-hero-slide plan-one-hero-slide-${index} is-active`} src={slide.src} alt={slide.alt} width="1600" height="1086" fetchPriority="high" />)}
    <div className="plan-one-shade" />
    <div className="plan-one-shell plan-one-hero-copy">
      <h1>{company}</h1>
      <p>{heading}</p>
      <p className="plan-one-intro">{intro}</p>
      <div className="button-row"><Link className="button" href="/inquiry">{requestLabel}</Link><a className="plan-one-hero-link" href="/assets/jilong-product-catalog.pdf">{catalogLabel} <span aria-hidden>→</span></a></div>
      <div className="plan-one-proof">{proof.map((item, index) => <div key={item}><strong>{item}</strong><span>{proofSub[index]}</span></div>)}</div>
    </div>
  </section>;
}
