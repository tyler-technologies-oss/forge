import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IDividerComponent } from './divider';

import './divider'

describe('Divider', () => {
  it('should initialize', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    await expect(el).to.be.accessible();
  });
});