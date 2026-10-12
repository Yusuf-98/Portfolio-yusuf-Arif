'use client';

import { useEffect, useRef, useState } from 'react';
import { HASH_SCROLL_END, HASH_SCROLL_START } from './HashScroll';

export function useHideOnScroll(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const jumping = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    // --- Scroll ---
    const onScroll = () => {
      if (ticking.current || jumping.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (currentScrollY <= 0) {
          setVisible(true);
          lastScrollY.current = currentScrollY;
        } else if (Math.abs(delta) > threshold) {
          setVisible(delta < 0);
          lastScrollY.current = currentScrollY;
        }
        ticking.current = false;
      });
    };

    // --- Link jumps ---
    const onJumpStart = () => {
      jumping.current = true;
      setVisible(false);
    };
    const onJumpEnd = () => {
      jumping.current = false;
      lastScrollY.current = window.scrollY;
      setVisible(window.scrollY <= 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener(HASH_SCROLL_START, onJumpStart);
    window.addEventListener(HASH_SCROLL_END, onJumpEnd);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(HASH_SCROLL_START, onJumpStart);
      window.removeEventListener(HASH_SCROLL_END, onJumpEnd);
    };
  }, [threshold]);

  return visible;
}
