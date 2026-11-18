import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ValidateComponentApiTool } from './validate-component-api-tool.js';
import { PackageManifest } from '../../services/package-discovery.js';

const mockDialogComponent = {
  tagName: 'forge-dialog',
  name: 'DialogComponent',
  kind: 'class',
  customElement: true,
  attributes: [{ name: 'label', description: 'The accessible label of the dialog.' }]
};

const { getComponentPackage } = vi.hoisted(() => ({
  getComponentPackage: vi.fn<(tagName: string) => Partial<PackageManifest> | undefined>()
}));

vi.mock('../../services/cem-loader.js', () => ({
  getCEMLoader: vi.fn(() => ({
    isLoaded: vi.fn(() => true),
    loadCEM: vi.fn().mockResolvedValue(undefined),
    getComponent: vi.fn((tagName: string) => (tagName === 'forge-dialog' ? mockDialogComponent : undefined)),
    getComponentPackage,
    getComponentTagNames: vi.fn(() => ['forge-dialog'])
  }))
}));

const validateLabelledBy = async (): Promise<string> => {
  const tool = new ValidateComponentApiTool();
  const result = await tool.execute({ component: 'forge-dialog', apis: { attributes: ['labelledby'] } });
  return result.content[0].type === 'text' ? result.content[0].text : '';
};

describe('ValidateComponentApiTool manifest source', () => {
  beforeEach(() => {
    getComponentPackage.mockReset();
  });

  it('should name the installed version and flag a possible version mismatch when an API is unmatched', async () => {
    getComponentPackage.mockReturnValue({ packageName: '@tylertech/forge', version: '3.23.1', source: 'installed' });

    const text = await validateLabelledBy();

    expect(text).toContain('**Checked Against:** `@tylertech/forge@3.23.1` (installed in this project)');
    expect(text).toContain('**Version mismatch?**');
  });

  it('should not flag a version mismatch when validating against the latest published release', async () => {
    getComponentPackage.mockReturnValue({ packageName: '@tylertech/forge', version: '3.24.0', source: 'latest' });

    const text = await validateLabelledBy();

    expect(text).toContain('`@tylertech/forge@3.24.0` (latest published release, no local install found)');
    expect(text).not.toContain('Version mismatch?');
  });

  it('should identify the bundled snapshot when no local install or published release was loaded', async () => {
    getComponentPackage.mockReturnValue({ packageName: '@tylertech/forge', version: '3.24.0', source: 'bundled' });

    const text = await validateLabelledBy();

    expect(text).toContain('(snapshot bundled with this MCP server, no local install found)');
    expect(text).not.toContain('Version mismatch?');
  });

  it('should omit the version when the installed package version is unknown', async () => {
    getComponentPackage.mockReturnValue({ packageName: '@tylertech/forge', source: 'installed' });

    const text = await validateLabelledBy();

    expect(text).toContain('**Checked Against:** `@tylertech/forge` (installed in this project)');
  });

  it('should omit the source line when the component package is unknown', async () => {
    getComponentPackage.mockReturnValue(undefined);

    const text = await validateLabelledBy();

    expect(text).not.toContain('Checked Against');
    expect(text).not.toContain('Version mismatch?');
  });
});
