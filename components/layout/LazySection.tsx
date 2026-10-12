'use client';

import { useEffect, useRef, useState } from 'react';

// --- Reveal all ---
export const REVEAL_ALL_EVENT = 'lazy-section:reveal-all';

export function revealAllSections() {
  window.dispatchEvent(new Event(REVEAL_ALL_EVENT));
}

// --- Lazy section ---
interface LazySectionProps {
  children: React.ReactNode;
  mobileHeight: number;
  desktopHeight: number;
}

export function LazySection({
  children,
  mobileHeight,
  desktopHeight,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (ready || !el) return;

    const reveal = () => setReady(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    window.addEventListener(REVEAL_ALL_EVENT, reveal);

    return () => {
      observer.disconnect();
      window.removeEventListener(REVEAL_ALL_EVENT, reveal);
    };
  }, [ready]);

  if (ready) return <div ref={ref}>{children}</div>;

  const placeholder = {
    className: 'min-h-(--lazy-h-m) md:min-h-(--lazy-h-d)',
    style: {
      '--lazy-h-m': `${mobileHeight}px`,
      '--lazy-h-d': `${desktopHeight}px`,
    } as React.CSSProperties,
  };

  if (typeof window === 'undefined') {
    return (
      <div ref={ref} {...placeholder}>
        <div hidden>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      {...placeholder}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  );
}
