'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  fadeInUp,
  fadeInDown,
  transitionDelayed,
} from '@/lib/animations/staggered-item';
import { Container } from '@/components/layout/Container';
import { BoxPattern } from '@/components/ui/BoxPattern';
import { FloatingBoat } from '@/lib/animations/floating-boat';

// --- Tech icon data ---
const TECH_ICONS = [
  { name: 'HTML', src: '/icons/tech/html.png' },
  { name: 'CSS', src: '/icons/tech/css.png' },
  { name: 'JavaScript', src: '/icons/tech/javascript.png' },
  { name: 'TypeScript', src: '/icons/tech/typescript.png' },
  { name: 'React', src: '/icons/tech/react-js.png' },
  { name: 'Next.js', src: '/icons/tech/next-js.svg' },
  { name: 'Tailwind CSS', src: '/icons/tech/tailwind-css.svg' },
  { name: 'Figma', src: '/icons/tech/figma.svg' },
];

// --- Stack data ---
const STACK = [
  {
    group: 'Core',
    items: [
      'HTML',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vite',
      'React Router',
    ],
  },
  {
    group: 'Styling & UI',
    items: ['CSS', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Framer Motion'],
  },
  {
    group: 'Data & State',
    items: [
      'TanStack Query',
      'Redux Toolkit',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Axios',
    ],
  },
  {
    group: 'Quality & Delivery',
    items: [
      'Vitest',
      'Testing Library',
      'ESLint',
      'Lighthouse',
      'Git',
      'GitHub Actions',
      'Vercel',
    ],
  },
  {
    group: 'Design Handoff',
    items: ['Figma'],
  },
];

// --- Delay ---
const D_LABEL = 0.0;
const D_TITLE = 0.15;
const D_ICON_ROW1_BASE = 0.15;
const D_ICON_ROW2_BASE = 0.15;
const D_ICON_STAGGER = 0.1;
const D_GROUP_BASE = 0.15;
const D_GROUP_STAGGER = 0.1;

// --- Skills section ---
export function Skills() {
  return (
    <section
      id='skills'
      className='defer-render relative w-full max-w-360 mx-auto bg-base-black pt-10 pb-32 md:pt-19 md:pb-12'
    >
      {/* Box pattern */}
      <motion.div
        variants={fadeInDown}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        transition={transitionDelayed(0.0)}
        className='absolute bottom-0 left-0'
      >
        <BoxPattern rotate={90} />
      </motion.div>

      <Container>
        <div className='flex flex-col gap-10 md:flex-row md:items-center md:gap-sec-skill-content'>
          {/* Skills content */}
          <div className='flex flex-col gap-6 md:basis-90.25 md:grow-4 md:gap-sec-skill-content'>
            <div className='flex flex-col gap-2'>
              {/* Skills label */}
              <motion.span
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_LABEL)}
                className='text-md font-medium text-primary-200 md:text-sec-label'
              >
                SKILLS
              </motion.span>

              {/* Skills title */}
              <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(D_TITLE)}
                className='text-display-md tracking-t-none font-extrabold text-neutral-25 md:text-sec-title'
              >
                SKILLS THAT BRING IDEAS TO LIFE
              </motion.h2>
            </div>

            {/* Tech icon grid */}
            <div className='flex flex-col gap-6'>
              {/* Row 1 */}
              <div className='flex flex-row justify-evenly gap-6 md:justify-start'>
                {TECH_ICONS.slice(0, 4).map((icon, i) => (
                  <FloatingBoat key={icon.name} index={i}>
                    <motion.div
                      variants={fadeInDown}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0.2 }}
                      transition={transitionDelayed(
                        D_ICON_ROW1_BASE + i * D_ICON_STAGGER
                      )}
                      className='flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 p-1'
                    >
                      <Image
                        src={icon.src}
                        alt={icon.name}
                        width={48}
                        height={48}
                        className='h-full w-full object-contain'
                      />
                    </motion.div>
                  </FloatingBoat>
                ))}
              </div>

              {/* Row 2 */}
              <div className='flex flex-row justify-evenly gap-6 md:justify-start'>
                {TECH_ICONS.slice(4, 8).map((icon, i) => (
                  <FloatingBoat key={icon.name} index={i + 4}>
                    <motion.div
                      variants={fadeInUp}
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true, amount: 0.2 }}
                      transition={transitionDelayed(
                        D_ICON_ROW2_BASE + i * D_ICON_STAGGER
                      )}
                      className='flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 p-1'
                    >
                      <Image
                        src={icon.src}
                        alt={icon.name}
                        width={48}
                        height={48}
                        className='h-full w-full object-contain'
                      />
                    </motion.div>
                  </FloatingBoat>
                ))}
              </div>
            </div>
          </div>

          {/* Stack groups */}
          <div className='flex w-full flex-col gap-6 md:basis-90.25 md:grow-6'>
            {STACK.map((group, index) => (
              <motion.div
                key={group.group}
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                transition={transitionDelayed(
                  D_GROUP_BASE + index * D_GROUP_STAGGER
                )}
                className='flex flex-col gap-3'
              >
                <h3 className='text-sm font-semibold uppercase tracking-widest text-primary-200'>
                  {group.group}
                </h3>
                <ul className='flex flex-wrap gap-2'>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className='rounded-full border border-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-25 md:text-md'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
