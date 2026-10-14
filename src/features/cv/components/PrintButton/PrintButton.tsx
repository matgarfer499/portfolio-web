'use client';

import { Button } from '@shared/components/atoms/Button/Button';
import { Icon } from '@shared/components/atoms/Icon/Icon';

// "Download PDF" is the browser's print dialog: the print stylesheet lays the page out as A4.
export function PrintButton({ label, hint }: { label: string; hint: string }) {
  return (
    <Button variant="dark" title={hint} onClick={() => window.print()}>
      <Icon name="download" />
      {label}
    </Button>
  );
}
