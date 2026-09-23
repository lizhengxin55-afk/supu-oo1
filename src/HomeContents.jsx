
const pages = [
  { title: "产品页", label: "Product Page", number: "01", href: "/product" },
  { title: "产品汇总", label: "Product List", number: "02", href: "/product-list" },
  { title: "博客汇总", label: "Blog List", number: "03", href: "/blog-list" },
  { title: "博客单页", label: "Blog Single", number: "04", href: "/blog-single" },
];

export function HomeContents() {
  return <section className="home-contents" aria-labelledby="contents-title">
    <div className="content-width">
      <div className="contents-heading"><p>PAGE DIRECTORY</p><h2 id="contents-title">页面制作 <span>.CONTENTS</span></h2></div>
      <div className="contents-grid">{pages.map((page) => <article className="contents-card" key={page.href}><div><h3>{page.title}</h3><p>{page.label}</p></div><a href={page.href} aria-label={`Open ${page.label}`}>{page.number}</a></article>)}</div>
    </div>
  </section>;
}
