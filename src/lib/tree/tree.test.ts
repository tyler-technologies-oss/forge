import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { TreeComponent } from './tree';

describe('Tree', () => {
  it('should instantiate shadow root', async () => {
    const el = await fixture<TreeComponent>(html`<forge-tree></forge-tree>`);

    expect(el.shadowRoot).not.to.be.null;
  });
});
