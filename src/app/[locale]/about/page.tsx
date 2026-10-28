import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

type AboutCopy = {
  title: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  focusTitle: string;
  focusText: string;
  imageAlt: string;
  facts: Array<[string, string]>;
  supportTitle: string;
  supportText: string;
  supportItems: Array<[string, string]>;
  recordsTitle: string;
  recordsText: string;
  quote: string;
  resources: string;
};

const english: AboutCopy = {
  title: 'About GEELUNG',
  metaDescription: 'Learn about Jiangsu Geelung Environmental Protection Technology Co., Ltd. and its B2B support for braided rope and crochet rope procurement.',
  eyebrow: 'GEELUNG · COMPANY PROFILE',
  intro: 'Jiangsu Geelung Environmental Protection Technology Co., Ltd. is located in Longgu Industrial Park, Peixian, Xuzhou, Jiangsu, China. We support overseas buyers with braided rope and crochet rope products, specification communication, export packing coordination and responsive RFQ service.',
  focusTitle: 'A practical partner for industrial rope procurement',
  focusText: 'Our current product focus is white braided rope and crochet rope supplied in rolls, large spools and export-ready packing formats. For each project, we work from the required diameter, construction, quantity, application and destination so the quotation and supply plan are clear before production.',
  imageAlt: 'GEELUNG braided rope rolls prepared for industrial orders',
  facts: [
    ['Company', 'Jiangsu Geelung Environmental Protection Technology Co., Ltd.'],
    ['Brand', 'GEELUNG · 吉隆环保'],
    ['Location', 'Longgu Industrial Park, Peixian, Xuzhou, Jiangsu, China'],
    ['Product focus', 'Braided rope and crochet rope for B2B supply'],
    ['Service', 'Specification review, packing confirmation and export inquiry support']
  ],
  supportTitle: 'Built around a clearer B2B workflow',
  supportText: 'We keep communication focused on the information that affects purchasing: the rope type, target size, quantity, intended application, packing preference and destination. This helps both sides confirm the correct product format and move efficiently from RFQ to shipment coordination.',
  supportItems: [
    ['Specification confirmation', 'Share the required rope type, outer diameter, construction and application. We align the product format against your purchasing brief before quoting.'],
    ['Packing & customization', 'Roll, large-spool and palletized packing can be discussed according to your quantity and destination. OEM/ODM requirements are reviewed around the confirmed specification.'],
    ['Export inquiry coordination', 'Send your RFQ with quantity and destination. We follow up on quotation details, production communication and the shipping documents required for the order.']
  ],
  recordsTitle: 'Company information',
  recordsText: 'Public enterprise lists identify Jiangsu Geelung Environmental Protection Technology Co., Ltd. in Peixian and list it among technology-based SMEs. Product specifications, order documentation and any compliance requirements are confirmed case by case before production.',
  quote: 'Request a Quote',
  resources: 'Technical Resources'
};

const chinese: AboutCopy = {
  title: '关于吉隆环保',
  metaDescription: '了解江苏吉隆环保科技有限公司，以及我们为海外编织绳、钩编绳采购客户提供的规格确认、包装与询盘对接支持。',
  eyebrow: 'GEELUNG · 公司简介',
  intro: '江苏吉隆环保科技有限公司位于江苏省徐州市沛县龙固镇工业园区。公司面向海外采购客户提供编织绳、钩编绳产品，以及规格沟通、出口包装协调和询盘对接服务。',
  focusTitle: '服务工业绳类采购的务实伙伴',
  focusText: '当前产品以白色编织绳、钩编绳为主，可提供成卷、大盘及适配出口订单的包装形式。每个项目从所需外径、结构、数量、应用场景和目的国出发，在生产前明确报价与供货方案。',
  imageAlt: 'GEELUNG 吉隆环保工业订单用编织绳卷',
  facts: [
    ['公司名称', '江苏吉隆环保科技有限公司'],
    ['品牌名称', 'GEELUNG · 吉隆环保'],
    ['公司地址', '江苏省徐州市沛县龙固镇工业园区'],
    ['产品方向', '面向 B2B 供应的编织绳与钩编绳'],
    ['服务内容', '规格确认、包装沟通与外贸询盘支持']
  ],
  supportTitle: '围绕清晰外贸询盘建立合作流程',
  supportText: '我们将沟通聚焦于影响采购决策的信息：绳类类型、目标尺寸、数量、用途、包装偏好和目的国。这样可在报价前确认合适的产品形式，并更高效地衔接生产与出货。',
  supportItems: [
    ['规格确认', '请提供所需绳类、外径、结构和应用场景。报价前，我们将结合采购需求核对产品形式与规格信息。'],
    ['包装与定制', '可根据数量和目的国沟通成卷、大盘及托盘包装。OEM/ODM 要求将围绕已确认的规格进行对接。'],
    ['外贸询盘对接', '请在询盘中说明数量与目的国。我们将跟进报价细节、生产沟通及订单所需的出货资料对接。']
  ],
  recordsTitle: '企业信息说明',
  recordsText: '公开企业名单可核验江苏吉隆环保科技有限公司位于沛县，并列入科技型中小企业相关名单。产品技术参数、订单文件和合规要求均以具体订单确认结果为准。',
  quote: '获取询价产品报价',
  resources: '产品目录与技术支持'
};

