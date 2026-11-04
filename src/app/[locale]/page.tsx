import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {HomeHeroCarousel} from '@/components/HomeHeroCarousel';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import {products} from '@/lib/products';
import {getRopeContent} from '@/lib/rope-content';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const ui: Record<AppLocale, {company:string; catalog:string; products:string; about:string; capability:string; news:string; contactTitle:string; contactText:string; explore:string}> = {
  zh:{company:'江苏吉隆环保科技有限公司',catalog:'下载产品目录',products:'查看全部产品',about:'关于吉隆',capability:'核心能力',news:'技术资源',contactTitle:'告诉我们您的需求',contactText:'提交产品形式、目标外径、数量、用途、包装要求和目的国，我们将提供针对性的询盘支持。',explore:'了解更多'},
  en:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Download catalog',products:'Explore products',about:'About GEELUNG',capability:'Core capabilities',news:'Technical resources',contactTitle:'Tell us what you need',contactText:'Share product format, target diameter, quantity, application, packing request and destination for focused RFQ support.',explore:'Learn more'},
  fr:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Télécharger le catalogue',products:'Voir les produits',about:'À propos de GEELUNG',capability:'Compétences clés',news:'Ressources techniques',contactTitle:'Indiquez-nous votre besoin',contactText:'Partagez le format, le diamètre, la quantité, l’usage, l’emballage et la destination pour une assistance RFQ adaptée.',explore:'En savoir plus'},
  es:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Descargar catálogo',products:'Ver productos',about:'Sobre GEELUNG',capability:'Capacidades clave',news:'Recursos técnicos',contactTitle:'Cuéntenos su necesidad',contactText:'Comparta formato, diámetro, cantidad, uso, embalaje y destino para recibir apoyo RFQ específico.',explore:'Más información'},
  ja:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'カタログをダウンロード',products:'製品を見る',about:'GEELUNGについて',capability:'主要能力',news:'技術資料',contactTitle:'ご要望をお聞かせください',contactText:'製品形式、目標外径、数量、用途、梱包、仕向地を共有いただくと、的確なRFQ対応が可能です。',explore:'詳しく見る'},
  de:{company:'Jiangsu Geelung Environmental Technology Co., Ltd.',catalog:'Katalog herunterladen',products:'Produkte ansehen',about:'Über GEELUNG',capability:'Kernkompetenzen',news:'Technische Ressourcen',contactTitle:'Nennen Sie uns Ihren Bedarf',contactText:'Nennen Sie Produktformat, Zieldurchmesser, Menge, Einsatz, Verpackung und Zielort für gezielte RFQ-Unterstützung.',explore:'Mehr erfahren'}
};

type CapabilityItem = {title: string; text: string};
type CapabilityContent = {eyebrow: string; title: string; intro: string; items: readonly CapabilityItem[]};

