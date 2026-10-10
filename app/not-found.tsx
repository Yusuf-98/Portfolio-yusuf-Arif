import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6 bg-base-black px-4 text-center'>
      {/* Message */}
      <span className='text-md font-medium text-primary-200 md:text-sec-label'>
        404
      </span>
      <h1 className='text-display-md font-extrabold text-neutral-25 md:text-sec-title'>
        PAGE NOT FOUND
      </h1>
      <p className='max-w-128 text-md text-neutral-400'>
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Action */}
      <Link
        href='/'
        className='inline-flex h-12 w-48 items-center justify-center rounded-full bg-primary-200 text-sm font-bold text-neutral-950 lg:h-14 lg:text-md'
      >
        BACK TO HOME
      </Link>
    </main>
  );
}
