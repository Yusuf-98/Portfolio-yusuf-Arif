'use client';

import { useEffect } from 'react';

// --- Hash scroll correction ---
export function HashScroll() {
  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const settle = (id: string) => {
      cancelAnimationFrame(frame);
      cancelled = false;
      let lastY = -1;
      let still = 0;
      let corrections = 0;

      const step = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (!el) return;
        if (window.scrollY === lastY) still += 1;
        else still = 0;
        lastY = window.scrollY;

        if (still >= 6) {
          const offset = el.getBoundingClientRect().top;
          if (Math.abs(offset) <= 2 || corrections >= 3) return;
          corrections += 1;
          still = 0;
          window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
        }
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      if (id) settle(id);
    };
    const cancel = () => {
      cancelled = true;
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    if (window.location.hash) settle(window.location.hash.slice(1));

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, []);

  return null;
}
