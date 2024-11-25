import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IVirtualizerComponent } from './virtualizer';

import './virtualizer';

describe('Virtualizer', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<IVirtualizerComponent>(html`<forge-virtualizer></forge-virtualizer>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
