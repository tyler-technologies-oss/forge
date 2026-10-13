import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mkdtemp, rm, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { DesignTokensService } from './design-tokens-service.js';
import { DesignTokensManifest } from '../types/index.js';

const manifest: DesignTokensManifest = {
  schemaVersion: '1.2.0',
  categories: [
    {
      name: 'spacing',
      description: 'Spacing.',
      tokens: [{ name: '--forge-spacing-medium', value: '16px', description: 'Standard spacing.' }]
    },
    {
      name: 'primary',
      tokens: [{ name: '--forge-theme-primary', value: '#3f51b5', values: { light: '#3f51b5', dark: '#8c9eff' } }]
    }
  ]
};

describe('DesignTokensService', () => {
  let dir: string;
  let manifestPath: string;

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'forge-mcp-tokens-'));
    manifestPath = join(dir, 'design-tokens.json');
    await writeFile(manifestPath, JSON.stringify(manifest));
  });

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it('should return categories in manifest order when loading the manifest', async () => {
    const service = new DesignTokensService({ manifestPath });

    const categories = await service.getCategories();

    expect(categories.map(({ name }) => name)).toEqual(['spacing', 'primary']);
  });

  it('should return the category when the name exists', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect((await service.getCategory('spacing'))?.description).toBe('Spacing.');
  });

  it('should return undefined when the category does not exist', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect(await service.getCategory('missing')).toBeUndefined();
  });

  it('should find a token across categories when given its custom property name', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect((await service.getToken('--forge-theme-primary'))?.values).toEqual({ light: '#3f51b5', dark: '#8c9eff' });
  });

  it('should return undefined when the token does not exist', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect(await service.getToken('--forge-nope')).toBeUndefined();
  });

  it('should throw when the manifest file does not exist', async () => {
    const service = new DesignTokensService({ manifestPath: join(dir, 'missing.json') });

    await expect(service.getCategories()).rejects.toThrow('Design tokens manifest not found');
  });

  it('should throw when the manifest has no categories', async () => {
    const invalidPath = join(dir, 'invalid.json');
    await writeFile(invalidPath, JSON.stringify({ schemaVersion: '1.2.0' }));
    const service = new DesignTokensService({ manifestPath: invalidPath });

    await expect(service.getCategories()).rejects.toThrow('Invalid design tokens manifest');
  });

  it('should retry loading when a previous load failed', async () => {
    const lazyPath = join(dir, 'lazy.json');
    const service = new DesignTokensService({ manifestPath: lazyPath });
    await expect(service.getCategories()).rejects.toThrow();

    await writeFile(lazyPath, JSON.stringify(manifest));

    expect(await service.getCategories()).toHaveLength(2);
  });
});
