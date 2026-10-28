import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

const aboutLabels: Record<AppLocale, string> = {
  en: 'About Us', fr: 'À propos', es: 'Sobre nosotros', ja: '会社概要', de: 'Über uns', zh: '关于我们'
};

const supportLabels: Record<AppLocale, string> = {
  en: 'Start an RFQ', fr: 'Démarrer une demande', es: 'Iniciar una solicitud', ja: 'RFQを開始', de: 'RFQ starten', zh: '开始询盘'
};

export async function Footer() {
  const locale = await getLocale() as AppLocale;
  const t = await getTranslations('navigation');
  const copy = getRopeContent(locale);

  return <footer className="footer"><div className="container footer-grid">
    <div className="footer-brand"><strong>{locale === 'zh' ? 'GEELUNG · 吉隆环保' : 'GEELUNG'}</strong><p>{copy.navigation.tagline}</p><p className="footer-address">{locale === 'zh' ? '江苏省徐州市沛县龙固镇工业园区' : 'Longgu Industrial Park, Peixian, Xuzhou, Jiangsu, China'}</p></div>
    <nav aria-label="Products"><h3>{t('products')}</h3>{Object.values(copy.products).map((product, index) => <Link key={product.title} href={`/products/${['crochet-rope', 'braided-rope', 'rolled-braided-rope', 'custom-braided-rope'][index]}`}>{product.title}</Link>)}</nav>
    <nav aria-label="Resources"><h3>{t('resources')}</h3><Link href="/resources">{copy.home.resourcesTitle}</Link><Link href="/about">{aboutLabels[locale]}</Link><Link href="/contact">{t('contact')}</Link></nav>
    <div className="footer-cta"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 采购支持' : 'GEELUNG · B2B SUPPORT'}</p><h3>{supportLabels[locale]}</h3><p>{copy.navigation.support}</p><Link className="button button-footer" href="/inquiry">{t('rfq')}</Link></div>
  </div><div className="container footer-bottom"><span>© 2026 GEELUNG · 吉隆环保</span><span>{locale === 'zh' ? '全球 B2B 采购支持' : 'Global B2B procurement support'}</span></div></footer>;
}

