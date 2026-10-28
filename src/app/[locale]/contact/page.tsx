import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {QuoteForm} from '@/components/QuoteForm';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};
export async function generateMetadata({params}: Props): Promise<Metadata> { const {locale}=await params; const t=await getTranslations({locale,namespace:'contact'}); return {title:t('title'),description:t('description'),alternates:{canonical:absoluteUrl(locale,'/contact'),languages:languageAlternates('/contact')}}; }

export default async function ContactPage({params}: Props) {
  const {locale}=await params; setRequestLocale(locale); const t=await getTranslations('contact'); const isChinese = locale === 'zh';
  const labels = {formTitle:t('formTitle'),name:t('name'),email:t('email'),phone:t('phone'),company:t('company'),country:t('country'),message:t('message'),submit:t('submit'),helper:isChinese ? '请填写带 * 的必填信息；提交后将直接打开 WhatsApp 对话，方便快速确认需求。' : 'Complete the required fields marked with *. Submission opens WhatsApp directly so your requirement can be confirmed quickly.',opening:isChinese ? '正在打开 WhatsApp 对话…' : 'Opening WhatsApp…'};
  return <><Header /><main><section className="page-hero"><div className="container"><p className="eyebrow">{isChinese ? 'GEELUNG · 联系与询盘' : 'GEELUNG · CONTACT & RFQ'}</p><h1>{t('title')}</h1><p className="lead">{t('description')}</p></div></section><section className="section"><div className="container contact-grid"><div className="contact-map"><p className="eyebrow">{t('addressTitle')}</p><h2>{t('address')}</h2><p>{isChinese ? '欢迎在询盘中告知产品类型、目标规格、数量、包装偏好与目的国，我们将据此进行后续对接。' : 'Include product type, target specification, quantity, packing preference and destination in your RFQ for a clearer follow-up.'}</p><iframe className="map" title="GEELUNG factory map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=116.784878%2C34.893788%2C116.824878%2C34.933788&layer=mapnik&marker=34.913788%2C116.804878" /></div><QuoteForm labels={labels} /></div></section></main></>;
}

