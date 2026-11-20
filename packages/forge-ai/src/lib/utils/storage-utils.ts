export type StorageKind = 'local' | 'session';

export interface StorageOptions {
  /** Which Web Storage area to use. `session` is per-tab, `local` is shared across tabs on the origin. */
  kind: StorageKind;
  /** The storage key. */
  key: string;
}

export interface WriteStorageOptions extends StorageOptions {
  /** The number to store. */
  value: number;
}

function resolveStorage(kind: StorageKind): Storage {
  return kind === 'session' ? window.sessionStorage : window.localStorage;
}

/**
 * Reads a numeric value from Web Storage.
 *
 * @returns The parsed number, or `undefined` if the key is missing, not a finite number, or storage is unavailable.
 */
export function readStoredNumber({ kind, key }: StorageOptions): number | undefined {
  try {
    const raw = resolveStorage(kind).getItem(key);
    if (raw === null) {
      return undefined;
    }
    const value = Number(raw);
    return Number.isFinite(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Writes a numeric value to Web Storage. Fails silently if storage is unavailable
 * (private mode, sandboxed iframe, quota exceeded).
 */
export function writeStoredNumber({ kind, key, value }: WriteStorageOptions): void {
  try {
    resolveStorage(kind).setItem(key, String(value));
  } catch {
    // Persistence is best-effort.
  }
}

/**
 * Removes a value from Web Storage. Fails silently if storage is unavailable.
 */
export function removeStoredValue({ kind, key }: StorageOptions): void {
  try {
    resolveStorage(kind).removeItem(key);
  } catch {
    // Nothing to clear.
  }
}
