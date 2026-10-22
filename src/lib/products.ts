export const products = [
  {slug: 'pvc-ultrafiltration-membrane-housing', key: 'membraneHousing', image: '/assets/membrane-housing.png'},
  {slug: 'upvc-cpvc-pipe-fittings', key: 'pipeFittings', image: '/assets/pipe-fittings.png'},
  {slug: 'industrial-pvc-valves', key: 'industrialValves', image: '/assets/industrial-valves.png'},
  {slug: 'transparent-pvc-pipe', key: 'transparentPipe', image: '/assets/transparent-pipe.png'}
] as const;

export const productSlugs = products.map((product) => product.slug);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

