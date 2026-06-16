import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/** Locale-aware navigation primitives — they keep the active locale across links and redirects. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
