import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { rm, writeFile } from 'fs/promises';
import { ValidateTokensTool } from './validate-tokens-tool.js';
import { DesignTokensManifest } from '../../types/index.js';

const { manifestPath } = vi.hoisted(() => ({ manifestPath: `${process.env.TMPDIR ?? '/tmp'}/forge-mcp-validate-tokens-${process.pid}.json` }));

vi.mock('../../services/design-tokens-service.js', async importOriginal => {
  const original = await importOriginal<typeof import('../../services/design-tokens-service.js')>();
  const service = new original.DesignTokensService({ manifestPath });
  return { ...original, getDesignTokensService: () => service };
});

vi.mock('../../services/cem-loader.js', () => ({
  getCEMLoader: () => ({
    isLoaded: () => true,
    loadCEM: vi.fn(),
    getAllComponents: () => [
      { tagName: 'forge-button', cssProperties: [{ name: '--forge-button-background' }] },
      { tagName: 'forge-icon-button', cssProperties: [{ name: '--forge-button-background' }] },
      { tagName: 'forge-divider' }
    ]
  })
}));

const manifest: DesignTokensManifest = {
  schemaVersion: '1.2.0',
  categories: [
    {
      name: 'spacing',
      tokens: [{ name: '--forge-spacing-medium', value: '16px', description: 'Standard spacing.' }]
    },
    {
      name: 'primary',
      tokens: [{ name: '--forge-theme-primary', value: '#3f51b5', values: { light: '#3f51b5', dark: '#8c9eff' } }]
    }
  ]
};

const getText = async (args: Parameters<ValidateTokensTool['execute']>[0]): Promise<string> => {
  const result = await new ValidateTokensTool().execute(args);
  return (result.content[0] as { text: string }).text;
};

describe('ValidateTokensTool', () => {
  beforeAll(async () => {
    await writeFile(manifestPath, JSON.stringify(manifest));
  });

  afterAll(async () => {
    await rm(manifestPath, { force: true });
  });

  it('should report every token as valid when all tokens exist', async () => {
    const text = await getText({ tokens: ['--forge-spacing-medium', '--forge-theme-primary'] });

    expect(text).toContain('**Valid tokens:** 2');
    expect(text).toContain('- **`--forge-spacing-medium`** - Standard spacing.');
    expect(text).toContain('All Forge tokens are valid!');
  });

  it('should extract and validate every forge custom property when given code', async () => {
    const text = await getText({ code: '.card { padding: var(--forge-spacing-medium); color: var(--forge-theme-primary, red); }' });

    expect(text).toContain('**Total Tokens Validated:** 2');
    expect(text).toContain('**Valid tokens:** 2');
  });

  it('should list unknown tokens with suggestions when a token does not exist', async () => {
    const text = await getText({ code: 'margin: var(--forge-spacing-medum);' });

    expect(text).toContain('- **`--forge-spacing-medum`** - did you mean `--forge-spacing-medium`?');
    expect(text).not.toContain('All Forge tokens are valid!');
  });

  it('should report component CSS properties separately when an unknown name belongs to a component', async () => {
    const text = await getText({ tokens: ['--forge-button-background'] });

    expect(text).toContain('- **`--forge-button-background`** - `forge-button`, `forge-icon-button`');
    expect(text).toContain('**Unknown tokens:** 0');
  });

  it('should list custom properties outside the forge namespace as ignored', async () => {
    const text = await getText({ tokens: ['--app-gutter', '--forge-spacing-medium'] });

    expect(text).toContain('**Ignored (not Forge tokens):** 1');
    expect(text).toContain('- `--app-gutter`');
    expect(text).toContain('**Total Tokens Validated:** 1');
  });

  it('should throw when neither tokens nor forge custom properties in code are provided', async () => {
    await expect(new ValidateTokensTool().execute({ code: '.card { padding: 16px; }' })).rejects.toThrow('Provide `tokens` or a `code` snippet');
  });
});
