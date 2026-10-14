import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { rm, writeFile } from 'fs/promises';
import { DesignTokensTool } from './get-design-tokens-tool.js';
import { DesignTokensManifest } from '../../types/index.js';

const { manifestPath } = vi.hoisted(() => ({ manifestPath: `${process.env.TMPDIR ?? '/tmp'}/forge-mcp-get-design-tokens-${process.pid}.json` }));

vi.mock('../../services/design-tokens-service.js', async importOriginal => {
  const original = await importOriginal<typeof import('../../services/design-tokens-service.js')>();
  const service = new original.DesignTokensService({ manifestPath });
  return { ...original, getDesignTokensService: () => service };
});

const manifest: DesignTokensManifest = {
  schemaVersion: '1.2.0',
  categories: [
    {
      name: 'spacing',
      description: 'The spacing used between content.',
      tokens: [
        { name: '--forge-spacing-medium', value: '16px', description: 'Standard spacing.' },
        { name: '--forge-spacing-large', value: '24px', description: 'Generous spacing.' }
      ]
    },
    {
      name: 'error',
      description: 'Colors that indicate errors.',
      tokens: [
        { name: '--forge-theme-error', value: '#b00020', values: { light: '#b00020', dark: '#ec8396' }, description: 'The error color.' },
        {
          name: '--forge-theme-error-container',
          value: '#ecc2c9',
          values: { light: '#ecc2c9', dark: '#5a4145' },
          description: 'The error container | background.'
        }
      ]
    }
  ]
};

const getText = async (tool: DesignTokensTool, args: Parameters<DesignTokensTool['execute']>[0]): Promise<string> => {
  const result = await tool.execute(args);
  return (result.content[0] as { text: string }).text;
};

describe('DesignTokensTool', () => {
  beforeAll(async () => {
    await writeFile(manifestPath, JSON.stringify(manifest));
  });

  afterAll(async () => {
    await rm(manifestPath, { force: true });
  });

  it('should list every category with its token count when called without arguments', async () => {
    const text = await getText(new DesignTokensTool(), {});

    expect(text).toContain('| `spacing` | 2 | The spacing used between content. |');
    expect(text).toContain('| `error` | 2 | Colors that indicate errors. |');
    expect(text).not.toContain('--forge-spacing-large');
  });

  it('should list every token in a category with its value when given a category', async () => {
    const text = await getText(new DesignTokensTool(), { category: 'spacing' });

    expect(text).toContain('| `--forge-spacing-medium` | `16px` | Standard spacing. |');
    expect(text).toContain('| `--forge-spacing-large` | `24px` | Generous spacing. |');
    expect(text).not.toContain('--forge-theme-error');
  });

  it('should show light and dark values when the category has themed tokens', async () => {
    const text = await getText(new DesignTokensTool(), { category: 'error' });

    expect(text).toContain('| Token | Light | Dark | Description |');
    expect(text).toContain('| `--forge-theme-error` | `#b00020` | `#ec8396` | The error color. |');
  });

  it('should escape pipes in descriptions when rendering token tables', async () => {
    const text = await getText(new DesignTokensTool(), { category: 'error' });

    expect(text).toContain('The error container \\| background.');
  });

  it('should return only matching tokens across categories when given a query', async () => {
    const text = await getText(new DesignTokensTool(), { query: 'error container' });

    expect(text).toContain('Design Tokens matching "error container"');
    expect(text).toContain('Found 1 matching token.');
    expect(text).toContain('`--forge-theme-error-container`');
    expect(text).not.toContain('`--forge-theme-error`');
  });

  it('should search within the category when given a category and query', async () => {
    const text = await getText(new DesignTokensTool(), { category: 'spacing', query: 'generous' });

    expect(text).toContain('`--forge-spacing-large`');
    expect(text).not.toContain('`--forge-spacing-medium`');
  });

  it('should explain that nothing matched when the query has no results', async () => {
    const text = await getText(new DesignTokensTool(), { category: 'spacing', query: 'error' });

    expect(text).toBe('No design tokens found matching "error" in category "spacing". Call `get_design_tokens` with no arguments to see all categories.');
  });

  it('should return the overview when the query is blank', async () => {
    const text = await getText(new DesignTokensTool(), { query: '   ' });

    expect(text).toContain('## Categories');
  });

  it('should throw with the available categories when the category does not exist', async () => {
    await expect(new DesignTokensTool().execute({ category: 'color' })).rejects.toThrow('Available categories: spacing, error');
  });
});
