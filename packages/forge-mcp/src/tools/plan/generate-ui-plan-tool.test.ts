import { describe, it, expect } from 'vitest';
import { GenerateUIPlanTool } from './generate-ui-plan-tool.js';
import { REGION_NAMES } from './plan-types.js';

describe('GenerateUIPlanTool', () => {
  const tool = new GenerateUIPlanTool();

  it('emits a plan template whose region keys are all legal region names', async () => {
    const result = await tool.execute({ description: 'a dashboard' });
    const text =
      result.content[0].type === 'text' ? result.content[0].text : '';

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      throw new Error('Expected a ```json block in the tool output.');
    }

    const template = JSON.parse(jsonMatch[1]);
    const regionKeys = Object.keys(template.regions);

    expect(regionKeys.length).toBeGreaterThan(0);
    for (const key of regionKeys) {
      expect(REGION_NAMES).toContain(key);
    }
  });
});
