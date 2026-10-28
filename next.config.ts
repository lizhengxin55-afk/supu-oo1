import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  reactStrictMode: true,
  // Keeps local static generation within the available Windows memory budget.
  experimental: {cpus: 1},
  async redirects() {
    const legacyProducts = [
      ['pvc-ultrafiltration-membrane-housing', 'crochet-rope'],
      ['upvc-cpvc-pipe-fittings', 'braided-rope'],
      ['industrial-pvc-valves', 'rolled-braided-rope'],
      ['transparent-pvc-pipe', 'custom-braided-rope']
    ];
    return legacyProducts.flatMap(([source, destination]) => [
      {source: '/products/' + source, destination: '/products/' + destination, permanent: true},
      {source: '/:locale/products/' + source, destination: '/:locale/products/' + destination, permanent: true}
    ]);
  }
});

