import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {SITE_URL} from '@/lib/site';
import {WhatsAppButton} from '@/components/WhatsAppButton';
import {Footer} from '@/components/Footer';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {index: true, follow: true},
  icons: {icon: '/assets/geelung-logo-web.jpg'}
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Readonly<{children: React.ReactNode; params: Promise<{locale: string}>}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <html lang={locale}><body><NextIntlClientProvider>{children}<Footer /><WhatsAppButton /></NextIntlClientProvider></body></html>;
}

