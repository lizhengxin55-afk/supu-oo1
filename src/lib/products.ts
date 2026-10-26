export const products = [
  {slug: 'pvc-ultrafiltration-membrane-housing', key: 'membraneHousing', image: '/assets/rope-spool.webp'},
  {slug: 'upvc-cpvc-pipe-fittings', key: 'pipeFittings', image: '/assets/rope-rolls.webp'},
  {slug: 'industrial-pvc-valves', key: 'industrialValves', image: '/assets/rope-warehouse.webp'},
  {slug: 'transparent-pvc-pipe', key: 'transparentPipe', image: '/assets/rope-spool.webp'}
] as const;

export const productSlugs = products.map((product) => product.slug);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
