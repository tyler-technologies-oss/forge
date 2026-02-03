import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IPageStateComponent, PageStateComponent } from './page-state';
import './page-state';

describe('PageStateComponent', () => {
  it('should instantiate component instance', async () => {
    const el = await fixture<IPageStateComponent>(html`<forge-page-state></forge-page-state>`);
    expect(el).to.be.instanceOf(PageStateComponent);
    expect(el.shadowRoot).not.to.be.null;
  });
});
