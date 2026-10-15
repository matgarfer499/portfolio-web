import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  // React <ViewTransition> on client navigations (home ↔ case studies). Experimental in Next 16.
  experimental: { viewTransition: true },
  images: { qualities: [75], formats: ['image/avif', 'image/webp'] },
  // The previous site served the CV at an accented file name; links to it elsewhere keep working.
  redirects: async () => [
    {
      source: '/Mat%C3%ADas-Jos%C3%A9-Garc%C3%ADa-Fern%C3%A1ndez-CV.pdf',
      destination: '/matias-garcia-cv.pdf',
      permanent: true,
    },
    // The site was bilingual until v4; Spanish links land on the English page.
    { source: '/es', destination: '/', permanent: true },
    { source: '/es/:path*', destination: '/:path*', permanent: true },
  ],
};

export default withNextIntl(nextConfig);
