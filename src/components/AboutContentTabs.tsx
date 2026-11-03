'use client';

import {useId, useState} from 'react';

export type AboutTab = {
  label: string;
  title: string;
  paragraphs?: string[];
  points?: Array<[string, string]>;
  signature?: string;
};

type Props = {tabs: AboutTab[]; ariaLabel: string};

export function AboutContentTabs({tabs, ariaLabel}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const active = tabs[activeIndex];

  return <>
    <nav className="about-section-nav about-tabs" aria-label={ariaLabel}>
      <div role="tablist" aria-label={ariaLabel}>{tabs.map((tab, index) => <button key={tab.label} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={panelId} onClick={() => setActiveIndex(index)}>{tab.label}</button>)}</div>
    </nav>
    <section className="section about-tab-section"><div id={panelId} role="tabpanel" className="container about-tab-panel">
      <h2>{active.title}</h2>
      {active.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {active.points && <div className="about-tab-points">{active.points.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>}
      {active.signature && <strong>{active.signature}</strong>}
    </div></section>
  </>;
}
