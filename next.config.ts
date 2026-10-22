import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl({
  reactStrictMode: true,
  // Keeps local static generation within the available Windows memory budget.
  experimental: {cpus: 1}
});

