import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IMeterGroupComponent } from './meter-group';

import './meter-group';

describe('Meter Group', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<IMeterGroupComponent>(html`<forge-meter-group></forge-meter-group>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});