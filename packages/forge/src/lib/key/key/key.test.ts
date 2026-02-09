import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { KeyComponent } from './key.js';

import './key.js';

describe('Key', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<KeyComponent>(html`<forge-key></forge-key>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<KeyComponent>(html`<forge-key></forge-key>`);

    await expect(el).to.be.accessible();
  });
});
