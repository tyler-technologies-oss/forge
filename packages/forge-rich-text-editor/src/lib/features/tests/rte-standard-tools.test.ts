import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteStandardToolsComponent } from '../rte-standard-tools.js';
import { RICH_TEXT_STANDARD_FEATURE_GROUPS, RICH_TEXT_STANDARD_FEATURES } from '../../extensions/feature-extensions.js';

import '../../rich-text-editor.js';
import '../rte-standard-tools.js';

const DIVIDER_TAG = 'forge-rte-divider';

describe('RTE Feature Standard Tools', () => {
  it('should render exactly the standard features, in order', async () => {
    const tags = await renderedTags();

    expect(tags.filter(tag => tag !== DIVIDER_TAG)).toEqual(RICH_TEXT_STANDARD_FEATURES.map(feature => `forge-rte-${feature}`));
  });

  it('should render a divider between each feature group and nowhere else', async () => {
    const tags = await renderedTags();
    const expected = RICH_TEXT_STANDARD_FEATURE_GROUPS.flatMap((group, index) => [
      ...(index ? [DIVIDER_TAG] : []),
      ...group.map(feature => `forge-rte-${feature}`)
    ]);

    expect(tags).toEqual(expected);
  });

  it('should register every element it renders', async () => {
    const tags = await renderedTags();

    expect(tags.filter(tag => !customElements.get(tag))).toEqual([]);
  });

  async function renderedTags(): Promise<string[]> {
    const editor = await renderFixture<RichTextEditorComponent>(
      html`<forge-rich-text-editor><forge-rte-standard-tools></forge-rte-standard-tools></forge-rich-text-editor>`,
      'forge-rich-text-editor'
    );
    const tools = editor.querySelector<RteStandardToolsComponent>('forge-rte-standard-tools')!;
    await tools.updateComplete;

    return Array.from(tools.shadowRoot?.children ?? [], child => child.localName);
  }
});
