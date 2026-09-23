import type { Metadata } from "next";

export const locales = ["en", "fr", "es", "ja", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeLabels: Record<Locale, string> = { en: "English", fr: "Français", es: "Español", ja: "日本語", de: "Deutsch" };
export const localeHreflang: Record<Locale, string> = { en: "en", fr: "fr", es: "es", ja: "ja", de: "de" };
export const routeKeys = ["home", "product", "productList", "blogList", "blogSingle", "contact", "inquiry", "soundproofBarrier"] as const;
export type RouteKey = (typeof routeKeys)[number];
const routePaths: Record<RouteKey, string> = { home: "/", product: "/product", productList: "/product-list", blogList: "/blog-list", blogSingle: "/blog-single", contact: "/contact", inquiry: "/inquiry", soundproofBarrier: "/products/pvc-soundproof-barrier" };
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.geelung.com").replace(/\/$/, "");

export const isLocale = (value: string | undefined): value is Locale => Boolean(value && locales.includes(value as Locale));
export const getRoutePath = (routeKey: RouteKey) => routePaths[routeKey];
export const getRouteKey = (segments: string[]): RouteKey | null => routeKeys.find((key) => getRoutePath(key).split("/").filter(Boolean).join("/") === segments.join("/")) ?? null;
export const localizedPath = (locale: Locale, routeKey: RouteKey) => locale === defaultLocale ? getRoutePath(routeKey) : `/${locale}${getRoutePath(routeKey) === "/" ? "" : getRoutePath(routeKey)}`;

const seo: Record<Locale, Record<RouteKey, { title: string; description: string }>> = {
  en: {
    home: { title: "Industrial PVC Fabrics & Tarpaulins | Supfield Technology", description: "Industrial PVC fabrics, tarpaulins and OEM/ODM material solutions for global projects." },
    product: { title: "Industrial PVC Fabrics for Global Projects | Supfield", description: "Explore high-strength PVC and EVA tarpaulins for construction, transport and temporary engineering." },
    productList: { title: "Industrial PVC Fabric Product Categories | Supfield", description: "Browse PVC coated fabrics, tarpaulins, soundproof barriers and custom industrial covers." },
    blogList: { title: "PVC Fabric Sourcing Guides & Articles | Supfield", description: "Practical articles for buyers of industrial PVC fabrics and tarpaulin solutions." },
    blogSingle: { title: "How to Select PVC Fabric for Industrial Covers | Supfield", description: "A practical guide to specifying PVC fabric for industrial covers and demanding projects." },
    contact: { title: "Contact Supfield Technology | Industrial PVC Fabric Supplier", description: "Contact Supfield for PVC fabric specifications, OEM/ODM projects and export enquiries." },
    inquiry: { title: "Request an Industrial PVC Fabric Quote | Supfield", description: "Send your PVC fabric, tarpaulin or custom industrial cover requirements to Supfield." },
    soundproofBarrier: { title: "PVC Soundproof Barrier Manufacturer | Supfield", description: "Custom PVC soundproof barriers for construction, industrial zones and infrastructure projects." },
  },
  fr: { home: { title: "Tissus PVC industriels et bâches | Supfield", description: "Tissus PVC, bâches et solutions OEM/ODM pour projets internationaux." }, product: { title: "Tissus PVC industriels | Supfield", description: "Bâches PVC et EVA pour la construction, le transport et les projets temporaires." }, productList: { title: "Catégories de produits PVC industriels | Supfield", description: "Tissus enduits PVC, bâches, barrières acoustiques et couvertures sur mesure." }, blogList: { title: "Guides d'achat des tissus PVC | Supfield", description: "Articles pratiques pour les acheteurs de tissus PVC industriels." }, blogSingle: { title: "Choisir un tissu PVC pour couvertures industrielles | Supfield", description: "Guide pratique pour spécifier des tissus PVC." }, contact: { title: "Contacter Supfield Technology", description: "Contactez Supfield pour vos projets PVC et OEM/ODM." }, inquiry: { title: "Demander un devis PVC industriel | Supfield", description: "Envoyez vos besoins en bâches ou tissus PVC." }, soundproofBarrier: { title: "Barrières acoustiques PVC | Supfield", description: "Barrières acoustiques PVC sur mesure pour chantiers." } },
  es: { home: { title: "Tejidos PVC industriales y lonas | Supfield", description: "Tejidos PVC, lonas y soluciones OEM/ODM para proyectos globales." }, product: { title: "Tejidos PVC industriales | Supfield", description: "Lonas PVC y EVA para construcción, transporte e ingeniería temporal." }, productList: { title: "Categorías de productos PVC industriales | Supfield", description: "Tejidos recubiertos, lonas, barreras acústicas y cubiertas a medida." }, blogList: { title: "Guías de compra de tejidos PVC | Supfield", description: "Artículos prácticos para compradores de tejidos PVC industriales." }, blogSingle: { title: "Cómo elegir tejido PVC para cubiertas industriales | Supfield", description: "Guía práctica para especificar tejido PVC." }, contact: { title: "Contactar Supfield Technology", description: "Contacte con Supfield para proyectos PVC y OEM/ODM." }, inquiry: { title: "Solicitar cotización de PVC industrial | Supfield", description: "Envíe sus requisitos de lonas o tejidos PVC." }, soundproofBarrier: { title: "Barreras acústicas de PVC | Supfield", description: "Barreras acústicas de PVC personalizadas para obras." } },
  ja: { home: { title: "産業用PVC生地・ターポリン | Supfield", description: "世界のプロジェクト向けPVC生地、ターポリン、OEM/ODMソリューション。" }, product: { title: "産業用PVC生地 | Supfield", description: "建設、輸送、仮設工事向けPVC・EVAターポリン。" }, productList: { title: "産業用PVC製品カテゴリー | Supfield", description: "PVCコーティング生地、ターポリン、防音バリア、特注カバー。" }, blogList: { title: "PVC生地の調達ガイド | Supfield", description: "産業用PVC生地の購入者向け実践記事。" }, blogSingle: { title: "産業用カバー用PVC生地の選び方 | Supfield", description: "PVC生地仕様の実践ガイド。" }, contact: { title: "Supfield Technologyへのお問い合わせ", description: "PVCおよびOEM/ODMプロジェクトについてお問い合わせください。" }, inquiry: { title: "産業用PVCの見積依頼 | Supfield", description: "ターポリンまたはPVC生地の要件をお送りください。" }, soundproofBarrier: { title: "PVC防音バリア | Supfield", description: "建設現場向け特注PVC防音バリア。" } },
  de: { home: { title: "Industrielle PVC-Gewebe und Planen | Supfield", description: "PVC-Gewebe, Planen und OEM/ODM-Lösungen für globale Projekte." }, product: { title: "Industrielle PVC-Gewebe | Supfield", description: "PVC- und EVA-Planen für Bau, Transport und temporäre Projekte." }, productList: { title: "Produktkategorien für industrielle PVC-Gewebe | Supfield", description: "PVC-beschichtete Gewebe, Planen, Schallschutzbarrieren und kundenspezifische Abdeckungen." }, blogList: { title: "Beschaffungsleitfäden für PVC-Gewebe | Supfield", description: "Praxisartikel für Käufer industrieller PVC-Gewebe." }, blogSingle: { title: "PVC-Gewebe für Industrieabdeckungen auswählen | Supfield", description: "Praktischer Leitfaden zur PVC-Spezifikation." }, contact: { title: "Supfield Technology kontaktieren", description: "Kontaktieren Sie Supfield für PVC- und OEM/ODM-Projekte." }, inquiry: { title: "Angebot für industrielles PVC anfordern | Supfield", description: "Senden Sie Ihre Anforderungen für Planen oder PVC-Gewebe." }, soundproofBarrier: { title: "PVC-Schallschutzbarrieren | Supfield", description: "Kundenspezifische PVC-Schallschutzbarrieren für Baustellen." } },
};

export function getSeoMetadata(locale: Locale, routeKey: RouteKey): Metadata {
  const route = getRoutePath(routeKey);
  const title = seo[locale][routeKey].title;
  const description = seo[locale][routeKey].description;
  const languages = Object.fromEntries(locales.map((item) => [localeHreflang[item], `${siteUrl}${localizedPath(item, routeKey)}`]));
  languages["x-default"] = `${siteUrl}${route}`;
  return { title, description, alternates: { canonical: `${siteUrl}${localizedPath(locale, routeKey)}`, languages }, openGraph: { title, description, url: `${siteUrl}${localizedPath(locale, routeKey)}`, locale: locale === "en" ? "en_US" : locale, type: routeKey === "blogSingle" ? "article" : "website" } };
}
