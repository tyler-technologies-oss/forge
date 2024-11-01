import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IMeterComponent } from './meter';

import './meter';

describe('Meter', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<IMeterComponent>(html`<forge-meter></forge-meter>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
