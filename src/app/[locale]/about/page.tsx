import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {AboutContentTabs, type AboutTab} from '@/components/AboutContentTabs';
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
  technologyTitle: string;
  technologyText: string;
  technologyItems: Array<[string, string]>;
  quote: string;
  resources: string;
};

const english: AboutCopy = {
  title: 'About GEELUNG',
  metaDescription: 'Learn about Jiangsu Geelung Environmental Protection Technology Co., Ltd. and its B2B support for braided rope and crochet rope procurement.',
  eyebrow: 'GEELUNG · COMPANY PROFILE',
  intro: 'Jiangsu Geelung Environmental Protection Technology Co., Ltd. is located in Longgu Industrial Park, Peixian, Xuzhou, Jiangsu, China. Built on environmental-technology, rope-net and textile-product development, we support overseas buyers with braided rope and crochet rope products, specification communication, export packing coordination and responsive RFQ service.',
  focusTitle: 'A practical partner for industrial rope procurement',
  focusText: 'Our current product focus is white braided rope and crochet rope supplied in rolls, large spools and export-ready packing formats. For each project, we work from the required diameter, construction, quantity, application and destination so the quotation and supply plan are clear before production.',
  imageAlt: 'Aerial view of Jiangsu GEELUNG factory in Longgu Industrial Park',
  facts: [
    ['Company', 'Jiangsu Geelung Environmental Protection Technology Co., Ltd.'],
    ['Brand', 'GEELUNG'],
    ['Location', 'Longgu Industrial Park, Peixian, Xuzhou, Jiangsu, China'],
    ['Current product focus', 'Braided rope and crochet rope for B2B supply'],
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
  recordsText: 'Jiangsu Geelung Environmental Protection Technology Co., Ltd. is an integrated technology enterprise combining environmental-technology R&D, textile-product and plastic-part manufacturing, logistics transportation, and import and export business. The company information highlights patented advantages in environmental technologies including MBR membrane liner tubes, together with national and provincial qualifications and business coverage across domestic and overseas markets. For the current export website, GEELUNG focuses on clear, order-specific rope product information and confirms specifications, documents and compliance requirements case by case before production.',
  technologyTitle: 'Technology & application foundation',
  technologyText: 'The supplied company information describes a diversified development base, including MBR membrane liner products, rope-net and textile products, and related manufacturing technologies. This technical background supports practical product development and project communication for different end-use requirements.',
  technologyItems: [
    ['Technical development', 'The company information lists multiple invention patents, including MBR membrane liner tube and reinforced internal support-tube technologies.'],
    ['Digital production support', 'The company profile also describes internally developed systems for intelligent MBR liner production monitoring and environmental-equipment data analysis.'],
    ['Application & market reach', 'Products are described for aerospace, sports and leisure, agricultural breeding and public-welfare support applications, with sales coverage in more than 50 countries and regions.']
  ],
  quote: 'Request a Quote',
  resources: 'Technical Resources'
};

const chinese: AboutCopy = {
  title: '关于吉隆环保',
  metaDescription: '了解江苏吉隆环保科技有限公司，以及我们为海外编织绳、钩编绳采购客户提供的规格确认、包装与询盘对接支持。',
  eyebrow: 'GEELUNG · 公司简介',
  intro: '江苏吉隆环保科技有限公司位于江苏省徐州市沛县龙固镇工业园区。公司拥有环保技术、绳网与纺织制品等研发制造基础，现面向海外采购客户提供编织绳、钩编绳产品，以及规格沟通、出口包装协调和询盘对接服务。',
  focusTitle: '服务工业绳类采购的务实伙伴',
  focusText: '当前产品以白色编织绳、钩编绳为主，可提供成卷、大盘及适配出口订单的包装形式。每个项目从所需外径、结构、数量、应用场景和目的国出发，在生产前明确报价与供货方案。',
  imageAlt: '江苏吉隆环保科技有限公司龙固镇工业园区工厂航拍图',
  facts: [
    ['公司名称', '江苏吉隆环保科技有限公司'],
    ['品牌名称', 'GEELUNG · 吉隆环保'],
    ['公司地址', '江苏省徐州市沛县龙固镇工业园区'],
    ['当前产品方向', '面向 B2B 供应的编织绳与钩编绳'],
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
  recordsText: '江苏吉隆环保科技有限公司是一家集环保技术研发、纺织制品与塑料零件制造、物流运输及进出口业务于一体的综合性科技企业，在 MBR 膜内衬管等环保技术领域具有专利优势，并具备多项国家级、省级资质认证，业务覆盖国内外市场。当前出口网站以绳类产品采购信息为主，产品技术参数、订单文件和合规要求均以具体订单确认结果为准。',
  technologyTitle: '核心业务与技术基础',
  technologyText: '公司资料显示，吉隆环保围绕环保 MBR 膜内衬管、绳网、纺织制品及相关塑料制品开展技术研发与制造。多元化的技术基础，有助于我们围绕不同终端应用需求进行产品沟通与项目支持。',
  technologyItems: [
    ['技术研发', '资料列示公司拥有多项发明专利，涉及 MBR 膜内衬管及增强型内衬支撑管等相关技术。'],
    ['数字化支持', '公司资料列示已开发膜内衬管智能化生产监测管理系统、环保设备数据分析系统等软件。'],
    ['应用与市场覆盖', '资料列示产品应用于航空航天、体育休闲、农业养殖、民生保障等领域，并销往全球 50 多个国家和地区。']
  ],
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
    openGraph: {title: `${copy.title} | GEELUNG`, description: copy.metaDescription, url: absoluteUrl(locale, path), images: ['/assets/geelung-company-entrance.jpg']}
  };
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const copy = getCopy(locale);
  const aboutTabs: AboutTab[] = locale === 'zh' ? [
    {label:'企业简介', title:'企业简介', paragraphs:['江苏吉隆环保科技有限公司，2010年成立于江苏徐州沛县龙固镇工业园区，是一家集环保新材料研发、编织制品生产、销售与技术服务为一体的现代化制造企业。公司深耕 MBR 膜配套内衬编织管、特种化纤编织绳、索缆、塑料零件等产品研发制造，拥有多项实用新型专利，具备成熟的自主研发、规模化生产、检测交付能力，产品广泛应用于污水处理 MBR 膜组件领域，同时覆盖工业、防护等多场景。','公司坚持严苛的品质管控体系，配套完善检测流程，可提供 MA、CNAS 检测报告，支持产品定制。企业拥有自营进出口资质，产品供应国内众多环保膜材企业，同时远销海外市场。','我们专注于环保水处理配套新材料的持续迭代，以稳定可靠的产品，为膜行业客户提供高通透、高强度、长寿命的编织内衬解决方案。']},
    {label:'企业文化', title:'企业文化', points:[['企业使命','深耕环保新材料，以优质编织配套产品助力水环境治理，守护绿水青山。'],['企业愿景','成为国内 MBR 膜内衬编织制品领域值得信赖的标杆型制造厂商。'],['核心价值观','匠心精工、品质为本、创新务实、合作共赢。'],['经营理念','以技术驱动产品升级，以品质赢得长期信任，以服务响应客户需求；严守生产标准，坚持持续创新，兼顾产品稳定性与定制化能力。'],['团队精神','专注、严谨、进取、担当，重视技术积累，鼓励工艺优化，打造稳定高效的生产研发团队。']]},
    {label:'领导致辞', title:'领导致辞', paragraphs:['自2010年创立以来，吉隆环保扎根淮海大地，十余载专注环保编织新材料赛道，聚焦 MBR 膜内衬编织管、特种编织绳缆等配套产品的研发与生产。从工艺摸索到自主专利落地，从小批量试制到规模化智能制造，我们始终坚守“品质为先”的初心，立足水处理环保产业，为膜组件企业提供可靠的配套支撑。','环保产业是利国利民的朝阳产业，水质治理对材料的强度、通透、耐腐、稳定性提出极高要求。我们深知，一根小小的内衬编织管，关乎整套膜设备的运行效果与使用寿命。多年来，我们持续投入工艺改良、设备升级与产品检测，建立标准化生产与质检流程，坚持每一批产品均可溯源、可检测，用扎实的制造能力回馈客户信任。','吉隆的成长，离不开广大新老客户长期的支持与包容，离不开全体员工的坚守付出。未来，我们将继续立足技术创新，持续优化产品性能，丰富定制化服务；恪守诚信经营，不断提升交付与服务能力，携手上下游合作伙伴，共同助力污水处理行业高质量发展。','以诚相待，行稳致远。期待与各界同仁携手同行，共筑绿色环保事业！'], signature:'江苏吉隆环保科技有限公司'}
  ] : [
    {label:'Company Profile', title:'Company Profile', paragraphs:['Jiangsu GEELUNG Environmental Technology Co., Ltd. is a modern manufacturer integrating environmental new-material development, braided-product manufacturing, sales and technical service.','Our products include MBR membrane liner braided tubes, specialty synthetic-fibre braided ropes, cords, cables and plastic components, supported by independent R&D, scalable production and inspection capability.']},
    {label:'Corporate Culture', title:'Corporate Culture', points:[['Mission','Develop environmental new materials and support water-environment management with quality braided products.'],['Vision','Become a trusted benchmark manufacturer in MBR membrane liner braided products.'],['Core values','Craftsmanship, quality, practical innovation and win-win cooperation.']]},
    {label:'Leadership Message', title:'Leadership Message', paragraphs:['Since our establishment, GEELUNG has focused on environmentally responsible braided materials and dependable support for water-treatment customers.','We will continue to improve product performance, strengthen tailored service and build long-term partnerships through integrity and reliable delivery.'], signature:'Jiangsu GEELUNG Environmental Technology Co., Ltd.'}
  ];
  const schema = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Jiangsu Geelung Environmental Protection Technology Co., Ltd.', alternateName: '江苏吉隆环保科技有限公司', brand: 'GEELUNG', url: absoluteUrl(locale, '/about'),
    address: {'@type': 'PostalAddress', streetAddress: 'Longgu Industrial Park', addressLocality: 'Peixian, Xuzhou', addressRegion: 'Jiangsu', addressCountry: 'CN'}
  };

  return <><Header /><main className="about-page">
    <section className="page-hero"><div className="container"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / {copy.title}</p><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="lead">{copy.intro}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><Link className="button button-secondary" href="/resources">{copy.resources}</Link></div></div></section>
    <section className="about-entrance-photo"><img src="/assets/geelung-company-entrance.jpg" alt={locale === 'zh' ? '江苏吉隆环保科技有限公司公司门头' : 'Jiangsu GEELUNG company entrance'} width="2000" height="913" /></section>
    <AboutContentTabs tabs={aboutTabs} ariaLabel={locale === 'zh' ? '关于吉隆内容切换' : 'About GEELUNG content tabs'} />
    <section className="section section-soft"><div className="container resource-box"><p className="eyebrow">{locale === 'zh' ? 'GEELUNG · 开始询盘' : 'GEELUNG · START AN RFQ'}</p><h2>{locale === 'zh' ? '准备好产品需求，即可开始对接' : 'Bring your product requirements, and let’s start the RFQ'}</h2><p>{locale === 'zh' ? '请提交绳类类型、规格、数量、用途、包装偏好及目的国。我们将根据已确认的信息进行后续对接。' : 'Send rope type, target specification, quantity, application, packing preference and destination. We will follow up using the confirmed purchasing information.'}</p><div className="button-row"><Link className="button" href="/inquiry">{copy.quote}</Link><Link className="button button-secondary" href="/resources">{copy.resources}</Link></div></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} /></>;
}
