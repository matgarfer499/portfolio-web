'use client';

import { useEffect } from 'react';
import { emitTrophy } from '@shared/events/trophy-bus';

export function CaseOpened() {
  useEffect(() => emitTrophy('case-study-opened'), []);
  return null;
}
