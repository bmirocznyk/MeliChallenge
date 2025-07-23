import '@testing-library/jest-dom';

// Mock IntersectionObserver
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
  } as any;
}

// Mock ResizeObserver  
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    constructor() {}
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
  } as any;
}

// Mock window object for tests
Object.defineProperty(globalThis, 'window', {
  value: {
    location: {
      href: '',
      assign: () => {},
      replace: () => {},
      reload: () => {}
    },
    history: {
      back: () => {},
      forward: () => {},
      go: () => {},
      pushState: () => {},
      replaceState: () => {}
    }
  },
  writable: true
}); 