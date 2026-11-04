import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteDividerComponent } from '../rte-divider.js';

import '../../rich-text-editor.js';
import '../rte-divider.js';

describe('RTE Feature Divider', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.dividerFeature.shadowRoot).toBeTruthy();
  });

  it('should render a vertical forge-divider', async () => {
    const harness = await createFixture();

    expect(harness.divider()).toBeTruthy();
    expect(harness.divider().hasAttribute('vertical')).toBe(true);
  });

  it('should be visible in a toolbar whose height is derived from its content', async () => {
    const harness = await createFixture();

    // Regression: Forge sets height: 100% on the vertical divider host, which resolves to 0
    // against the toolbar's auto height, making the divider invisible.
    expect(harness.divider().getBoundingClientRect().height).toBe(24);
  });

  interface DividerHarness {
    editor: RichTextEditorComponent;
    dividerFeature: RteDividerComponent;
    divider(): HTMLElement;
  }

  async function createFixture(): Promise<DividerHarness> {
    const editor = await renderFixture<RichTextEditorComponent>(
      html`
        <forge-rich-text-editor>
          <forge-rte-divider></forge-rte-divider>
        </forge-rich-text-editor>
      `,
      'forge-rich-text-editor'
    );

    const dividerFeature = editor.querySelector<RteDividerComponent>('forge-rte-divider')!;
    await dividerFeature.updateComplete;

    return {
      editor,
      dividerFeature,
      divider: () => dividerFeature.shadowRoot!.querySelector<HTMLElement>('forge-divider')!
    };
  }
});
