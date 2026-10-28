import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('navigation');
  const locale = await getLocale() as AppLocale;
  const copy = getRopeContent(locale);
  return (
    <header className="site-header">
      <div className="topline"><span>{copy.navigation.tagline}</span><span>{copy.navigation.support}</span></div>
      <div className="header-shell">
        <Link className="brand" href="/" aria-label="GEELUNG home">
          <img src="/assets/geelung-logo-web.jpg" alt="GEELUNG 吉隆环保 logo" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/products/crochet-rope">{t('products')}</Link>
          <Link href="/#applications">{t('applications')}</Link>
          <Link href="/resources">{t('resources')}</Link>
          <Link href="/contact">{t('contact')}</Link>
        </nav>
        <div className="header-actions"><LanguageSwitcher /><Link className="button button-small" href="/inquiry">{t('rfq')}</Link></div>
      </div>
    </header>
  );
}

