import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return {title: locale === 'zh' ? '询盘已提交 | GEELUNG' : 'Inquiry Submitted | GEELUNG', robots: {index: false, follow: false}};
}

export default async function ThankYouPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const chinese = locale === 'zh';
  return <><Header /><main><section className="page-hero"><div className="container thank-you"><p className="eyebrow">{chinese ? 'GEELUNG · 询盘已提交' : 'GEELUNG · INQUIRY SUBMITTED'}</p><h1>{chinese ? '感谢您的询盘' : 'Thank you for your inquiry'}</h1><p className="lead">{chinese ? '我们已收到您的需求信息，并将根据产品、规格、数量和目的国进行后续对接。' : 'We have received your requirement and will follow up based on the product, specification, quantity and destination you provided.'}</p><div className="button-row"><Link className="button" href="/products">{chinese ? '查看产品中心' : 'View Products'}</Link><Link className="button button-secondary" href="/">{chinese ? '返回首页' : 'Back to Home'}</Link></div></div></section></main></>;
}
