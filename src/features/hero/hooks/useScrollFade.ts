import { useEffect, useState } from 'react';

export function useScrollFade(threshold = 100): number {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOpacity(y >= threshold ? 0 : 1 - y / threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return opacity;
}
