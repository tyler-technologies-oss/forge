import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { RichTextEditorComponent } from '../../rich-text-editor';
import { RichTextFeatureDividerComponent } from '../rte-feature-divider';

import '../../rich-text-editor';
import '../rte-feature-divider';

describe('RTE Feature Divider', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.dividerFeature.shadowRoot).to.be.ok;
  });

  it('should render a vertical forge-divider', async () => {
    const harness = await createFixture();

    expect(harness.divider()).to.be.ok;
    expect(harness.divider().hasAttribute('vertical')).to.be.true;
  });

  it('should be visible in a toolbar whose height is derived from its content', async () => {
    const harness = await createFixture();

    // Regression: Forge sets height: 100% on the vertical divider host, which resolves to 0
    // against the toolbar's auto height, making the divider invisible.
    expect(harness.divider().getBoundingClientRect().height).to.equal(24);
  });

  interface DividerHarness {
    editor: RichTextEditorComponent;
    dividerFeature: RichTextFeatureDividerComponent;
    divider(): HTMLElement;
  }

  async function createFixture(): Promise<DividerHarness> {
    const editor = await fixture<RichTextEditorComponent>(html`
      <forge-rich-text-editor>
        <forge-rte-feature-divider></forge-rte-feature-divider>
      </forge-rich-text-editor>
    `);
    await editor.updateComplete;

    const dividerFeature = editor.querySelector<RichTextFeatureDividerComponent>('forge-rte-feature-divider')!;
    await dividerFeature.updateComplete;

    return {
      editor,
      dividerFeature,
      divider: () => dividerFeature.shadowRoot!.querySelector<HTMLElement>('forge-divider')!
    };
  }
});
