import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// --- Cleanup ---
afterEach(() => {
  cleanup();
});

// --- jsdom stubs ---
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (!('IntersectionObserver' in globalThis)) {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    value: IntersectionObserverStub,
    writable: true,
  });
}

HTMLCanvasElement.prototype.getContext = (() =>
  null) as unknown as HTMLCanvasElement['getContext'];