function getCopy(locale: AppLocale) {
  return locale === 'zh' ? chinese : english;
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const copy = getCopy(locale);
  const path = '/about';
  return {
    title: `${copy.title} | GEELUNG`,
    description: copy.metaDescription,
    alternates: {canonical: absoluteUrl(locale, path), languages: languageAlternates(path)},
    openGraph: {title: `${copy.title} | GEELUNG`, description: copy.metaDescription, url: absoluteUrl(locale, path), images: ['/assets/rope-warehouse.webp']}
  };
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getCopy(locale);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Jiangsu Geelung Environmental Protection Technology Co., Ltd.', alternateName: '江苏吉隆环保科技有限公司', brand: 'GEELUNG', url: absoluteUrl(locale, '/about'),
    address: {'@type': 'PostalAddress', streetAddress: 'Longgu Industrial Park', addressLocality: 'Peixian, Xuzhou', addressRegion: 'Jiangsu', addressCountry: 'CN'}
  };

  return <><Header /><main className="about-page">
    <section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / {copy.title}</p><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="lead">{copy.intro}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><Link className="button button-secondary" href="/resources">{copy.resources}</Link></div></div></section>
    <section className="section"><div className="container factory"><img src="/assets/rope-warehouse.webp" alt={copy.imageAlt} /><div><p className="eyebrow">GEELUNG · B2B ROPE SUPPLY</p><h2>{copy.focusTitle}</h2><p className="lead">{copy.focusText}</p></div></div></section>
    <section className="section section-soft"><div className="container"><div className="section-head"><div><p className="eyebrow">GEELUNG · COMPANY DETAILS</p><h2>{copy.recordsTitle}</h2></div></div><div className="contact-grid">{copy.facts.map(([label, value], index) => <article key={label} style={{border:'1px solid var(--line)', padding:'24px', background:index % 2 ? '#fff' : 'var(--surface)'}}><p className="eyebrow" style={{margin:'0 0 8px'}}>{label}</p><p style={{margin:0, fontWeight:700, lineHeight:1.55}}>{value}</p></article>)}<article style={{border:'1px solid var(--line)', padding:'24px', background:'#fff'}}><p className="eyebrow" style={{margin:'0 0 8px'}}>GEELUNG · PROFILE</p><p style={{margin:0, color:'var(--muted)', lineHeight:1.65}}>{copy.recordsText}</p></article></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">GEELUNG · PROCUREMENT SUPPORT</p><h2>{copy.supportTitle}</h2><p className="lead">{copy.supportText}</p></div></div><div className="applications">{copy.supportItems.map(([title, text], index) => <article className="application" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section section-soft"><div className="container resource-box"><p className="eyebrow">GEELUNG · START AN RFQ</p><h2>{locale === 'zh' ? '准备好产品需求，即可开始对接' : 'Bring your product requirements, and let’s start the RFQ'}</h2><p>{locale === 'zh' ? '请提交绳类类型、规格、数量、用途、包装偏好及目的国。我们将根据已确认的信息进行后续对接。' : 'Send rope type, target specification, quantity, application, packing preference and destination. We will follow up using the confirmed purchasing information.'}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><Link className="button button-secondary" href="/resources">{copy.resources}</Link></div></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} /></>;
}

