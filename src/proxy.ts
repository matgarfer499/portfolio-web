import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed the `middleware` convention to `proxy`; next-intl's handler is the same.
export default createMiddleware(routing);

export const config = {
  // Run on every path except Next internals, Vercel internals, files with an extension, and the
  // extension-less generated images (icons; /en/opengraph-image must not redirect to /opengraph-image).
  matcher: ['/((?!api|_next|_vercel|icon|apple-icon|.*opengraph-image|.*\\..*).*)'],
};
