'use client';

import {useEffect, useState} from 'react';
import {Link} from '@/i18n/navigation';

type Props = {
  company: string;
  heading: string;
  intro: string;
  requestLabel: string;
  catalogLabel: string;
  proof: string[];
  proofSub: string[];
  locale: string;
};

const slides = [
  {src:'/assets/geelung-factory-spools.webp', alt:'GEELUNG braided rope winding production line'},
  {src:'/assets/geelung-crochet-cord-detail.webp', alt:'GEELUNG white crochet cord detail'},
  {src:'/assets/geelung-white-rope-spool-clean.webp', alt:'GEELUNG white braided rope on a clean industrial spool'}
];

export function HomeHeroCarousel({company, heading, intro, requestLabel, catalogLabel, proof, proofSub, locale}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isChinese = locale === 'zh';

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showSlide = (index: number) => setActive((index + slides.length) % slides.length);

  return <section className="plan-one-hero plan-one-hero-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    {slides.map((slide, index) => <img key={slide.src} className={`plan-one-hero-slide plan-one-hero-slide-${index}${index === active ? ' is-active' : ''}`} src={slide.src} alt={index === active ? slide.alt : ''} width="1600" height="1086" fetchPriority={index === 0 ? 'high' : undefined} />)}
    <div className="plan-one-shade" />
    <div className="plan-one-shell plan-one-hero-copy">
      <p className="plan-one-overline">{company}</p>
      <h1>{company}</h1>
      <p>{heading}</p>
      <p className="plan-one-intro">{intro}</p>
      <div className="button-row"><Link className="button" href="/inquiry">{requestLabel}</Link><a className="plan-one-hero-link" href="/assets/jilong-product-catalog.pdf">{catalogLabel} <span aria-hidden>→</span></a></div>
      <div className="plan-one-proof">{proof.map((item, index) => <div key={item}><strong>{item}</strong><span>{proofSub[index]}</span></div>)}</div>
    </div>
    <div className="plan-one-carousel-controls" aria-label={isChinese ? '首页照片轮播' : 'Homepage image carousel'}>
      <button type="button" className="plan-one-carousel-arrow" onClick={() => showSlide(active - 1)} aria-label={isChinese ? '上一张照片' : 'Previous photo'}>←</button>
      <div className="plan-one-carousel-dots">{slides.map((slide, index) => <button type="button" key={slide.src} className={index === active ? 'is-active' : ''} onClick={() => showSlide(index)} aria-label={isChinese ? `查看第 ${index + 1} 张照片` : `Show photo ${index + 1}`} aria-current={index === active ? 'true' : undefined} />)}</div>
      <button type="button" className="plan-one-carousel-arrow" onClick={() => showSlide(active + 1)} aria-label={isChinese ? '下一张照片' : 'Next photo'}>→</button>
    </div>
  </section>;
}
