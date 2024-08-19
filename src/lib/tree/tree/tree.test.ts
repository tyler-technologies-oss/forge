import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { ITreeComponent } from './tree';

import './tree';

describe('Tree', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<ITreeComponent>(html`<forge-tree></forge-tree>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
