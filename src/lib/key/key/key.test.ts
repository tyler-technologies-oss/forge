import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IKeyComponent } from './key';

import './key';

describe('Key', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<IKeyComponent>(html`<forge-key></forge-key>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
