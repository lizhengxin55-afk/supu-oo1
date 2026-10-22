import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';

export async function Header() {
  const t = await getTranslations('navigation');
  return (
    <header className="site-header">
      <div className="topline"><span>{t('tagline')}</span><span>{t('support')}</span></div>
      <div className="header-shell">
        <Link className="brand" href="/" aria-label="Jilong Technology home">
          <img src="/assets/jilong-logo.jpg" alt="Jilong Technology logo" />
          <strong>JILONG TECHNOLOGY</strong>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/products/pvc-ultrafiltration-membrane-housing">{t('products')}</Link>
          <Link href="/#applications">{t('applications')}</Link>
          <Link href="/#resources">{t('resources')}</Link>
          <Link href="/contact">{t('contact')}</Link>
        </nav>
        <div className="header-actions"><LanguageSwitcher /><Link className="button button-small" href="/inquiry">{t('rfq')}</Link></div>
      </div>
    </header>
  );
}

