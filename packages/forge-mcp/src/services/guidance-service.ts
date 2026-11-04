import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Agent guidance generated from the Forge docs site by docs/scripts/build-forge-skill.mjs.
const DEFAULT_GUIDANCE_URL = 'https://tylerforge.design/skill/forge-design';
const SUPPORTED_SCHEMA_VERSION = 1;
const CACHE_TTL_MS = 5 * 60 * 1000;
const BLOCKING_FETCH_TIMEOUT_MS = 1500;
const BACKGROUND_FETCH_TIMEOUT_MS = 10_000;

/** Files scripts/bundle-guidance.js copies into dist/bundled-guidance/ as an offline fallback. */
export const BUNDLED_GUIDANCE_FILES = ['rules.md', 'rules.json', 'manifest.json'] as const;
type BundledGuidanceFile = (typeof BUNDLED_GUIDANCE_FILES)[number];

export interface GuidancePage {
  name: string;
  title: string;
  description: string;
  docsPath: string;
  status?: string;
  category?: string;
}

export interface GuidanceManifest {
  schemaVersion: number;
  baseUrl: string;
  guides: GuidancePage[];
  components: GuidancePage[];
  design: GuidancePage[];
  development: GuidancePage[];
}

export interface GuidanceRules {
  schemaVersion: number;
  subpathOnlyComponents: string[];
}

interface CacheEntry {
  value: string;
  fetchedAt: number;
}

const _cache = new Map<string, CacheEntry>();
const _inFlight = new Map<string, Promise<string>>();

/** Base URL of the published guidance, overridable with FORGE_GUIDANCE_URL (e.g. to test a docs preview). */
export function getGuidanceBaseUrl(): string {
  return (process.env.FORGE_GUIDANCE_URL || DEFAULT_GUIDANCE_URL).replace(/\/+$/, '');
}

export function getGuidanceUrl(path: string): string {
  return `${getGuidanceBaseUrl()}/${path}`;
}

async function fetchGuidanceText(path: string, timeoutMs: number): Promise<string> {
  const response = await fetch(getGuidanceUrl(path), { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) {
    throw new Error(`Failed to fetch Forge guidance ${path}: ${response.status} ${response.statusText}`);
  }
  return response.text();
}

function refresh(path: string, timeoutMs: number): Promise<string> {
  const pending = _inFlight.get(path);
  if (pending) {
    return pending;
  }
  const request = fetchGuidanceText(path, timeoutMs)
    .then(value => {
      _cache.set(path, { value, fetchedAt: Date.now() });
      return value;
    })
    .finally(() => _inFlight.delete(path));
  _inFlight.set(path, request);
  return request;
}

const isBundledFile = (path: string): path is BundledGuidanceFile => (BUNDLED_GUIDANCE_FILES as readonly string[]).includes(path);

async function readBundledGuidance(path: string): Promise<string | null> {
  if (!isBundledFile(path)) {
    return null;
  }
  // dist/services/ → dist/bundled-guidance/
  const bundledPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'bundled-guidance', path);
  return readFile(bundledPath, 'utf-8').catch(() => null);
}

/**
 * Returns a guidance file, fresh from the docs site when possible.
 *
 * A cached copy is returned immediately; once it is older than the TTL a background refresh
 * replaces it, so a site outage keeps serving the last good copy. With nothing cached, the
 * fetch waits up to 1.5s before falling back to the copy bundled at build time.
 * @throws Error when the file can't be fetched and has no bundled copy
 */
export async function getGuidanceFile(path: string): Promise<string> {
  const cached = _cache.get(path);
  if (cached) {
    if (Date.now() - cached.fetchedAt > CACHE_TTL_MS) {
      refresh(path, BACKGROUND_FETCH_TIMEOUT_MS).catch(() => undefined);
    }
    return cached.value;
  }

  try {
    return await refresh(path, BLOCKING_FETCH_TIMEOUT_MS);
  } catch (error) {
    const bundled = await readBundledGuidance(path);
    if (bundled === null) {
      throw error;
    }
    // fetchedAt 0 keeps serving the bundled copy while every later call retries in the background.
    _cache.set(path, { value: bundled, fetchedAt: 0 });
    return bundled;
  }
}

/** Parses a versioned JSON guidance file, using the bundled copy when the live one is a newer schema than this server reads. */
async function getGuidanceJson<T extends { schemaVersion: number }>(path: BundledGuidanceFile): Promise<T> {
  const parsed = JSON.parse(await getGuidanceFile(path)) as T;
  if (parsed.schemaVersion <= SUPPORTED_SCHEMA_VERSION) {
    return parsed;
  }
  const bundled = await readBundledGuidance(path);
  if (bundled === null) {
    throw new Error(
      `Forge guidance ${path} uses schema ${parsed.schemaVersion}; this server reads up to ${SUPPORTED_SCHEMA_VERSION}. Update @tylertech/forge-mcp.`
    );
  }
  return JSON.parse(bundled) as T;
}

export const getGuidanceRulesMd = (): Promise<string> => getGuidanceFile('rules.md');

export const getGuidanceRules = (): Promise<GuidanceRules> => getGuidanceJson<GuidanceRules>('rules.json');

export const getGuidanceManifest = (): Promise<GuidanceManifest> => getGuidanceJson<GuidanceManifest>('manifest.json');

/** Fetches one reference page by its manifest `docsPath` (e.g. `components/card.md`). */
export const getGuidancePage = (docsPath: string): Promise<string> => getGuidanceFile(`references/${docsPath}`);

/** Test-only hook to clear the cache between test cases. */
export function _resetGuidanceCacheForTests(): void {
  _cache.clear();
  _inFlight.clear();
}
