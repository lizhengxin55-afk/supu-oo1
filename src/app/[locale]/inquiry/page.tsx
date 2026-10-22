import {redirect} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';

export default async function InquiryPage({params}: {params: Promise<{locale: AppLocale}>}) {
  const {locale} = await params;
  redirect({href: '/contact', locale});
}

