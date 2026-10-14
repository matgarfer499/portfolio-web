import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  // React <ViewTransition> on client navigations (home ↔ case studies). Experimental in Next 16.
  experimental: { viewTransition: true },
  images: { qualities: [75], formats: ['image/avif', 'image/webp'] },
};

export default withNextIntl(nextConfig);
