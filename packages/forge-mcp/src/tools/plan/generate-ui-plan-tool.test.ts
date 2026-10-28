import { describe, it, expect } from 'vitest';
import { GenerateUIPlanTool } from './generate-ui-plan-tool.js';
import { REGION_NAMES } from './plan-types.js';

describe('GenerateUIPlanTool', () => {
  const tool = new GenerateUIPlanTool();

  const getTemplate = async (): Promise<any> => {
    const result = await tool.execute({ description: 'a dashboard' });
    const text = result.content[0].type === 'text' ? result.content[0].text : '';

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      throw new Error('Expected a ```json block in the tool output.');
    }

    return JSON.parse(jsonMatch[1]);
  };

  it('emits a plan template whose region keys are all legal region names', async () => {
    const template = await getTemplate();
    const regionKeys = Object.keys(template.regions);

    expect(regionKeys.length).toBeGreaterThan(0);
    for (const key of regionKeys) {
      expect(REGION_NAMES).toContain(key);
    }
  });

  it('should default the page title to text-heading4 and section headings to text-heading3', async () => {
    const { typography } = await getTemplate();

    expect(typography.page_title).toBe('text-heading4');
    expect(typography.section_headings).toBe('text-heading3');
  });

  describe('import guidance', () => {
    const getText = async (framework?: string): Promise<string> => {
      const result = await tool.execute({ description: 'a settings form', framework });
      return result.content[0].type === 'text' ? result.content[0].text : '';
    };

    it('should direct Angular projects to forge-angular modules instead of side-effect imports', async () => {
      const text = await getText('Angular');

      expect(text).toContain('`@tylertech/forge-angular`');
      expect(text).toContain('`ForgeButtonModule`');
      expect(text).toContain('do not add side-effect imports');
      expect(text).not.toContain("import '@tylertech/forge/button';");
    });

    it('should require both the React wrapper and the side-effect import for React projects', async () => {
      const text = await getText('react');

      expect(text).toContain("import '@tylertech/forge/button';");
      expect(text).toContain('`@tylertech/forge-react`');
      expect(text).not.toContain('`ForgeButtonModule`');
    });

    it('should require side-effect imports without an Angular note for other frameworks', async () => {
      const text = await getText('vue');

      expect(text).toContain("import '@tylertech/forge/button';");
      expect(text).not.toContain('@tylertech/forge-angular');
    });

    it('should require side-effect imports and note the Angular alternative when no framework is given', async () => {
      const text = await getText();

      expect(text).toContain("import '@tylertech/forge/button';");
      expect(text).toContain('In an Angular project, import the `ForgeXModule`');
    });
  });
});
