import { notFound } from 'next/navigation';

// Any unknown path under a locale renders that locale's not-found page (with a 404 status).
export default function UnknownPage(): never {
  notFound();
}
