/* eslint-disable camelcase -- plan JSON keys (page_type, spacing_scale, etc.) are the documented on-wire schema. */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ValidateUIPlanTool } from './validate-ui-plan-tool.js';
import { _resetBlocksManifestCacheForTests } from '../../services/blocks-manifest-service.js';

vi.mock('../../services/cem-loader.js', () => ({
  getCEMLoader: vi.fn(() => ({
    isLoaded: vi.fn(() => true),
    loadCEM: vi.fn().mockResolvedValue(undefined),
    getComponentTagNames: vi.fn(() => ['forge-app-bar', 'forge-drawer']),
  })),
}));

vi.mock('../../services/icon-search-service.js', () => ({
  getIconSearchService: vi.fn(() => ({
    searchIcons: vi.fn().mockResolvedValue([]),
  })),
}));

describe('ValidateUIPlanTool', () => {
  let tool: ValidateUIPlanTool;

  beforeEach(() => {
    tool = new ValidateUIPlanTool();
    vi.restoreAllMocks();
    _resetBlocksManifestCacheForTests();
  });

  it('renders a valid result with no errors block', async () => {
    const result = await tool.execute({
      plan: {
        page_type: 'dashboard',
        regions: {
          header: { component: 'forge-app-bar' },
        },
        typography: {},
        spacing_scale: 'tokens-only',
        icons: [],
      },
    });
    const text =
      result.content[0].type === 'text' ? result.content[0].text : '';

    expect(text).toContain('**Valid:** ✅ true');
    expect(text).not.toContain('## Errors');
    expect(text).toContain('Proceed: call `get_forge_blocks`');
  });

  it('renders errors with hints and a machine-readable JSON block', async () => {
    const result = await tool.execute({
      plan: JSON.stringify({
        page_type: 'not-a-real-type',
        regions: {
          header: { component: 'forge-nonexistent' },
        },
        typography: {},
        spacing_scale: 'tokens-only',
        icons: [],
      }),
    });
    const text =
      result.content[0].type === 'text' ? result.content[0].text : '';

    expect(text).toContain('**Valid:** ❌ false');
    expect(text).toContain('## Errors');
    expect(text).toContain('page_type');
    expect(text).toContain('*Hint:*');
    expect(text).toContain('```json');
    expect(text).toContain('"valid": false');
  });
});
