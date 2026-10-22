import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};
export async function generateMetadata({params}: Props): Promise<Metadata> { const {locale}=await params; const t=await getTranslations({locale,namespace:'contact'}); return {title:t('title'),description:t('description'),alternates:{canonical:absoluteUrl(locale,'/contact'),languages:languageAlternates('/contact')}}; }

export default async function ContactPage({params}: Props) {
  const {locale}=await params; setRequestLocale(locale); const t=await getTranslations('contact');
  return <><Header /><main><section className="page-hero"><div className="container"><h1>{t('title')}</h1><p className="lead">{t('description')}</p></div></section><section className="section"><div className="container contact-grid"><div><p className="eyebrow">{t('addressTitle')}</p><h2>{t('address')}</h2><iframe className="map" title="Jilong Technology factory map" src="https://www.openstreetmap.org/export/embed.html?bbox=116.784878%2C34.893788%2C116.824878%2C34.933788&layer=mapnik&marker=34.913788%2C116.804878" /></div><QuoteForm t={t} /></div></section></main></>;
}

function QuoteForm({t}: {t: Awaited<ReturnType<typeof getTranslations>>}) { return <form className="form-card"><h2>{t('formTitle')}</h2><div className="form-grid"><input required placeholder={t('name')} aria-label={t('name')} /><input type="email" required placeholder={t('email')} aria-label={t('email')} /><input required placeholder={t('phone')} aria-label={t('phone')} /><input placeholder={t('company')} aria-label={t('company')} /><input placeholder={t('country')} aria-label={t('country')} /><textarea placeholder={t('message')} aria-label={t('message')} /><button className="button" type="submit">{t('submit')}</button></div></form>; }

