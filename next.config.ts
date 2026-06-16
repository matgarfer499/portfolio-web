import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The WebGL game layer ships only to the client; the fast layer stays fully SSG.
  experimental: {
    optimizePackageImports: ['three', '@react-three/drei'],
  },
};

export default withNextIntl(nextConfig);
