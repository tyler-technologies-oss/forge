import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import type { IButtonComponent } from './button';

import './button';

describe('Button', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    await expect(el).to.be.accessible();
  });

  it('should be text variant by default', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    expect(el.variant).to.equal('text');
  });

  it('should be raised variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="raised">Button</forge-button>`);

    expect(el.variant).to.equal('raised');
    await expect(el).to.be.accessible();
  });

  it('should be outlined variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="outlined">Button</forge-button>`);

    expect(el.variant).to.equal('outlined');
    await expect(el).to.be.accessible();
  });

  it('should be flat variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="flat">Button</forge-button>`);

    expect(el.variant).to.equal('flat');
    await expect(el).to.be.accessible();
  });

  it('should be link variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="link">Button</forge-button>`);

    expect(el.variant).to.equal('link');
    await expect(el).to.be.accessible();
  });

  it('should be disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    await expect(el).to.be.accessible();
  });

  it('should render <a> tag when href is set', async () => {
    const href = `javascript: console.log('href button')`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}" aria-label="Test href label">Button</forge-button>`);

    expect(el.href).to.equal(href);
    expect(el.shadowRoot?.firstElementChild?.tagName.toLowerCase()).to.equal('a');
    await expect(el).to.be.accessible();
  });
});
