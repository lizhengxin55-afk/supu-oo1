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

export const metadata = {
  title: "Supfield Technology | Industrial PVC Fabrics",
  description: "Industrial PVC fabrics, tarpaulins and custom material solutions for global projects.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
