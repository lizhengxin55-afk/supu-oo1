import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const english = {
  title: 'Product Catalog & Technical Support',
  intro: 'Technical information for overseas industrial buyers. Use this page to review product data and prepare a clear RFQ for braided rope or crochet rope.',
  catalog: 'Download Catalog', quote: 'Request a Product Quote',
  sections: [
    ['Product technical parameters', 'Review the available outer-diameter range, inner-diameter reference and working-temperature information. Please confirm your required specification with the intended application before placing an order.'],
    ['Material & specification documents', 'Share the rope type, target diameter, construction requirement and expected quantity. We will align the relevant product format and specification information for your inquiry.'],
    ['Inspection report information', 'Inspection records or report requirements can be discussed against the confirmed order specification. Please state any destination-market or customer documentation requirements in your RFQ.'],
    ['Packing solutions', 'Roll, large-spool and palletized packing can be considered according to quantity, destination and container planning. Packing details are confirmed before production and shipment.'],
    ['Customization support', 'For OEM/ODM projects, we can coordinate dimensions, roll format, packing and outer-carton requirements around the confirmed purchasing brief.'],
    ['Export inquiry workflow', 'Send rope type, diameter, quantity, application and destination. We confirm specifications and packing, then provide a targeted quotation and follow up through production and shipment documentation.'],
    ['Sample requests', 'If a sample is required, please provide the target specification and destination. Sample availability, preparation timing and freight arrangements are confirmed case by case.']
  ]
};

const chinese = {
  title: '产品目录与技术支持',
  intro: '面向海外工业采购商提供绳类产品资料与询盘对接说明。您可在此了解技术参数，并为编织绳、钩编绳采购准备清晰的询盘信息。',
  catalog: '下载产品目录', quote: '获取询价产品报价',
  sections: [
    ['产品技术参数说明', '可查看外径范围、内径参考值及工作温度等基础资料。请结合实际用途确认所需规格，提交订单前以最终沟通结果为准。'],
    ['材质与规格资料', '请提供绳类类型、目标外径、结构要求及预计数量。我们将根据您的询盘匹配相应产品形式与规格说明。'],
    ['检测报告说明', '检测记录或报告要求可按确认后的订单规格沟通。如目的国或终端客户有文件要求，请在询盘中一并说明。'],
    ['包装方案', '可根据数量、目的国和装柜计划讨论成卷、大盘及托盘包装。包装细节将在生产与出货前确认。'],
    ['定制说明', '针对 OEM/ODM 项目，可围绕尺寸、卷装、包装及外箱要求进行对接，并以确认后的采购需求为基础推进。'],
    ['外贸询盘对接流程', '请提交绳类产品、外径、数量、应用场景和目的国。我们确认规格与包装后提供针对性报价，并跟进生产与出货资料对接。'],
    ['样品申请说明', '如需样品，请提供目标规格与目的国。样品可行性、准备时间及运费安排将按具体需求确认。']
  ]
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const copy = locale === 'zh' ? chinese : english;
  const path = '/resources';
  return {title: `${copy.title} | GEELUNG`, description: copy.intro, alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)}};
}

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = locale === 'zh' ? chinese : english;
  return <><Header /><main>
    <section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / {copy.title}</p><h1>{copy.title}</h1><p className="lead">{copy.intro}</p><div className="button-row"><a className="button" href="/assets/jilong-product-catalog.pdf">{copy.catalog}</a><Link className="button button-secondary" href="/inquiry">{copy.quote}</Link></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 技术资源' : 'GEELUNG · TECHNICAL RESOURCES'}</p><h2>{locale === 'zh' ? '为清晰询盘准备所需信息' : 'Information for a clearer industrial RFQ'}</h2></div></div><div className="contact-grid">{copy.sections.map(([heading, text], index)=><article key={heading} style={{border:'1px solid var(--line)', padding:'26px', background:index % 2 ? 'var(--surface)' : '#fff'}}><p className="eyebrow">0{index + 1}</p><h3 style={{fontSize:'20px', margin:'8px 0 12px'}}>{heading}</h3><p style={{color:'var(--muted)', lineHeight:1.65, margin:0}}>{text}</p></article>)}</div></div></section>
    <section className="section section-soft"><div className="container resource-box"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 采购支持' : 'GEELUNG · B2B SUPPORT'}</p><h2>{locale === 'zh' ? '从资料确认到出货对接' : 'From technical information to shipment coordination'}</h2><p>{locale === 'zh' ? '为提高报价效率，请在询盘中尽量提供产品类型、目标规格、数量、用途、包装偏好和目的国。' : 'For an efficient quotation, include product type, target specification, quantity, application, packing preference and destination in your inquiry.'}</p><div className="button-row"><a className="button" href="/assets/jilong-product-catalog.pdf">{copy.catalog}</a><Link className="button button-secondary" href="/inquiry">{copy.quote}</Link></div></div></section>
  </main></>;
}

