import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchComponentsTool } from './find-components-tool.js';

// Mock the resource manager
vi.mock('../../resources/index.js', () => ({
  getResourceManager: vi.fn(() => ({
    initialize: vi.fn().mockResolvedValue(undefined),
    readResource: vi.fn().mockResolvedValue(`# Components

| Component | Description |
|-----------|-------------|
| forge-button | A button component |
| forge-card | A card container |
| forge-dialog | A dialog modal |
`),
  })),
}));

// Mock the CEM loader
vi.mock('../../services/cem-loader.js', () => ({
  getCEMLoader: vi.fn(() => ({
    getAllComponents: vi.fn(() => mockComponents),
  })),
}));

const mockComponents = [
  {
    tagName: 'forge-button',
    name: 'ButtonComponent',
    summary: 'A customizable button component',
    description: 'Button with various states and styles',
    members: [
      {
        kind: 'field',
        name: 'disabled',
        privacy: 'public',
        description: 'Disables the button',
      },
      {
        kind: 'field',
        name: 'variant',
        privacy: 'public',
        description: 'Button variant style',
      },
      {
        kind: 'method',
        name: 'focus',
        privacy: 'public',
        description: 'Focuses the button',
      },
    ],
    events: [{ name: 'click', description: 'Fired when clicked' }],
    slots: [{ name: 'default', description: 'Button content' }],
    cssParts: [{ name: 'button', description: 'The button element' }],
  },
  {
    tagName: 'forge-card',
    name: 'CardComponent',
    summary: 'A container card component',
    description: 'Card for grouping related content',
    members: [
      {
        kind: 'field',
        name: 'elevated',
        privacy: 'public',
        description: 'Adds elevation shadow',
      },
    ],
    events: [],
    slots: [
      { name: 'default', description: 'Card content' },
      { name: 'header', description: 'Card header content' },
    ],
    cssParts: [{ name: 'root', description: 'The root element' }],
  },
  {
    tagName: 'forge-dialog',
    name: 'DialogComponent',
    summary: 'A modal dialog component',
    description: 'Dialog for user interactions and confirmations',
    members: [
      {
        kind: 'field',
        name: 'open',
        privacy: 'public',
        description: 'Controls dialog visibility',
      },
      {
        kind: 'method',
        name: 'show',
        privacy: 'public',
        description: 'Shows the dialog',
      },
      {
        kind: 'method',
        name: 'hide',
        privacy: 'public',
        description: 'Hides the dialog',
      },
    ],
    events: [
      { name: 'forge-dialog-open', description: 'Fired when dialog opens' },
      { name: 'forge-dialog-close', description: 'Fired when dialog closes' },
    ],
    slots: [{ name: 'default', description: 'Dialog content' }],
    cssParts: [],
  },
  {
    tagName: 'forge-text-field',
    name: 'TextFieldComponent',
    summary: 'A text input field component',
    description: 'Text field with label and validation support',
    members: [
      {
        kind: 'field',
        name: 'value',
        privacy: 'public',
        description: 'The input value',
      },
      {
        kind: 'field',
        name: 'label',
        privacy: 'public',
        description: 'The field label',
      },
      {
        kind: 'field',
        name: 'invalid',
        privacy: 'public',
        description: 'Invalid state',
      },
    ],
    events: [{ name: 'input', description: 'Fired on input' }],
    slots: [],
    cssParts: [],
  },
];

describe('SearchComponentsTool', () => {
  let tool: SearchComponentsTool;

  beforeEach(() => {
    tool = new SearchComponentsTool();
    vi.clearAllMocks();
  });

  describe('getTool', () => {
    it('should return valid tool definition', () => {
      const toolDef = tool.getTool();

      expect(toolDef.name).toBe('find_components');
      expect(toolDef.description).toContain('Search Tyler Forge components');
      expect(toolDef.inputSchema.properties).toHaveProperty('query');
      expect(toolDef.inputSchema.properties).toHaveProperty('searchIn');
      expect(toolDef.inputSchema.properties).toHaveProperty('limit');
      expect(toolDef.inputSchema.properties).toHaveProperty('matchAll');
      expect(toolDef.inputSchema.properties).toHaveProperty('includeRelated');
    });
  });

  describe('search functionality', () => {
    it('should find components by name', async () => {
      const result = await tool.execute({ query: 'button' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-button');
    });

    it('should find components by description keyword', async () => {
      const result = await tool.execute({ query: 'modal' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-dialog');
    });

    it('should handle multi-term search', async () => {
      const result = await tool.execute({ query: 'text input' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-text-field');
    });

    it('should return no results message for unmatched query', async () => {
      const result = await tool.execute({ query: 'zzzznonexistent' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('No components found');
    });
  });

  describe('searchIn filtering', () => {
    it('should search only in name when specified', async () => {
      const result = await tool.execute({
        query: 'button',
        searchIn: ['name'],
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-button');
    });

    it('should search in properties when specified', async () => {
      const result = await tool.execute({
        query: 'disabled',
        searchIn: ['properties'],
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-button');
    });

    it('should search in events when specified', async () => {
      const result = await tool.execute({
        query: 'close',
        searchIn: ['events'],
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-dialog');
    });
  });

  describe('matchAll option', () => {
    it('should require all terms when matchAll is true', async () => {
      const result = await tool.execute({
        query: 'dialog open',
        matchAll: true,
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-dialog');
    });

    it('should exclude partial matches when matchAll is true', async () => {
      const result = await tool.execute({
        query: 'button dialog',
        matchAll: true,
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      // Neither component has both 'button' and 'dialog' in searchable content
      expect(text).toContain('No components found');
    });
  });

  describe('limit parameter', () => {
    it('should respect limit parameter', async () => {
      const result = await tool.execute({ query: 'forge', limit: 2 });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('showing top results');
    });

    it('should default to 10 results for search', async () => {
      const result = await tool.execute({ query: 'component' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      // With 4 mock components, all should be shown
      expect(text).not.toContain('showing top results');
    });
  });

  describe('list all mode (no query)', () => {
    it('should return all components when no query provided', async () => {
      const result = await tool.execute({});
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge-button');
      expect(text).toContain('forge-card');
      expect(text).toContain('forge-dialog');
    });

    it('should respect limit in list mode', async () => {
      const result = await tool.execute({ limit: 1 });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      // Should have limited results
      expect(text).toContain('forge-button');
    });
  });

  describe('scoring', () => {
    it('should score name matches higher than description matches', async () => {
      const result = await tool.execute({ query: 'card' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      // forge-card should rank high due to name match
      expect(text).toContain('forge-card');
      const cardIndex = text.indexOf('forge-card');
      expect(cardIndex).toBeGreaterThan(-1);
    });

    it('should include score in results', async () => {
      const result = await tool.execute({ query: 'button' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Score');
    });
  });

  describe('result formatting', () => {
    it('should include search terms in output', async () => {
      const result = await tool.execute({ query: 'button click' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Search terms:');
      expect(text).toContain('button');
      expect(text).toContain('click');
    });

    it('should include documentation links', async () => {
      const result = await tool.execute({ query: 'button' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('forge://component/forge-button');
    });

    it('should show match reasons', async () => {
      const result = await tool.execute({ query: 'disabled' });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Matches');
    });
  });
});
