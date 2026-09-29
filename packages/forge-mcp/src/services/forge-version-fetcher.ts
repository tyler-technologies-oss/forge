import { CustomElementsManifest } from '../types/index.js';
import { PackageManifest } from './package-discovery.js';

// Used when the server has no access to a local node_modules install (e.g.
// the remotely hosted Streamable HTTP deployment) to serve docs for the
// latest published release instead of the version bundled at build time.
const NPM_LATEST_URL = 'https://registry.npmjs.org/@tylertech/forge/latest';
const UNPKG_MANIFEST_URL = (version: string): string =>
  `https://unpkg.com/@tylertech/forge@${version}/custom-elements.json`;
const FETCH_TIMEOUT_MS = 5000;

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`${url} responded with ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch the custom-elements.json for the latest published @tylertech/forge
 * version from the npm registry / unpkg. Returns null on any failure so
 * callers can fall back to the bundled snapshot.
 */
export async function fetchLatestForgeManifest(): Promise<PackageManifest | null> {
  try {
    const latest = (await fetchJson(NPM_LATEST_URL)) as { version: string };
    const manifestUrl = UNPKG_MANIFEST_URL(latest.version);
    const content = (await fetchJson(manifestUrl)) as CustomElementsManifest;

    return {
      packageName: '@tylertech/forge',
      manifestPath: manifestUrl,
      content,
    };
  } catch {
    return null;
  }
}