const capabilityContent: Record<AppLocale, CapabilityContent> = {
  zh: {
    eyebrow:'GEELUNG · 核心实力',
    title:'核心制造能力与产品性能支持',
    intro:'吉隆聚焦工业钩编绳、编织绳及 MBR 膜丝内衬等产品制造。围绕规格确认、工艺匹配、样品验证与出口交付，为国内外项目采购提供清晰、可执行的支持。',
    items:[
      {title:'编织成型能力',text:'面向钩编绳、编织绳及膜组件配套内衬等产品形态，持续优化编织成型与卷装工艺，保证产品形态规整、便于后续加工和使用。'},
      {title:'规格尺寸控制',text:'可围绕外径、内径、长度、卷装方式与订单数量确认规格；技术参数以双方确认的样品、图纸或订单要求为准。'},
      {title:'MBR 膜丝配套',text:'提供适用于 MBR 膜丝配套场景的编织内衬产品，支持围绕膜丝尺寸、装配需求及交付形式进行规格沟通。'},
      {title:'性能需求对接',text:'对于耐磨、涉水、柔韧性或使用寿命等要求，可结合实际应用条件、材料与编织结构进行评估和方案沟通。'},
      {title:'样品与质量确认',text:'支持在批量订单前确认样品、尺寸与外观要求；生产与交付环节围绕已确认规格执行，方便采购方进行验收对接。'},
      {title:'定制与包装方案',text:'支持尺寸、长度、颜色、卷装、大盘、袋装、外箱标识和标签等定制内容，匹配 OEM/ODM 与项目型采购需求。'},
      {title:'出口交付支持',text:'可根据目的国、采购数量与运输方式沟通包装和出货安排，并提供外贸询盘从规格确认到交付资料对接的协同支持。'}
    ]
  },
  en: {
    eyebrow:'GEELUNG · CORE STRENGTHS', title:'Core Manufacturing Capability & Product Performance Support', intro:'GEELUNG focuses on industrial crochet rope, braided rope and MBR membrane-filament liner manufacturing. We support domestic and global project buyers through specification alignment, process matching, sample validation and export delivery coordination.',
    items:[
      {title:'Braiding & Forming',text:'For crochet rope, braided rope and membrane-support liner formats, we refine braiding and winding processes to provide orderly product presentation for subsequent processing and use.'},
      {title:'Specification Control',text:'Outer diameter, inner diameter, length, winding format and order quantity can be aligned. Final parameters follow the mutually confirmed sample, drawing or order requirement.'},
      {title:'MBR Filament Support',text:'Braided liner products are available for MBR membrane-filament support applications, with specifications discussed around filament dimensions, assembly needs and delivery format.'},
      {title:'Performance Requirements',text:'Abrasion, water-exposure, flexibility and service-life requirements can be evaluated against the actual application condition, material and braided structure.'},
      {title:'Sample & Quality Confirmation',text:'Samples, dimensions and appearance requirements can be confirmed before volume production. Manufacturing and delivery follow the approved specification for clearer buyer acceptance.'},
      {title:'Customization & Packing',text:'Size, length, color, winding format, spool, bag, outer-carton marking and labels can be aligned for OEM/ODM and project procurement.'},
      {title:'Export Delivery Support',text:'Packing and shipment arrangements can be discussed by destination, quantity and transport mode, with one coordinated RFQ path from specification confirmation to delivery documents.'}
    ]
  },
  fr: {
    eyebrow:'GEELUNG · COMPÉTENCES CLÉS', title:'Capacités de fabrication et support des performances produit', intro:'GEELUNG se concentre sur les cordes crochetées industrielles, les cordes tressées et les gaines pour fibres de membrane MBR. Nous accompagnons les achats de projets avec validation des spécifications, échantillons et coordination export.',
    items:[
      {title:'Tressage et formage',text:'Pour les cordes crochetées, tressées et gaines de support de membrane, les procédés de tressage et d’enroulement sont adaptés afin d’obtenir une présentation régulière.'},
      {title:'Maîtrise des dimensions',text:'Diamètres extérieur et intérieur, longueur, format d’enroulement et quantité sont confirmés. Les paramètres finaux suivent l’échantillon, le plan ou la commande validés.'},
      {title:'Support pour fibres MBR',text:'Des gaines tressées sont proposées pour les applications de fibres de membrane MBR, selon les dimensions, l’assemblage et le format de livraison requis.'},
      {title:'Exigences de performance',text:'Les besoins de résistance à l’abrasion, à l’eau, de souplesse ou de durée d’usage peuvent être évalués selon l’application, le matériau et la structure tressée.'},
      {title:'Échantillon et qualité',text:'Échantillon, dimensions et apparence peuvent être validés avant la production en volume afin de faciliter la réception par l’acheteur.'},
      {title:'Personnalisation et emballage',text:'Dimensions, longueur, couleur, enroulement, bobine, sachet, carton et étiquette peuvent être adaptés aux projets OEM/ODM.'},
      {title:'Support export',text:'L’emballage et l’expédition sont coordonnés selon la destination, la quantité et le transport, avec un suivi RFQ de la spécification aux documents de livraison.'}
    ]
  },
  es: {
    eyebrow:'GEELUNG · CAPACIDADES CLAVE', title:'Capacidad de fabricación y soporte de rendimiento del producto', intro:'GEELUNG se centra en cuerda de ganchillo industrial, cuerda trenzada y revestimientos para filamentos de membrana MBR. Apoyamos compras de proyectos con validación de especificaciones, muestras y coordinación de exportación.',
    items:[
      {title:'Trenzado y formado',text:'Para cuerdas de ganchillo, trenzadas y revestimientos de soporte de membrana, ajustamos el trenzado y enrollado para una presentación ordenada.'},
      {title:'Control dimensional',text:'Se pueden confirmar diámetros exterior e interior, longitud, formato de enrollado y cantidad. Los parámetros finales siguen la muestra, plano o pedido aprobado.'},
      {title:'Soporte para filamento MBR',text:'Se ofrecen revestimientos trenzados para aplicaciones de filamentos de membrana MBR, según dimensiones, montaje y formato de entrega.'},
      {title:'Requisitos de rendimiento',text:'La abrasión, exposición al agua, flexibilidad y vida de servicio pueden evaluarse según la aplicación, el material y la estructura trenzada.'},
      {title:'Muestras y calidad',text:'La muestra, las dimensiones y la apariencia pueden confirmarse antes de producción por volumen para facilitar la aceptación del comprador.'},
      {title:'Personalización y embalaje',text:'Tamaño, longitud, color, enrollado, bobina, bolsa, caja exterior y etiqueta se pueden adaptar a proyectos OEM/ODM.'},
      {title:'Soporte de entrega exportación',text:'Embalaje y envío se coordinan por destino, cantidad y transporte, con un proceso RFQ desde la especificación hasta los documentos de entrega.'}
    ]
  },
  ja: {
    eyebrow:'GEELUNG · コア能力', title:'製造能力と製品性能のサポート', intro:'GEELUNGは産業用かぎ編みロープ、編組ロープ、MBR膜糸ライナーの製造に注力しています。仕様調整、サンプル確認、輸出納品の連携により、国内外のプロジェクト調達を支援します。',
    items:[
      {title:'編組・成形',text:'かぎ編みロープ、編組ロープ、膜サポートライナーの形態に合わせ、整然とした製品形状となるよう編組と巻き取り工程を調整します。'},
      {title:'寸法仕様管理',text:'外径、内径、長さ、巻き形式、数量を確認できます。最終仕様は合意したサンプル、図面または注文要件に基づきます。'},
      {title:'MBR膜糸サポート',text:'MBR膜糸のサポート用途向けに、膜糸寸法、組立要件、納品形式に合わせた編組ライナーを提案します。'},
      {title:'性能要件の確認',text:'耐摩耗、涉水環境、柔軟性、使用期間に関する要件は、実際の用途、材料、編組構造に基づいて確認できます。'},
      {title:'サンプル・品質確認',text:'量産前にサンプル、寸法、外観要件を確認でき、合意済み仕様に沿って製造・納品を進めます。'},
      {title:'カスタム・梱包',text:'寸法、長さ、色、巻き形式、スプール、袋、外箱表示、ラベルをOEM/ODMやプロジェクト要件に合わせられます。'},
      {title:'輸出納品支援',text:'仕向地、数量、輸送方法に応じて梱包・出荷を協議し、仕様確認から納品書類までRFQ対応を連携します。'}
    ]
  },
  de: {
    eyebrow:'GEELUNG · KERNKOMPETENZEN', title:'Fertigungskompetenz und Unterstützung der Produkteigenschaften', intro:'GEELUNG konzentriert sich auf industrielle Häkelkordeln, geflochtene Seile und MBR-Membranfaser-Innenliner. Wir unterstützen Projektbeschaffung mit Spezifikationsabstimmung, Musterfreigabe und Exportkoordination.',
    items:[
      {title:'Flechten und Formgebung',text:'Für Häkelkordeln, geflochtene Seile und Membran-Support-Innenliner stimmen wir Flecht- und Wickelprozesse auf eine ordentliche Produktform ab.'},
      {title:'Maßkontrolle',text:'Außen- und Innendurchmesser, Länge, Wicklungsformat und Menge können abgestimmt werden. Endparameter folgen Muster, Zeichnung oder bestätigter Bestellung.'},
      {title:'MBR-Faserunterstützung',text:'Geflochtene Innenliner sind für MBR-Membranfaseranwendungen verfügbar und werden nach Fasermaßen, Montageanforderungen und Lieferformat abgestimmt.'},
      {title:'Leistungsanforderungen',text:'Abrieb, Wasserkontakt, Flexibilität und Nutzungsdauer können anhand der tatsächlichen Anwendung, des Materials und der Flechtstruktur bewertet werden.'},
      {title:'Muster und Qualität',text:'Muster, Maße und Erscheinungsbild können vor der Serienproduktion bestätigt werden, damit die Abnahme durch den Käufer klarer bleibt.'},
      {title:'Anpassung und Verpackung',text:'Größe, Länge, Farbe, Wicklung, Spule, Beutel, Umkarton und Etikett lassen sich für OEM/ODM und Projektbeschaffung abstimmen.'},
      {title:'Exportlieferung',text:'Verpackung und Versand werden nach Zielort, Menge und Transportart koordiniert, mit einem RFQ-Prozess von der Spezifikation bis zu den Lieferdokumenten.'}
    ]
  }
};

