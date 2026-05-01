import { useEffect, useRef } from 'react';

type Callback = (x: number, y: number) => void;

export function usePointerPosition(callback: Callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        callbackRef.current(e.clientX, e.clientY);
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
