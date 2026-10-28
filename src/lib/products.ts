export const products = [
  {slug: 'crochet-rope', key: 'crochetRope', image: '/assets/rope-spool.webp'},
  {slug: 'braided-rope', key: 'braidedRope', image: '/assets/rope-rolls.webp'},
  {slug: 'rolled-braided-rope', key: 'rolledBraidedRope', image: '/assets/rope-warehouse.webp'},
  {slug: 'custom-braided-rope', key: 'customBraidedRope', image: '/assets/rope-spool.webp'}
] as const;

export const productSlugs = products.map((product) => product.slug);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

