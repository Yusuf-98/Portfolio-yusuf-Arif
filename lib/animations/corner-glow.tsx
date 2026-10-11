'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- CornerGlow ---
interface CornerGlowProps {
  color?: string;
  duration?: number;
  delay?: number;
  opacity?: number;
  borderRadius?: string;
  innerBorderRadius?: string;
}

export function CornerGlow({
  color = '#91FF02',
  duration = 3,
  delay = 0,
  opacity = 0.4,
  borderRadius = '16px',
  innerBorderRadius = '14px',
}: CornerGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '200px' });

  return (
    <motion.div
      ref={ref}
      className='pointer-events-none absolute inset-0'
      style={{
        background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
        borderRadius,
      }}
      animate={inView ? { opacity: [0, opacity, 0] } : { opacity: 0 }}
      transition={
        inView
          ? {
              duration: duration * 2,
              ease: 'easeInOut',
              repeat: Infinity,
              delay,
              times: [0, 0.5, 1],
            }
          : { duration: 0 }
      }
      aria-hidden
    >
      <div
        className='absolute bg-base-black'
        style={{ inset: '2px', borderRadius: innerBorderRadius }}
      />
    </motion.div>
  );
}
