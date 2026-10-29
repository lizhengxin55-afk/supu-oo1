export const products = [
  {slug: 'crochet-rope', key: 'crochetRope', image: '/assets/rope-spool.webp', width: 900, height: 614, imageAlt: 'White polyester crochet cord on an industrial spool'},
  {slug: 'braided-rope', key: 'braidedRope', image: '/assets/rope-rolls.webp', width: 900, height: 614, imageAlt: 'White nylon braided rope rolls for industrial export orders'},
  {slug: 'rolled-braided-rope', key: 'rolledBraidedRope', image: '/assets/rope-warehouse.webp', width: 1280, height: 800, imageAlt: 'Bulk rolled braided rope prepared for export packing'},
  {slug: 'custom-braided-rope', key: 'customBraidedRope', image: '/assets/rope-spool.webp', width: 900, height: 614, imageAlt: 'Custom braided rope on a large industrial spool'}
] as const;

export const productSlugs = products.map((product) => product.slug);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
