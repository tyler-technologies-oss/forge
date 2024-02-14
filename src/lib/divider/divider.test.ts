import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { IDividerComponent } from './divider';

import './divider'
import { DIVIDER_CONSTANTS } from './divider-constants';

describe('Divider', () => {
  it('should initialize', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    await expect(el).to.be.accessible();
  });

  it('should set vertical property when setting vertical attribute', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    expect(el.vertical).to.be.false;
    el.setAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL, '');
    expect(el.vertical).to.be.true;
  });

  it('should set vertical property when removing vertical attribute', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider vertical></forge-divider>`);
    expect(el.vertical).to.be.true;
    el.removeAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL);
    expect(el.vertical).to.be.false;
  });

  it('should set vertical attribute when setting vertical property', async () => {
    const el = await fixture<IDividerComponent>(html`<forge-divider></forge-divider>`);
    expect(el.hasAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL)).to.be.false;
    el.vertical = true;
    expect(el.hasAttribute(DIVIDER_CONSTANTS.attributes.VERTICAL)).to.be.true;
  });
});