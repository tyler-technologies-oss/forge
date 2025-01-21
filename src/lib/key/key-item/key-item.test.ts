import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { KeyItemComponent } from './key-item';

import './key-item';

describe('Key Item', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<KeyItemComponent>(html`<forge-key-item></forge-key-item>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
