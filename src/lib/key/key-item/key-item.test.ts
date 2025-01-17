import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IKeyItemComponent } from './key-item';

import './key-item';

describe('Key Item', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<IKeyItemComponent>(html`<forge-key-item></forge-key-item>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
