import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';

import './slider';

describe('Slider', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-slider></forge-slider>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`<forge-slider data-aria-label="Choose value"></forge-slider>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with range', async () => {
    const el = await fixture(html`<forge-slider range data-aria-label-start="Choose start value" data-aria-label-end="Choose end value"></forge-slider>`);
    await expect(el).to.be.accessible();
  });
});
