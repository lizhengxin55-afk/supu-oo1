import "../styles.css";
import "../mega-menu.css";
import "../home-contents.css";
import "../contact-page.css";
import "../inquiry-page.css";
import "../product-template.css";
import "../company-moments.css";
import "../site-pages/product-page.css";
import "../site-pages/product-sheet.css";
import "../site-pages/product-list-page.css";
import "../site-pages/blog-list-page.css";
import "../site-pages/blog-single-page.css";
import "../whatsapp-button.css";
import "../tailwind.css";
import "../i18n/language-switcher.css";
import "../header-alignment.css";
import "../hero-video.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.geelung.com"),
  title: { default: "Jiangsu Guolong | Industrial PVC Fabrics & Geosynthetics", template: "%s | Jiangsu Guolong" },
  description: "Manufacturer of PVC coated fabrics, soundproof tarpaulins, fireproof scaffold mesh, geocell and geonet for global projects.",
};

export default function RootLayout({ children }) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Jiangsu Guolong New Materials Technology Co., Ltd.", url: "https://www.geelung.com", logo: "https://www.geelung.com/assets/guolong-logo.jpg", description: "Industrial PVC fabrics and geosynthetics manufacturer for global construction and engineering projects.", address: { "@type": "PostalAddress", streetAddress: "11 Huaxia Road", addressLocality: "Xuzhou", addressRegion: "Jiangsu", addressCountry: "CN" }, contactPoint: [{ "@type": "ContactPoint", contactType: "sales", availableLanguage: ["English", "Chinese"] }] };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
