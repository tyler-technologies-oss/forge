import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
// @ts-expect-error untyped script module
import { SOURCE_PATH, TARGET_PATHS } from '../scripts/sync-version.mjs';

const readJson = (path: string): { version: string; plugins: { version: string }[] } => JSON.parse(readFileSync(path, 'utf8'));

describe('plugin version sync', () => {
  const expected: string = readJson(SOURCE_PATH).version;
  const [manifestPath, marketplacePath] = TARGET_PATHS as string[];

  it('should match the forge-mcp version in the plugin manifest', () => {
    expect(readJson(manifestPath).version).toBe(expected);
  });

  it('should match the forge-mcp version in the marketplace plugin entry', () => {
    expect(readJson(marketplacePath).plugins[0].version).toBe(expected);
  });
});
