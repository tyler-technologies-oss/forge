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
      tokens: [
        { name: '--forge-spacing-medium', value: '16px', description: 'Standard spacing.' },
        { name: '--forge-spacing-large', value: '24px', description: 'Generous spacing.' }
      ]
    },
    {
      name: 'primary',
      tokens: [
        { name: '--forge-theme-primary', value: '#3f51b5', values: { light: '#3f51b5', dark: '#8c9eff' } },
        { name: '--forge-theme-primary-container', value: '#d1d5ed', description: 'Standard primary container background.' }
      ]
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

  it('should return every category when searching without a category or query', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect((await service.search()).map(({ name }) => name)).toEqual(['spacing', 'primary']);
  });

  it('should return only the requested category when searching by category', async () => {
    const service = new DesignTokensService({ manifestPath });

    const results = await service.search({ category: 'primary' });

    expect(results.map(({ name }) => name)).toEqual(['primary']);
    expect(results[0].tokens).toHaveLength(2);
  });

  it('should throw with the available categories when searching an unknown category', async () => {
    const service = new DesignTokensService({ manifestPath });

    await expect(service.search({ category: 'color' })).rejects.toThrow('Available categories: spacing, primary');
  });

  it('should match tokens containing every query term when searching by query', async () => {
    const service = new DesignTokensService({ manifestPath });

    const results = await service.search({ query: 'Primary   CONTAINER' });

    expect(results.flatMap(({ tokens }) => tokens).map(({ name }) => name)).toEqual(['--forge-theme-primary-container']);
  });

  it('should match tokens by value and themed values when searching by query', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect((await service.search({ query: '24px' }))[0].tokens.map(({ name }) => name)).toEqual(['--forge-spacing-large']);
    expect((await service.search({ query: '#8c9eff' }))[0].tokens.map(({ name }) => name)).toEqual(['--forge-theme-primary']);
  });

  it('should match every token in a category when the query matches the category name', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect((await service.search({ query: 'spacing' }))[0].tokens).toHaveLength(2);
  });

  it('should omit categories without matches when searching by query', async () => {
    const service = new DesignTokensService({ manifestPath });

    expect(await service.search({ category: 'spacing', query: 'container' })).toEqual([]);
  });

  it('should report existing tokens as valid when validating', async () => {
    const service = new DesignTokensService({ manifestPath });

    const result = await service.validate(['--forge-spacing-medium', 'forge-theme-primary', ' --forge-spacing-medium ']);

    expect(result.valid.map(({ name }) => name)).toEqual(['--forge-spacing-medium', '--forge-theme-primary']);
    expect(result.unknown).toEqual([]);
  });

  it('should suggest close matches when validating an unknown forge token', async () => {
    const service = new DesignTokensService({ manifestPath });

    const { unknown } = await service.validate(['--forge-spacing-medum']);

    expect(unknown).toEqual([{ name: '--forge-spacing-medum', suggestions: ['--forge-spacing-medium'] }]);
  });

  it('should not suggest anything when validating a token unlike any other', async () => {
    const service = new DesignTokensService({ manifestPath });

    const { unknown } = await service.validate(['--forge-zzzzzzzz']);

    expect(unknown).toEqual([{ name: '--forge-zzzzzzzz', suggestions: [] }]);
  });

  it('should ignore custom properties outside the forge namespace when validating', async () => {
    const service = new DesignTokensService({ manifestPath });

    const result = await service.validate(['--app-gutter']);

    expect(result).toEqual({ valid: [], unknown: [], ignored: ['--app-gutter'] });
  });
});
