import { describe, expect, it } from 'vitest';

const modules = import.meta.glob<Record<string, unknown>>('./**/index.ts', { eager: true });

describe('chart marks', () => {
  it.each(Object.entries(modules))('should export mark functions from %s', (_path, module) => {
    const functions = Object.values(module).filter(value => typeof value === 'function');

    expect(functions.length).toBeGreaterThan(0);
  });
});
