'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- FloatingBoat ---
interface FloatingBoatProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FloatingBoat({
  children,
  index = 0,
  className,
  style,
}: FloatingBoatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '200px' });

  return (
    <motion.div
      ref={ref}
      animate={
        inView
          ? {
              y: [0, -5, 0, -3, 0],
              x: [0, 1.5, 0, -1.5, 0],
              rotate: [0, 0.5, 0, -0.5, 0],
            }
          : { y: 0, x: 0, rotate: 0 }
      }
      transition={
        inView
          ? {
              duration: 5,
              delay: index * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
            }
          : { duration: 0 }
      }
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
