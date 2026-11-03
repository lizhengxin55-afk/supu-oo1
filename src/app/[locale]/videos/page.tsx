import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Header} from '@/components/Header';
import {MediaPlaceholder} from '@/components/MediaPlaceholder';
import {Link} from '@/i18n/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/site';
import type {AppLocale} from '@/i18n/routing';

type Props = {params: Promise<{locale: AppLocale}>};

const content: Record<AppLocale, {title:string; description:string; eyebrow:string; lead:string; factory:string; factoryNote:string; product:string; productNote:string; packing:string; packingNote:string; quote:string}> = {
  zh:{title:'视频资料',description:'查看江苏吉隆环保科技有限公司的工厂、产品与出口包装视频资料。',eyebrow:'GEELUNG · 视频资料',lead:'此页面集中展示工厂、产品与出口包装相关视频。视频文件将按主题独立上传，方便海外采购客户快速了解生产与交付场景。',factory:'工厂与生产环境视频',factoryNote:'工厂航拍、生产环境及设备视频后续补充。',product:'编织绳与钩编绳产品视频',productNote:'产品结构、绳卷规格与应用展示视频后续补充。',packing:'出口包装与装运视频',packingNote:'成卷、大盘、托盘包装及出货流程视频后续补充。',quote:'获取报价'},
  en:{title:'Video Library',description:'View factory, product and export packing videos from Jiangsu GEELUNG Environmental Technology Co., Ltd.',eyebrow:'GEELUNG · VIDEO LIBRARY',lead:'This page brings factory, product and export-packing videos together. Each video can be uploaded by topic so overseas buyers can quickly understand the production and delivery setting.',factory:'Factory & production environment',factoryNote:'Factory aerial, production environment and equipment video to be added.',product:'Braided rope & crochet cord',productNote:'Product construction, rope-roll specification and application video to be added.',packing:'Export packing & shipment',packingNote:'Roll, large-spool, pallet packing and dispatch-process video to be added.',quote:'Request a Quote'},
  fr:{title:'Vidéos',description:'Découvrez les vidéos d’usine, de produits et d’emballage export de GEELUNG.',eyebrow:'GEELUNG · VIDÉOS',lead:'Cette page rassemble les vidéos de l’usine, des produits et de l’emballage export.',factory:'Usine et environnement de production',factoryNote:'Vidéo de l’usine et des équipements à ajouter.',product:'Corde tressée et corde crochetée',productNote:'Vidéo produit à ajouter.',packing:'Emballage export et expédition',packingNote:'Vidéo d’emballage et d’expédition à ajouter.',quote:'Demander un devis'},
  es:{title:'Vídeos',description:'Vea los vídeos de fábrica, producto y embalaje de exportación de GEELUNG.',eyebrow:'GEELUNG · VÍDEOS',lead:'Esta página reúne los vídeos de fábrica, producto y embalaje de exportación.',factory:'Fábrica y entorno de producción',factoryNote:'Vídeo de fábrica y equipos por añadir.',product:'Cuerda trenzada y cordón de ganchillo',productNote:'Vídeo de producto por añadir.',packing:'Embalaje de exportación y envío',packingNote:'Vídeo de embalaje y envío por añadir.',quote:'Solicitar cotización'},
  ja:{title:'動画資料',description:'GEELUNG の工場、製品、輸出梱包の動画資料をご覧ください。',eyebrow:'GEELUNG · 動画資料',lead:'このページでは工場、製品、輸出梱包に関する動画をまとめてご案内します。',factory:'工場・生産環境',factoryNote:'工場・設備動画を追加予定です。',product:'編組ロープ・かぎ編みロープ',productNote:'製品動画を追加予定です。',packing:'輸出梱包・出荷',packingNote:'梱包・出荷動画を追加予定です。',quote:'見積を依頼'},
  de:{title:'Videos',description:'Sehen Sie Fabrik-, Produkt- und Exportverpackungsvideos von GEELUNG.',eyebrow:'GEELUNG · VIDEOS',lead:'Diese Seite bündelt Videos zu Werk, Produkten und Exportverpackung.',factory:'Werk und Produktionsumgebung',factoryNote:'Werk- und Anlagenvideo wird ergänzt.',product:'Geflochtenes Seil und Häkelkordel',productNote:'Produktvideo wird ergänzt.',packing:'Exportverpackung und Versand',packingNote:'Verpackungs- und Versandvideo wird ergänzt.',quote:'Angebot anfordern'}
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params; const copy = content[locale]; const path = '/videos';
  return {title:`${copy.title} | GEELUNG`,description:copy.description,alternates:{canonical:absoluteUrl(locale,path),languages:languageAlternates(path)},openGraph:{title:`${copy.title} | GEELUNG`,description:copy.description,url:absoluteUrl(locale,path)}};
}

export default async function VideoPage({params}: Props) {
  const {locale} = await params; setRequestLocale(locale); const copy = content[locale];
  const videos = [[copy.factory, copy.factoryNote], [copy.product, copy.productNote], [copy.packing, copy.packingNote]];
  return <><Header /><main className="static-page video-page"><section className="static-hero"><div className="static-shell static-hero-copy video-hero-copy"><p className="breadcrumb"><Link href="/">GEELUNG</Link> / {copy.title}</p><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="lead">{copy.lead}</p></div></section><section className="static-section static-section-soft"><div className="static-shell video-library-grid">{videos.map(([title, note], index) => <article key={title} className="video-library-card"><MediaPlaceholder kind="Video" title={title} alt={`${title} — GEELUNG`} note={note} /><div><p className="eyebrow">0{index + 1} · GEELUNG</p><h2>{title}</h2><p>{note}</p><Link className="text-link" href="/inquiry">{copy.quote} <span aria-hidden>→</span></Link></div></article>)}</div></section></main></>;
}
