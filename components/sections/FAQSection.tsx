'use client';

import { useState } from 'react';
import { FaqItem } from '@/components/ui/FaqItem';
import { FaqAccordionItem } from '@/components/ui/FaqAccordionItem';
import { Container } from '../layout/Container';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  fadeIn,
  transitionDelayed,
} from '@/lib/animations/staggered-item';

// --- FAQ data ---
const faqData = [
  {
    id: 1,
    question: 'What technologies do you specialize in?',
    answer:
      'React and Next.js with TypeScript and Tailwind CSS, implementing designs from Figma or similar tools pixel-accurate. For data, I use TanStack Query with REST APIs, and Zustand or Redux Toolkit for client state.',
  },
  {
    id: 2,
    question: 'Do you work on both design and development?',
    answer:
      'I focus primarily on frontend development, translating UI/UX designs into responsive and interactive web experiences. However, I collaborate closely with designers to ensure a seamless user experience.',
  },
  {
    id: 3,
    question: 'Can you optimize an existing website for better performance?',
    answer:
      'Yes! I can analyze, debug, and optimize websites to improve speed, accessibility, and SEO, using best practices like lazy loading, code splitting, and performance monitoring.',
  },
  {
    id: 4,
    question: 'Are you open to full-time or contract roles?',
    answer:
      "Yes, both. I'm looking for remote frontend roles and can adjust my working hours to overlap with your team's time zone.",
  },
  {
    id: 5,
    question: 'How do you approach a new project?',
    answer:
      'I start from the available design, whether in Figma or a similar tool, and the API docs, then break the interface into reusable components, connect them to real data, and cover the key flows with tests and CI before deploying.',
  },
  {
    id: 6,
    question: 'How do you work with a remote team?',
    answer:
      'I keep communication clear and written: regular progress updates, questions raised early, and blockers flagged before they turn into delays.',
  },
];

// --- FAQ Section ---
export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(faqData[0].id);

  return (
    <section
      id='faq'
      className='relative w-full max-w-360 mx-auto bg-base-black py-10 md:py-20 z-20'
    >
      <Container>
        {/* --- FAQ Header --- */}
        <div className='flex flex-col items-center gap-2 mb-6 md:mb-16 z-20'>
          {/* Section label */}
          <motion.span
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0)}
            className='text-md font-medium text-primary-200 md:text-sec-label'
          >
            FAQ
          </motion.span>

          {/* Section title */}
          <motion.h2
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.15)}
            className='w-73 md:w-full text-display-md tracking-t-none font-extrabold text-neutral-25 text-center md:text-sec-title'
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
        </div>

        {/* --- Desktop grid --- */}
        <div className='hidden md:flex flex-col gap-10'>
          {/* Row 1 */}
          <div className='flex flex-row items-start gap-10'>
            <div className='flex-1'>
              <FaqItem
                question={faqData[0].question}
                answer={faqData[0].answer}
                index={0}
                direction='left'
              />
            </div>
            <motion.div
              variants={fadeIn}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.15)}
              className='w-px self-stretch bg-neutral-800 shrink-0'
            />
            <div className='flex-1'>
              <FaqItem
                question={faqData[1].question}
                answer={faqData[1].answer}
                index={1}
                direction='right'
              />
            </div>
          </div>

          <motion.div
            variants={fadeIn}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.3)}
            className='w-full h-px bg-neutral-800'
          />

          {/* Row 2 */}
          <div className='flex flex-row items-start gap-10'>
            <div className='flex-1'>
              <FaqItem
                question={faqData[2].question}
                answer={faqData[2].answer}
                index={2}
                direction='left'
              />
            </div>
            <motion.div
              variants={fadeIn}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.45)}
              className='w-px self-stretch bg-neutral-800 shrink-0'
            />
            <div className='flex-1'>
              <FaqItem
                question={faqData[3].question}
                answer={faqData[3].answer}
                index={3}
                direction='right'
              />
            </div>
          </div>

          <motion.div
            variants={fadeIn}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={transitionDelayed(0.6)}
            className='w-full h-px bg-neutral-800'
          />

          {/* Row 3 */}
          <div className='flex flex-row items-start gap-10'>
            <div className='flex-1'>
              <FaqItem
                question={faqData[4].question}
                answer={faqData[4].answer}
                index={4}
                direction='left'
              />
            </div>
            <motion.div
              variants={fadeIn}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              transition={transitionDelayed(0.75)}
              className='w-px self-stretch bg-neutral-800 shrink-0'
            />
            <div className='flex-1'>
              <FaqItem
                question={faqData[5].question}
                answer={faqData[5].answer}
                index={5}
                direction='right'
              />
            </div>
          </div>
        </div>

        {/* --- Mobile accordion --- */}
        <div className='flex md:hidden flex-col'>
          {faqData.map((item, index) => (
            <div key={item.id} className='flex flex-col'>
              <FaqAccordionItem
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId((prev) => (prev === item.id ? null : item.id))
                }
              />
              {index < faqData.length - 1 && (
                <motion.div
                  variants={fadeIn}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }}
                  transition={transitionDelayed(index * 0.15)}
                  className='w-full h-px bg-neutral-800 my-4'
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
