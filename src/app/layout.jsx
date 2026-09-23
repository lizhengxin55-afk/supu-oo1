import "../styles.css";
import "../mega-menu.css";
import "../home-contents.css";
import "../contact-page.css";
import "../inquiry-page.css";
import "../product-template.css";
import "../company-moments.css";
import "../site-pages/product-page.css";
import "../site-pages/product-list-page.css";
import "../site-pages/blog-list-page.css";
import "../site-pages/blog-single-page.css";
import "../whatsapp-button.css";
import "../tailwind.css";
import "../i18n/language-switcher.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.geelung.com"),
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
