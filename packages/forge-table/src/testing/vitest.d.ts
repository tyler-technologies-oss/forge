import 'vitest';
import type { RunOptions } from 'axe-core';

interface CustomMatchers<R = unknown> {
  toBeAccessible(options?: RunOptions): Promise<R>;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
