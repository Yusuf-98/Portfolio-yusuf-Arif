'use client';

import { useId } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInUp, transitionDelayed } from '@/lib/animations/staggered-item';

// --- FAQ Accordion Item ---
interface FaqAccordionItemProps {
  question: string;
  answer: string;
  index?: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqAccordionItem({
  question,
  answer,
  index = 0,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const answerId = useId();

  return (
    <motion.div
      variants={fadeInUp}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      transition={transitionDelayed(index * 0.15)}
      className='flex flex-col'
    >
      {/* Question */}
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className='flex w-full flex-row items-start gap-3 text-left'
      >
        <span className='relative mt-1 h-6 w-6 shrink-0'>
          <Image
            src='/icons/list-icon-bright.png'
            alt=''
            fill
            sizes='24px'
            className='object-contain'
          />
        </span>
        <h3 className='flex-1 text-lg font-bold text-neutral-25'>{question}</h3>
        <svg
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='mt-1.5 h-5 w-5 shrink-0 stroke-neutral-25'
          fill='none'
          strokeWidth={2}
          strokeLinecap='round'
        >
          <path d='M5 12h14' />
          {!isOpen && <path d='M12 5v14' />}
        </svg>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <p className='pt-2 pl-9 text-sm font-medium text-neutral-400'>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
