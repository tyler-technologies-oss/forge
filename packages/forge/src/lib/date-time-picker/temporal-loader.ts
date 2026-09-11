import type { Temporal } from 'temporal-polyfill';

/** Minimal runtime shape of the global `Temporal` namespace this component relies on. */
export interface TemporalNamespace {
  PlainDateTime: {
    from(item: string): Temporal.PlainDateTime;
  };
}

let temporalLoad: Promise<void> | null = null;

/** Returns the global `Temporal` namespace if present (native or already polyfilled), else `undefined`. */
export function getTemporal(): TemporalNamespace | undefined {
  return (globalThis as { Temporal?: TemporalNamespace }).Temporal;
}

/**
 * Lazily loads `temporal-polyfill` (installing the global `Temporal`) exactly once, caching the
 * import promise. Resolves immediately when `Temporal` already exists. A failed load is not cached
 * so a later call can retry.
 */
export function ensureTemporal(): Promise<void> {
  if (getTemporal()) {
    return Promise.resolve();
  }
  if (!temporalLoad) {
    temporalLoad = import('temporal-polyfill/global')
      .then(() => undefined)
      .catch(() => {
        temporalLoad = null;
      });
  }
  return temporalLoad;
}
