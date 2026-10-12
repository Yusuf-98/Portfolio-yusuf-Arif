'use client';

import { useEffect, useRef, useState } from 'react';

// --- Lazy section ---
interface LazySectionProps {
  children: React.ReactNode;
}

export function LazySection({ children }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(typeof window === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (ready || !el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setReady(true);
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ready]);

  if (ready) return <div ref={ref}>{children}</div>;

  return (
    <div
      ref={ref}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  );
}
