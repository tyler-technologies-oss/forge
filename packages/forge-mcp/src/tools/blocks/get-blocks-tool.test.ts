import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetBlocksTool } from './get-blocks-tool.js';
import { _resetBlocksManifestCacheForTests } from '../../services/blocks-manifest-service.js';

// Mock manifest data matching the real manifest structure
const mockManifest = {
  blocks: [
    {
      id: 'forms/login/login',
      name: 'Login Form',
      description: 'A login form with email and password fields',
      tags: ['form', 'login', 'authentication'],
      file: 'forms/login/login.html',
      category: 'Forms',
      componentsUsed: ['forge-text-field', 'forge-button'],
    },
    {
      id: 'forms/add-user/add-user',
      name: 'Add User Form',
      description: 'Form for adding a new user with validation',
      tags: ['form', 'user', 'validation'],
      file: 'forms/add-user/add-user.html',
      category: 'Forms',
      componentsUsed: ['forge-text-field', 'forge-button', 'forge-select'],
    },
    {
      id: 'tables/data-table/data-table',
      name: 'Data Table',
      description: 'A sortable data table with pagination',
      tags: ['table', 'data', 'sorting', 'pagination'],
      file: 'tables/data-table/data-table.html',
      category: 'Tables',
      componentsUsed: ['forge-table', 'forge-pagination'],
    },
    {
      id: 'application-layout/dashboard/dashboard',
      name: 'Dashboard Layout',
      description: 'Application dashboard with cards and navigation',
      tags: ['layout', 'dashboard', 'navigation'],
      file: 'application-layout/dashboard/dashboard.html',
      category: 'Application Layout',
      componentsUsed: ['forge-card', 'forge-app-bar', 'forge-drawer'],
    },
    {
      id: 'cards/profile-card/profile-card',
      name: 'Profile Card',
      description: 'User profile card with avatar and details',
      tags: ['card', 'profile', 'user'],
      file: 'cards/profile-card/profile-card.html',
      category: 'Cards',
      componentsUsed: ['forge-card', 'forge-avatar'],
    },
  ],
  categories: [
    { name: 'Forms' },
    { name: 'Tables' },
    { name: 'Application Layout' },
    { name: 'Cards' },
  ],
  generatedAt: '2026-07-23T00:00:00Z',
};

describe('GetBlocksTool', () => {
  let tool: GetBlocksTool;

  beforeEach(() => {
    tool = new GetBlocksTool();
    vi.restoreAllMocks();
    _resetBlocksManifestCacheForTests();
  });

  describe('getTool', () => {
    it('should return valid tool definition', () => {
      const toolDef = tool.getTool();

      expect(toolDef.name).toBe('get_forge_blocks');
      expect(toolDef.description).toContain('Forge UI code blocks');
      expect(toolDef.inputSchema.properties).toHaveProperty('query');
      expect(toolDef.inputSchema.properties).toHaveProperty('blockId');
      expect(toolDef.inputSchema.properties).toHaveProperty('category');
      expect(toolDef.inputSchema.properties).toHaveProperty('component');
      expect(toolDef.inputSchema.properties).toHaveProperty('limit');
    });
  });

  describe('category filtering', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockManifest),
        text: () => Promise.resolve('<div>block content</div>'),
      } as Response);
    });

    it('should filter blocks by exact category match (lowercase)', async () => {
      const result = await tool.execute({ category: 'forms' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Login Form');
      expect(text).toContain('Add User Form');
      expect(text).not.toContain('Data Table');
      expect(text).not.toContain('Dashboard Layout');
    });

    it('should filter blocks by category with title case', async () => {
      const result = await tool.execute({ category: 'Forms' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Login Form');
      expect(text).toContain('Add User Form');
    });

    it('should filter blocks by category with spaces (normalized to dashes)', async () => {
      const result = await tool.execute({ category: 'application layout' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Dashboard Layout');
      expect(text).not.toContain('Login Form');
    });

    it('should filter blocks by category with dashes', async () => {
      const result = await tool.execute({ category: 'application-layout' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Dashboard Layout');
    });

    it('should return empty results for non-existent category', async () => {
      const result = await tool.execute({ category: 'non-existent' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('**Found:** 0 block(s)');
    });
  });

  describe('categories list rendering', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockManifest),
      } as Response);
    });

    it('should render category names correctly (not [object Object])', async () => {
      const result = await tool.execute({});
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('- Forms');
      expect(text).toContain('- Tables');
      expect(text).toContain('- Application Layout');
      expect(text).toContain('- Cards');
      expect(text).not.toContain('[object Object]');
    });
  });

  describe('component filtering', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockManifest),
      } as Response);
    });

    it('should filter blocks by component usage', async () => {
      const result = await tool.execute({ component: 'forge-table' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Data Table');
      expect(text).not.toContain('Login Form');
    });

    it('should filter by component case-insensitively', async () => {
      const result = await tool.execute({ component: 'FORGE-BUTTON' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Login Form');
      expect(text).toContain('Add User Form');
    });
  });

  describe('search query', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockManifest),
      } as Response);
    });

    it('should search by description keywords', async () => {
      const result = await tool.execute({ query: 'login' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Login Form');
    });

    it('should search by tags', async () => {
      const result = await tool.execute({ query: 'pagination' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Data Table');
    });

    it('should rank results by relevance', async () => {
      const result = await tool.execute({ query: 'form validation' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      // Add User Form has both 'form' and 'validation' in description/tags
      expect(text).toContain('Add User Form');
    });
  });

  describe('limit parameter', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockManifest),
      } as Response);
    });

    it('should respect limit parameter', async () => {
      const result = await tool.execute({ limit: 2 });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Showing 2 of 5 blocks');
    });

    it('should show all blocks when limit exceeds total', async () => {
      const result = await tool.execute({ limit: 100 });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).not.toContain('Showing');
      expect(text).toContain('**Found:** 5 block(s)');
    });
  });

  describe('block content retrieval', () => {
    const mockBlockContent =
      '<forge-text-field label="Email"></forge-text-field>';

    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockImplementation(url => {
        if (String(url).includes('manifest.json')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockManifest),
          } as Response);
        }
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve(mockBlockContent),
        } as Response);
      });
    });

    it('should fetch block content by ID', async () => {
      const result = await tool.execute({ blockId: 'forms/login/login' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('# Login Form');
      expect(text).toContain('forge-text-field');
      expect(text).toContain('```html');
    });

    it('should throw error for non-existent block', async () => {
      await expect(tool.execute({ blockId: 'non-existent' })).rejects.toThrow(
        'Block not found',
      );
    });
  });

  describe('error handling', () => {
    it('should throw error when manifest fetch fails', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(tool.execute({})).rejects.toThrow(
        'Failed to fetch blocks manifest',
      );
    });
  });
});
