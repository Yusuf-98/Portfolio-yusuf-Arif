'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6 bg-base-black px-4 text-center'>
      {/* Message */}
      <span className='text-md font-medium text-primary-200 md:text-sec-label'>
        ERROR
      </span>
      <h1 className='text-display-md font-extrabold text-neutral-25 md:text-sec-title'>
        SOMETHING WENT WRONG
      </h1>
      <p className='max-w-128 text-md text-neutral-400'>
        An unexpected error occurred. Please try again.
      </p>

      {/* Actions */}
      <div className='flex flex-col gap-3 sm:flex-row'>
        <button
          type='button'
          onClick={reset}
          className='inline-flex h-12 w-48 cursor-pointer items-center justify-center rounded-full bg-primary-200 text-sm font-bold text-neutral-950 lg:h-14 lg:text-md'
        >
          TRY AGAIN
        </button>
        <Link
          href='/'
          className='inline-flex h-12 w-48 items-center justify-center rounded-full border border-neutral-800 text-sm font-bold text-neutral-25 lg:h-14 lg:text-md'
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
