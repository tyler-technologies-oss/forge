import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { ITreeItemComponent } from './tree-item';

import './tree-item';

describe('Tree item', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<ITreeItemComponent>(html`<forge-tree-item></forge-tree-item>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
