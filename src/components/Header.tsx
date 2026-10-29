import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {getRopeContent} from '@/lib/rope-content';
import {products} from '@/lib/products';
import type {AppLocale} from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('navigation');
  const locale = await getLocale() as AppLocale;
  const copy = getRopeContent(locale);
  const aboutLabels: Record<AppLocale, string> = {
    en: 'About Us', fr: 'À propos', es: 'Sobre nosotros', ja: '会社概要', de: 'Über uns', zh: '关于我们'
  };
  const mobileMenuLabel: Record<AppLocale, string> = {en:'Menu', fr:'Menu', es:'Menú', ja:'メニュー', de:'Menü', zh:'菜单'};
  return (
    <header className="site-header">
      <div className="topline"><span>{copy.navigation.tagline}</span><span>{copy.navigation.support}</span></div>
      <div className="header-shell">
        <Link className="brand" href="/" aria-label="GEELUNG home">
          <img src="/assets/geelung-logo-web.jpg" alt="GEELUNG 吉隆环保 logo" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-products"><Link href="/products">{t('products')}</Link><div className="mega-menu">{products.map((product) => { const item = copy.products[product.key]; return <Link key={product.slug} href={`/products/${product.slug}`}><img src={product.image} alt={locale === 'en' ? product.imageAlt : item.title} width={product.width} height={product.height} /><span><strong>{item.title}</strong><small>{item.description}</small></span></Link>; })}</div></div>
          <Link href="/#applications">{t('applications')}</Link>
          <Link href="/resources">{t('resources')}</Link>
          <Link href="/about">{aboutLabels[locale]}</Link>
          <Link href="/contact">{t('contact')}</Link>
          {locale === 'en' && <Link href="/blog">Blog</Link>}
        </nav>
        <details className="mobile-nav"><summary aria-label={mobileMenuLabel[locale]}>{mobileMenuLabel[locale]}</summary><div><Link href="/products">{t('products')}</Link><Link href="/#applications">{t('applications')}</Link><Link href="/resources">{t('resources')}</Link><Link href="/about">{aboutLabels[locale]}</Link><Link href="/contact">{t('contact')}</Link>{locale === 'en' && <Link href="/blog">Blog</Link>}<Link className="button" href="/inquiry">{t('rfq')}</Link></div></details>
        <div className="header-actions"><LanguageSwitcher /><Link className="button button-small" href="/inquiry">{t('rfq')}</Link></div>
      </div>
    </header>
  );
}