const assets = {
  factory:'/assets/geelung-factory-spools.webp',
  spool:'/assets/geelung-white-rope-spool-no-label.jpg',
  detail:'/assets/geelung-finished-braided-rope.jpg',
  productionDetail:'/assets/geelung-two-crochet-cord-rolls-clean.jpg',
  customCrochet:'/assets/geelung-custom-crochet-cord-warm.jpg'
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; const home = getRopeContent(locale).home;
  return {title:home.metaTitle,description:home.metaDescription,keywords:home.metaKeywords.split(','),alternates:{canonical:absoluteUrl(locale,'/'),languages:languageAlternates('/')},openGraph:{title:home.metaTitle,description:home.metaDescription,url:absoluteUrl(locale,'/'),type:'website',images:[{url:assets.factory,alt:'GEELUNG factory production spools'}]}};
}

export default async function HomePage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale);
  const copy = getRopeContent(locale); const {home} = copy; const text = ui[locale];
  const companySchema = {'@context':'https://schema.org','@type':'Organization',name:'GEELUNG',alternateName:'江苏吉隆环保科技有限公司',url:absoluteUrl(locale,'/'),logo:'https://www.geelung.com/assets/geelung-logo-web.jpg',address:{'@type':'PostalAddress',streetAddress:'Longgu Industrial Park',addressLocality:'Peixian, Xuzhou',addressRegion:'Jiangsu',addressCountry:'CN'}};
  return <><Header /><main className="home-plan-one">
    <HomeHeroCarousel company={text.company} heading={home.title} intro={home.intro} requestLabel={copy.productPage.request} catalogLabel={text.catalog} proof={home.proof} proofSub={home.proofSub} />

    <section className="plan-one-section plan-one-video-section"><div className="plan-one-shell"><div className="plan-one-heading"><div><p className="plan-one-label">GEELUNG · VIDEO</p><h2>{locale === 'zh' ? '工厂与产品视频' : 'Factory & Product Videos'}</h2></div></div><div className="plan-one-video-placeholder" aria-label={locale === 'zh' ? '视频资料后续补充' : 'Factory and product video coming soon'}><span>{locale === 'zh' ? '视频资料后续补充' : 'Factory and product video coming soon'}</span></div></div></section>

    <section className="plan-one-section plan-one-about"><div className="plan-one-shell plan-one-about-grid"><div className="plan-one-media"><img src="/assets/geelung-factory-aerial.png" alt={locale === 'zh' ? '江苏吉隆环保科技有限公司工厂航拍图' : 'Aerial view of Jiangsu GEELUNG factory'} width="686" height="385" loading="lazy" /></div><div><p className="plan-one-label">{text.about}</p><h2>{home.factoryTitle}</h2><p className="plan-one-copy">{home.factoryText}</p><div className="plan-one-stats">{home.factoryStats.map((stat, index) => <div key={stat}><strong>{stat}</strong><span>{home.factoryStatLabels[index]}</span></div>)}</div><Link className="plan-one-link" href="/about">{text.explore} <span aria-hidden>→</span></Link></div></div></section>

    <section className="plan-one-section plan-one-products"><div className="plan-one-shell"><div className="plan-one-heading"><div><p className="plan-one-label">{home.productsEyebrow}</p><h2>{home.productsTitle}</h2></div><Link className="plan-one-link" href="/products">{text.products} <span aria-hidden>→</span></Link></div><div className="plan-one-product-grid">{products.map((product, index) => { const item = copy.products[product.key]; const image = [assets.spool, assets.factory, assets.detail, assets.customCrochet][index]; return <Link key={product.slug} href={`/products/${product.slug}`} className="plan-one-product"><img src={image} alt={item.title} width="1200" height="842" loading="lazy" /><div><p>0{index + 1}</p><h3>{item.title}</h3><span>{item.description}</span><b aria-hidden>→</b></div></Link>; })}</div></div></section>

    <section className="plan-one-capabilities"><div className="plan-one-shell"><p className="plan-one-label">{capabilityContent[locale].eyebrow}</p><h2>{capabilityContent[locale].title}</h2><p className="plan-one-capabilities-intro">{capabilityContent[locale].intro}</p><div className="plan-one-capability-grid">{capabilityContent[locale].items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

    <section className="plan-one-section plan-one-detail"><div className="plan-one-shell plan-one-detail-grid"><div><p className="plan-one-label">{home.factoryEyebrow}</p><h2>{locale === 'zh' ? '从原料到成品，关注每一个交付环节' : 'From material to finished product, focused on every delivery step'}</h2><p className="plan-one-copy">{home.resourcesText}</p><Link className="button" href="/resources">{text.explore}</Link></div><img src={assets.productionDetail} alt="GEELUNG finished crochet cord rolls with product labels" width="1200" height="1200" loading="lazy" /></div></section>

    <section className="plan-one-contact"><div className="plan-one-shell"><p className="plan-one-label">GEELUNG · RFQ</p><h2>{text.contactTitle}</h2><p>{text.contactText}</p><Link className="button" href="/inquiry">{copy.productPage.request}</Link></div></section>
  </main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(companySchema)}} /></>;
}
