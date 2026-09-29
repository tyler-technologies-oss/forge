import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ValidateComponentApiTool } from './validate-component-api-tool.js';

// Mock component data
const mockButtonComponent = {
  tagName: 'forge-button',
  name: 'ButtonComponent',
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
      description: 'Button variant',
      deprecated: 'Use type instead',
    },
    {
      kind: 'field',
      name: 'type',
      privacy: 'public',
      description: 'Button type',
    },
    {
      kind: 'method',
      name: 'focus',
      privacy: 'public',
      description: 'Focus the button',
    },
    {
      kind: 'method',
      name: 'click',
      privacy: 'public',
      description: 'Trigger click',
    },
    {
      kind: 'field',
      name: '_internal',
      privacy: 'private',
      description: 'Internal field',
    },
  ],
  attributes: [
    { name: 'disabled', description: 'Disabled attribute' },
    { name: 'type', description: 'Type attribute' },
  ],
  events: [
    { name: 'click', description: 'Click event' },
    { name: 'focus', description: 'Focus event' },
  ],
  slots: [
    { name: 'default', description: 'Default slot' },
    { name: 'start', description: 'Start icon slot' },
  ],
  cssProperties: [
    { name: '--forge-button-background', description: 'Background color' },
    { name: '--forge-button-color', description: 'Text color' },
  ],
  cssParts: [
    { name: 'button', description: 'The button element' },
    { name: 'label', description: 'The label element' },
  ],
  cssClasses: [{ name: 'forge-button--raised', description: 'Raised style' }],
};

// Mock CEM loader
vi.mock('../../services/cem-loader.js', () => ({
  getCEMLoader: vi.fn(() => ({
    isLoaded: vi.fn(() => true),
    loadCEM: vi.fn().mockResolvedValue(undefined),
    getComponent: vi.fn((tagName: string) => {
      if (tagName === 'forge-button') {
        return mockButtonComponent;
      }
      return null;
    }),
    getComponentTagNames: vi.fn(() => [
      'forge-button',
      'forge-card',
      'forge-dialog',
    ]),
  })),
}));

// Mock template engine
vi.mock('../../services/handlebars-template-engine.js', () => ({
  getTemplateEngine: vi.fn(() => ({
    render: vi.fn((template: string, data: any) => {
      const sections: string[] = [];
      sections.push(`# Validation Results for ${data.tagName}`);
      sections.push('');

      if (data.invalidApis.length > 0) {
        sections.push('## Invalid APIs');
        for (const api of data.invalidApis) {
          sections.push(`- ${api.name} (${api.apiType})`);
        }
        sections.push('');
      }

      if (data.deprecatedApis.length > 0) {
        sections.push('## Deprecated APIs');
        for (const api of data.deprecatedApis) {
          sections.push(
            `- ${api.name}: ${api.deprecationMessage || 'Deprecated'}`,
          );
        }
        sections.push('');
      }

      if (data.validApis.length > 0) {
        sections.push('## Valid APIs');
        for (const api of data.validApis) {
          sections.push(`- ${api.name} (${api.apiType})`);
        }
      }

      if (data.invalidApis.length === 0 && data.deprecatedApis.length === 0) {
        sections.push('All APIs are valid!');
      }

      return Promise.resolve(sections.join('\n'));
    }),
  })),
}));

describe('ValidateComponentApiTool', () => {
  let tool: ValidateComponentApiTool;

  beforeEach(() => {
    tool = new ValidateComponentApiTool();
    vi.clearAllMocks();
  });

  describe('getTool', () => {
    it('should return valid tool definition', () => {
      const toolDef = tool.getTool();

      expect(toolDef.name).toBe('validate_component_api');
      expect(toolDef.description).toContain('Validate Tyler Forge component');
      expect(toolDef.inputSchema.properties).toHaveProperty('component');
      expect(toolDef.inputSchema.properties).toHaveProperty('apis');
      expect(toolDef.inputSchema.required).toContain('component');
    });
  });

  describe('property validation', () => {
    it('should validate valid properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { properties: ['disabled', 'type'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('disabled');
      expect(text).toContain('type');
      expect(text).not.toContain('Invalid APIs');
    });

    it('should detect invalid properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { properties: ['nonExistentProp'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('nonExistentProp');
    });

    it('should detect deprecated properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { properties: ['variant'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Deprecated APIs');
      expect(text).toContain('variant');
      expect(text).toContain('Use type instead');
    });

    it('should not expose private properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { properties: ['_internal'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('_internal');
    });
  });

  describe('attribute validation', () => {
    it('should validate valid attributes', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { attributes: ['disabled', 'type'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('disabled');
    });

    it('should detect invalid attributes', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { attributes: ['invalid-attr'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('invalid-attr');
    });
  });

  describe('event validation', () => {
    it('should validate valid events', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { events: ['click', 'focus'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('click');
    });

    it('should detect invalid events', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { events: ['nonexistent-event'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('nonexistent-event');
    });
  });

  describe('method validation', () => {
    it('should validate valid methods', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { methods: ['focus', 'click'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('focus');
    });

    it('should detect invalid methods', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { methods: ['invalidMethod'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('invalidMethod');
    });
  });

  describe('slot validation', () => {
    it('should validate valid slots', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { slots: ['default', 'start'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('default');
    });

    it('should detect invalid slots', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { slots: ['invalid-slot'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('invalid-slot');
    });
  });

  describe('CSS property validation', () => {
    it('should validate valid CSS properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssProperties: ['--forge-button-background'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('--forge-button-background');
    });

    it('should detect invalid CSS properties', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssProperties: ['--invalid-property'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('--invalid-property');
    });
  });

  describe('CSS part validation', () => {
    it('should validate valid CSS parts', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssParts: ['button', 'label'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('button');
    });

    it('should detect invalid CSS parts', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssParts: ['invalid-part'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('invalid-part');
    });
  });

  describe('CSS class validation', () => {
    it('should validate valid CSS classes', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssClasses: ['forge-button--raised'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('forge-button--raised');
    });

    it('should detect invalid CSS classes', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: { cssClasses: ['invalid-class'] },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Invalid APIs');
      expect(text).toContain('invalid-class');
    });
  });

  describe('error handling', () => {
    it('should throw error for missing component parameter', async () => {
      await expect(tool.execute({ component: '' } as any)).rejects.toThrow();
    });

    it('should throw error for non-existent component', async () => {
      await expect(
        tool.execute({
          component: 'forge-nonexistent',
          apis: { properties: ['test'] },
        }),
      ).rejects.toThrow('Component not found');
    });

    it('should return success message when no APIs provided', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: {},
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('No APIs provided');
    });
  });

  describe('mixed validation', () => {
    it('should validate multiple API types at once', async () => {
      const result = await tool.execute({
        component: 'forge-button',
        apis: {
          properties: ['disabled', 'invalid-prop'],
          events: ['click'],
          slots: ['default'],
        },
      });
      const text =
        result.content[0].type === 'text' ? result.content[0].text : '';

      expect(text).toContain('Valid APIs');
      expect(text).toContain('Invalid APIs');
      expect(text).toContain('disabled');
      expect(text).toContain('invalid-prop');
      expect(text).toContain('click');
    });
  });
});
