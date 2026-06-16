import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed the `middleware` convention to `proxy`; next-intl's handler is the same.
export default createMiddleware(routing);

export const config = {
  // Run on every path except Next internals, Vercel internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
