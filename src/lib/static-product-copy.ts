import type {AppLocale} from '@/i18n/routing';

type ProductStaticCopy = {
  eyebrow: string;
  orderModel: string;
  supplyFormat: string;
  samples: string;
  quote: string;
  viewSpecification: string;
  sectionLabels: {profile: string; media: string; application: string; faq: string};
  profileTitle: string;
  profileIntro: string;
  videoTitle: string;
  videoText: string;
  applicationTitle: string;
  applicationText: string;
  faqTitle: string;
  mediaNote: string;
  detailLabels: [string, string, string, string, string, string, string, string];
  detailText: [string, string, string, string, string, string, string, string];
  process: [string, string, string];
  processText: [string, string, string];
};

const copy: Record<AppLocale, ProductStaticCopy> = {
  zh: {
    eyebrow: 'GEELUNG · 工业绳类供应', orderModel: '合作模式', supplyFormat: '供货形式', samples: '样品', quote: '获取技术报价', viewSpecification: '查看技术参数',
    sectionLabels: {profile:'01 · 产品概览', media:'02 · 工厂 / 产品视频', application:'03 · 订单应用', faq:'04 · 采购商常见问题'},
    profileTitle:'围绕工业采购所需信息建立产品方案', profileIntro:'本页面为采购沟通提供统一信息结构。涉及材质、尺寸或性能要求时，将以确认后的应用条件和订单要求为准。',
    videoTitle:'展示产品结构、包装与出货前检查', videoText:'此处可放置 30–60 秒的产品或生产视频，帮助海外采购方了解产品形态、包装方式与质量检查流程。',
    applicationTitle:'从产品确认到出口包装的清晰流程', applicationText:'先明确应用场景，再确认技术要求，最后对齐包装与交付细节，让询盘沟通更高效。',
    faqTitle:'下单前建议确认的问题', mediaNote:'上传正式素材时，请为每张图片保留简洁、准确且不重复的 Alt 文本。',
    detailLabels:['材质','外径与粗细','拉力要求','耐磨与涉水环境','应用场景','定制选项','包装与交期','样品支持'],
    detailText:['可根据最终用途、使用方式与产品结构沟通适配的材质方案。','参考外径为 1.0–2.5 mm；报价前请提供目标尺寸与公差要求。','拉力要求应结合确认后的材质、结构、外径和实际受力条件进行评估。','请说明耐磨、潮湿或涉水环境，以及是否需要防水或耐水要求。','适用于工业配套、农业、体育休闲及需稳定绳类规格的其他项目。','支持围绕颜色、外径、长度、卷装、大盘、标签及外箱信息进行 OEM/ODM 对接。','可提供成卷、大盘与托盘出口包装；交期将在规格、数量和目的国确认后回复。','可在批量订单前沟通样品，请提供用途、目标尺寸、材质偏好和预计数量。'],
    process:['应用确认','样品与规格','包装与交期'], processText:['提供用途、环境和操作条件，使规格沟通从正确的应用背景开始。','确认材质、外径、结构、颜色及验收要求后，再安排批量生产计划。','将卷装、大盘或托盘包装、外箱标识、目的国和交期与采购订单对齐。']
  },
  en: {
    eyebrow:'GEELUNG · INDUSTRIAL ROPE SUPPLY', orderModel:'Order model', supplyFormat:'Supply format', samples:'Samples', quote:'Request a technical quotation', viewSpecification:'View specification',
    sectionLabels:{profile:'01 · PRODUCT PROFILE',media:'02 · FACTORY / PRODUCT VIDEO',application:'03 · ORDER APPLICATION',faq:'04 · BUYER FAQ'},
    profileTitle:'Built around the details your purchasing team needs', profileIntro:'This page gives buyers a consistent structure for product discussion. Material, dimension and performance requirements are confirmed against the intended application and approved order specification.',
    videoTitle:'Show the construction, packing and final inspection', videoText:'Reserve this location for a 30–60 second product or production video that helps overseas buyers review product format, packing and final inspection.',
    applicationTitle:'From product selection to export-ready packing', applicationText:'Define the application first, confirm technical expectations, then align packing and delivery details for a clearer RFQ process.', faqTitle:'Questions to confirm before ordering', mediaNote:'For final uploads, keep one concise, accurate and unique Alt text for each product image.',
    detailLabels:['Material','Diameter & thickness','Tensile requirement','Abrasion & water exposure','Applications','Custom options','Packing & lead time','Samples'],
    detailText:['Material options are reviewed against the end use, handling requirements and finished construction.','Reference outer diameter is 1.0–2.5 mm; share the target size and tolerance before quotation.','Tensile requirements are reviewed against the confirmed material, construction, diameter and loading condition.','Discuss abrasion, moisture and water exposure, including any water-resistant or waterproof requirement.','Suitable for industrial assembly, agriculture, recreation equipment and other projects requiring a repeatable rope format.','OEM/ODM support can cover color, diameter, cut length, roll or spool format, labels and outer-carton details.','Roll, spool and palletized export packing are available; lead time is confirmed after reviewing specification, quantity and destination.','Discuss samples before a bulk order and share the intended use, target size, material preference and estimated quantity.'],
    process:['Application review','Sample & specification','Packing & delivery'], processText:['Share the intended use, environment and handling conditions so the discussion starts with the right context.','Confirm material, diameter, construction, color and acceptance requirements before bulk production planning.','Align roll, spool or pallet packing, carton marking, destination and delivery schedule with the purchase order.']
  },
  fr: {
    eyebrow:'GEELUNG · FOURNITURE DE CORDES INDUSTRIELLES',orderModel:'Mode de commande',supplyFormat:'Format de fourniture',samples:'Échantillons',quote:'Demander un devis technique',viewSpecification:'Voir les spécifications',
    sectionLabels:{profile:'01 · PROFIL PRODUIT',media:'02 · VIDÉO USINE / PRODUIT',application:'03 · APPLICATION DE COMMANDE',faq:'04 · FAQ ACHETEUR'},
    profileTitle:'Conçu autour des informations utiles à vos achats',profileIntro:'Cette page fournit une structure claire pour les échanges produit. Les exigences de matériau, de dimension et de performance sont confirmées selon l’application et la commande approuvée.',videoTitle:'Présenter la structure, l’emballage et le contrôle final',videoText:'Réservez cet emplacement à une vidéo produit ou de production de 30 à 60 secondes pour aider les acheteurs internationaux à examiner le format et l’emballage.',applicationTitle:'Du choix du produit à l’emballage prêt pour l’export',applicationText:'Définissez l’application, confirmez les attentes techniques, puis alignez l’emballage et la livraison pour une demande claire.',faqTitle:'Points à confirmer avant commande',mediaNote:'Pour les fichiers définitifs, utilisez un texte Alt concis, exact et unique pour chaque image produit.',
    detailLabels:['Matière','Diamètre et épaisseur','Exigence de résistance','Abrasion et exposition à l’eau','Applications','Options sur mesure','Emballage et délai','Échantillons'],detailText:['Les options de matériau sont examinées selon l’usage final, la manipulation et la construction demandée.','Le diamètre extérieur de référence est de 1,0 à 2,5 mm ; indiquez la taille et la tolérance avant devis.','La résistance requise est étudiée selon le matériau, la construction, le diamètre et la charge confirmés.','Précisez l’abrasion, l’humidité et l’exposition à l’eau, ainsi que toute exigence de résistance à l’eau.','Pour l’assemblage industriel, l’agriculture, les loisirs et autres projets demandant un format de corde constant.','Le service OEM/ODM peut couvrir couleur, diamètre, longueur, format de rouleau ou bobine, étiquettes et cartons.','Rouleau, bobine et palettes export sont disponibles ; le délai est confirmé après examen de la spécification, quantité et destination.','Discutez des échantillons avant une commande en volume avec l’usage, la taille cible, le matériau et la quantité prévue.'],process:['Revue de l’application','Échantillon et spécification','Emballage et livraison'],processText:['Partagez l’usage, l’environnement et les conditions de manipulation pour commencer avec le bon contexte.','Confirmez matériau, diamètre, construction, couleur et critères d’acceptation avant la production.','Alignez rouleau, bobine ou palette, marquage carton, destination et calendrier avec la commande.']
  },
  es: {
    eyebrow:'GEELUNG · SUMINISTRO DE CUERDAS INDUSTRIALES',orderModel:'Modelo de pedido',supplyFormat:'Formato de suministro',samples:'Muestras',quote:'Solicitar cotización técnica',viewSpecification:'Ver especificaciones',
    sectionLabels:{profile:'01 · PERFIL DEL PRODUCTO',media:'02 · VÍDEO DE FÁBRICA / PRODUCTO',application:'03 · APLICACIÓN DEL PEDIDO',faq:'04 · FAQ DEL COMPRADOR'},
    profileTitle:'Creado con los datos que necesita su equipo de compras',profileIntro:'Esta página ofrece una estructura clara para la conversación de producto. Los requisitos de material, dimensión y rendimiento se confirman según la aplicación y el pedido aprobado.',videoTitle:'Mostrar la construcción, el embalaje y la inspección final',videoText:'Reserve este espacio para un vídeo de producto o producción de 30–60 segundos que ayude a los compradores internacionales a revisar el formato y embalaje.',applicationTitle:'De la selección al embalaje listo para exportar',applicationText:'Defina la aplicación, confirme las expectativas técnicas y alinee embalaje y entrega para una RFQ clara.',faqTitle:'Preguntas que conviene confirmar antes de pedir',mediaNote:'En las cargas finales, mantenga un texto Alt conciso, preciso y único para cada imagen de producto.',
    detailLabels:['Material','Diámetro y grosor','Requisito de tracción','Abrasión y exposición al agua','Aplicaciones','Opciones personalizadas','Embalaje y plazo','Muestras'],detailText:['Las opciones de material se revisan según el uso final, manejo y construcción solicitada.','El diámetro exterior de referencia es 1,0–2,5 mm; comparta tamaño y tolerancia antes de cotizar.','La resistencia requerida se revisa según material, construcción, diámetro y condición de carga confirmados.','Indique abrasión, humedad y exposición al agua, incluido cualquier requisito de resistencia o impermeabilidad.','Para montaje industrial, agricultura, equipos recreativos y otros proyectos que requieren un formato de cuerda repetible.','OEM/ODM puede cubrir color, diámetro, longitud, formato de rollo o bobina, etiquetas y cartón exterior.','Hay embalaje de exportación en rollo, bobina y palé; el plazo se confirma tras revisar especificación, cantidad y destino.','Consulte muestras antes del pedido a granel e indique uso, tamaño objetivo, material y cantidad estimada.'],process:['Revisión de aplicación','Muestra y especificación','Embalaje y entrega'],processText:['Comparta uso, entorno y condiciones de manejo para iniciar la conversación con el contexto correcto.','Confirme material, diámetro, construcción, color y criterios de aceptación antes de planificar producción.','Alinee rollo, bobina o palé, marcado de cartón, destino y calendario con la orden de compra.']
  },
  ja: {
    eyebrow:'GEELUNG · 産業用ロープ供給',orderModel:'注文形態',supplyFormat:'供給形態',samples:'サンプル',quote:'技術見積を依頼',viewSpecification:'仕様を見る',
    sectionLabels:{profile:'01 · 製品概要',media:'02 · 工場 / 製品動画',application:'03 · 注文用途',faq:'04 · バイヤーFAQ'},
    profileTitle:'購買チームに必要な情報を中心に構成',profileIntro:'本ページは製品協議のための統一された構成です。材質、寸法、性能要件は、用途と承認済み注文仕様に基づいて確認します。',videoTitle:'構造・梱包・最終検査を紹介',videoText:'海外バイヤーが製品形態、梱包、最終検査を確認できるよう、30～60秒の製品または生産動画をここに掲載できます。',applicationTitle:'製品選定から輸出梱包までの明確な流れ',applicationText:'用途を定義し、技術的な期待値を確認した後、梱包と納期を調整して明確なRFQにつなげます。',faqTitle:'注文前に確認したい項目',mediaNote:'正式素材をアップロードする際は、各製品画像に簡潔で正確、かつ重複しないAltテキストを設定してください。',
    detailLabels:['材質','外径と太さ','引張要件','摩耗・水濡れ環境','用途','カスタム項目','梱包と納期','サンプル'],detailText:['材質の選択肢は、最終用途、取り扱い条件、希望する構造に応じて検討します。','参考外径は1.0～2.5 mmです。見積前に目標寸法と許容差を共有してください。','必要な強度は、確認済みの材質、構造、外径、荷重条件に基づいて検討します。','摩耗、湿気、水への暴露、および耐水・防水の要件をお知らせください。','産業組立、農業、レジャー機器など、一定のロープ仕様が必要な案件に適しています。','OEM/ODMでは、色、外径、切断長、ロール・スプール形式、ラベル、外箱情報を調整できます。','ロール、スプール、パレット輸出梱包に対応し、納期は仕様、数量、仕向地の確認後にご案内します。','量産前にサンプルをご相談いただけます。用途、目標サイズ、材質、予定数量をお知らせください。'],process:['用途確認','サンプルと仕様','梱包と納品'],processText:['用途、環境、取り扱い条件を共有し、適切な背景から協議を始めます。','量産計画前に、材質、外径、構造、色、受入条件を確認します。','ロール、スプール、パレット、外箱表示、仕向地、納期を発注書に合わせます。']
  },
  de: {
    eyebrow:'GEELUNG · INDUSTRIESEIL-LIEFERUNG',orderModel:'Bestellmodell',supplyFormat:'Lieferformat',samples:'Muster',quote:'Technisches Angebot anfordern',viewSpecification:'Spezifikation ansehen',
    sectionLabels:{profile:'01 · PRODUKTPROFIL',media:'02 · WERKS- / PRODUKTVIDEO',application:'03 · BESTELLANWENDUNG',faq:'04 · EINKÄUFER-FAQ'},
    profileTitle:'Auf die Informationen Ihres Einkaufsteams ausgerichtet',profileIntro:'Diese Seite bietet eine einheitliche Struktur für die Produktabstimmung. Material-, Maß- und Leistungsanforderungen werden anhand der Anwendung und der freigegebenen Bestellung bestätigt.',videoTitle:'Aufbau, Verpackung und Endkontrolle zeigen',videoText:'Reservieren Sie diesen Bereich für ein 30–60-sekündiges Produkt- oder Produktionsvideo, damit internationale Einkäufer Format, Verpackung und Endkontrolle prüfen können.',applicationTitle:'Von der Produktauswahl bis zur exportfertigen Verpackung',applicationText:'Definieren Sie zuerst die Anwendung, bestätigen Sie technische Erwartungen und stimmen Sie dann Verpackung und Lieferung für eine klare RFQ ab.',faqTitle:'Vor der Bestellung zu bestätigende Punkte',mediaNote:'Verwenden Sie bei finalen Uploads für jedes Produktbild einen kurzen, präzisen und eindeutigen Alt-Text.',
    detailLabels:['Material','Durchmesser und Stärke','Zuganforderung','Abrieb und Wassereinwirkung','Anwendungen','Sonderoptionen','Verpackung und Lieferzeit','Muster'],detailText:['Materialoptionen werden anhand von Endanwendung, Handhabung und gewünschter Konstruktion geprüft.','Der Referenz-Außendurchmesser beträgt 1,0–2,5 mm; teilen Sie Zielmaß und Toleranz vor dem Angebot mit.','Die erforderliche Festigkeit wird anhand von Material, Konstruktion, Durchmesser und bestätigter Belastung geprüft.','Beschreiben Sie Abrieb, Feuchtigkeit und Wassereinwirkung sowie Anforderungen an Wasserbeständigkeit oder Wasserdichtigkeit.','Für industrielle Montage, Landwirtschaft, Freizeitausrüstung und andere Projekte mit wiederholbarem Seilformat.','OEM/ODM kann Farbe, Durchmesser, Schnittlänge, Rollen- oder Spulenformat, Etiketten und Umkarton umfassen.','Rollen-, Spulen- und Paletten-Exportverpackung ist möglich; die Lieferzeit wird nach Prüfung von Spezifikation, Menge und Zielort bestätigt.','Besprechen Sie Muster vor der Großbestellung und nennen Sie Einsatz, Zielmaß, Materialwunsch und geplante Menge.'],process:['Anwendungsprüfung','Muster und Spezifikation','Verpackung und Lieferung'],processText:['Teilen Sie Einsatz, Umgebung und Handhabungsbedingungen mit, damit die Abstimmung mit dem richtigen Kontext beginnt.','Bestätigen Sie Material, Durchmesser, Konstruktion, Farbe und Abnahmekriterien vor der Produktionsplanung.','Stimmen Sie Rolle, Spule oder Palette, Kartonkennzeichnung, Zielort und Lieferplan mit der Bestellung ab.']
  }
};

export function getStaticProductCopy(locale: AppLocale) {
  return copy[locale];
}

