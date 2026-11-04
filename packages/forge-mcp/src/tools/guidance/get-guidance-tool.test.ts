import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetGuidanceTool, normalizeTopic } from './get-guidance-tool.js';
import { _resetGuidanceCacheForTests } from '../../services/guidance-service.js';

const BASE_URL = 'https://tylerforge.design/skill/forge-design';

const mockManifest = {
  schemaVersion: 1,
  baseUrl: `${BASE_URL}/references/`,
  guides: [{ name: 'ui-plan', title: 'UI plan contract', description: 'The UI plan contract.', docsPath: 'ui-plan.md' }],
  components: [
    { name: 'card', title: 'Card', description: 'Cards group | related content.', docsPath: 'components/card.md', category: 'layout' },
    { name: 'tabs', title: 'Tabs', description: 'Tabs switch views.', docsPath: 'components/tabs.md', category: 'navigation' }
  ],
  design: [{ name: 'typography', title: 'Typography', description: 'Type scale.', docsPath: 'design/typography.md', status: 'experimental' }],
  development: [
    { name: 'typography', title: 'Typography setup', description: 'Loading fonts.', docsPath: 'development/typography.md' },
    { name: 'frameworks/react', title: 'React', description: 'Using Forge in React.', docsPath: 'development/frameworks/react.md' }
  ]
};

const pages: Record<string, string> = {
  'manifest.json': JSON.stringify(mockManifest),
  'rules.md': '# Tyler Forge rules and workflow\n\n1. Start from a block.',
  'references/ui-plan.md': '# UI plan contract',
  'references/components/card.md': '# Card\n\nUse a scaffold.',
  'references/components/tabs.md': '# Tabs',
  'references/design/typography.md': '# Typography',
  'references/development/frameworks/react.md': '# React'
};

const textOf = (result: Awaited<ReturnType<GetGuidanceTool['execute']>>): string => (result.content[0].type === 'text' ? result.content[0].text : '');

describe('GetGuidanceTool', () => {
  let tool: GetGuidanceTool;

  beforeEach(() => {
    vi.restoreAllMocks();
    _resetGuidanceCacheForTests();
    tool = new GetGuidanceTool();
    vi.spyOn(global, 'fetch').mockImplementation(async input => {
      const path = String(input).replace(`${BASE_URL}/`, '');
      const body = pages[path];
      return (body === undefined
        ? { ok: false, status: 404, statusText: 'Not Found' }
        : { ok: true, text: () => Promise.resolve(body) }) as unknown as Response;
    });
  });

  it('should define get_forge_guidance with an optional topic', () => {
    const definition = tool.getTool();

    expect(definition.name).toBe('get_forge_guidance');
    expect(definition.inputSchema.properties).toHaveProperty('topic');
    expect(definition.inputSchema.required).toEqual([]);
  });

  it('should list every page by section with its topic when no topic is given', async () => {
    const text = textOf(await tool.execute({}));

    expect(text).toContain('## Guides');
    expect(text).toContain('| `ui-plan` | UI plan contract |');
    expect(text).toContain('| `components/card` | Card | Cards group \\| related content. |');
    expect(text).toContain('| `design/typography` | Typography (experimental) |');
    expect(text).toContain('| `development/frameworks/react` | React |');
  });

  it('should return a component page with next steps for its blocks and API', async () => {
    const text = textOf(await tool.execute({ topic: 'components/card' }));

    expect(text).toContain('Use a scaffold.');
    expect(text).toContain(`**Source:** ${BASE_URL}/references/components/card.md`);
    expect(text).toContain('get_forge_blocks(component: "forge-card")');
    expect(text).toContain('get_component_docs(component: "forge-card")');
  });

  it('should point to find_components when a component page is not named after a tag', async () => {
    const text = textOf(await tool.execute({ topic: 'tabs' }));

    expect(text).toContain('# Tabs');
    expect(text).toContain('find_components(query: "Tabs")');
    expect(text).not.toContain('"forge-tabs"');
  });

  it('should resolve a bare name, a forge- tag, and a relative reference link to the same page', async () => {
    for (const topic of ['card', 'forge-card', '../components/card.md#anatomy']) {
      expect(textOf(await tool.execute({ topic }))).toContain('Use a scaffold.');
    }
  });

  it('should return the rules for the rules topic', async () => {
    expect(textOf(await tool.execute({ topic: 'rules' }))).toContain('1. Start from a block.');
  });

  it('should ask for a section when a bare name matches more than one page', async () => {
    await expect(tool.execute({ topic: 'typography' })).rejects.toThrow('"design/typography", "development/typography"');
  });

  it('should point to the index when a topic does not exist', async () => {
    await expect(tool.execute({ topic: 'components/nope' })).rejects.toThrow('Call get_forge_guidance with no topic');
  });
});

describe('normalizeTopic', () => {
  it('should strip reference prefixes, extensions, anchors, and case', () => {
    expect(normalizeTopic('references/Components/Card.md#anatomy')).toBe('components/card');
    expect(normalizeTopic('./color.md')).toBe('color');
    expect(normalizeTopic(' development/frameworks/react/ ')).toBe('development/frameworks/react');
  });
});
