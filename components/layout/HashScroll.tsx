'use client';

import { useEffect } from 'react';
import { revealAllSections } from './LazySection';

// --- Scroll events ---
export const HASH_SCROLL_START = 'hash-scroll:start';
export const HASH_SCROLL_END = 'hash-scroll:end';

// --- Hash scroll ---
export function HashScroll() {
  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const scrollToId = (id: string) => {
      cancelAnimationFrame(frame);
      cancelled = false;
      revealAllSections();
      window.dispatchEvent(new Event(HASH_SCROLL_START));
      const finish = () => window.dispatchEvent(new Event(HASH_SCROLL_END));

      let waited = 0;
      let started = false;
      let lastY = -1;
      let still = 0;
      let corrections = 0;

      const step = () => {
        if (cancelled) return finish();
        const el = document.getElementById(id);
        const locked = document.body.hasAttribute('data-scroll-locked');

        if (!started) {
          waited += 1;
          if (el && (!locked || waited > 90) && waited > 1) {
            started = true;
            el.scrollIntoView({ behavior: 'smooth' });
          }
          frame = requestAnimationFrame(step);
          return;
        }

        if (window.scrollY === lastY) still += 1;
        else still = 0;
        lastY = window.scrollY;

        if (still >= 6 && el) {
          const offset = el.getBoundingClientRect().top;
          if (Math.abs(offset) <= 2 || corrections >= 2) return finish();
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
      if (!id) return;
      e.preventDefault();
      history.pushState(null, '', `#${id}`);
      scrollToId(id);
    };
    const cancel = () => {
      cancelled = true;
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchmove', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    if (window.location.hash) scrollToId(window.location.hash.slice(1));

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchmove', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, []);

  return null;
}
